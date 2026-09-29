import { useEffect, useState, useCallback } from 'react'
import { flushSync } from 'react-dom'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Revela [data-reveal] una sola vez al entrar en pantalla.
   Re-animar en cada scroll es una interfaz peleándose con quien la lee.
   También vigila elementos que se monten después (p. ej. al cambiar de idioma). */
export function useRevealOnScroll() {
  useEffect(() => {
    const pending = () => document.querySelectorAll('[data-reveal]:not([data-visible])')
    if (!('IntersectionObserver' in window)) {
      pending().forEach((el) => el.setAttribute('data-visible', ''))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-visible', '')
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    )
    pending().forEach((el) => io.observe(el))

    const mo = new MutationObserver((mutations) => {
      if (mutations.some((m) => m.addedNodes.length)) pending().forEach((el) => io.observe(el))
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
}

// La terminal es oscura por defecto; el tema claro solo se activa si el visitante lo elige
const readTheme = () => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

/* Cambio de tema con un círculo que se expande desde el botón.
   Es algo que se hace una vez por visita: aquí sí cabe el deleite.
   Si se activa con teclado o con movimiento reducido, cambia al instante. */
export function useTheme() {
  const [theme, setTheme] = useState(readTheme)

  const apply = useCallback((next) => {
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* almacenamiento bloqueado: el tema solo dura esta visita */
    }
    setTheme(next)
  }, [])

  const toggle = useCallback(
    (event) => {
      const next = theme === 'dark' ? 'light' : 'dark'
      const fromKeyboard = event?.detail === 0
      if (!document.startViewTransition || prefersReducedMotion() || fromKeyboard) {
        apply(next)
        return
      }
      const rect = event.currentTarget.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

      const transition = document.startViewTransition(() => {
        flushSync(() => apply(next))
      })
      transition.ready
        .then(() => {
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
            { duration: 480, easing: 'cubic-bezier(0.77, 0, 0.175, 1)', pseudoElement: '::view-transition-new(root)' },
          )
        })
        // Si el navegador omite la transición (pestaña oculta, otra en curso) el tema ya se aplicó
        .catch(() => {})
    },
    [theme, apply],
  )

  return [theme, toggle]
}

export function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return scrolled
}

export function useFinePointer() {
  const query = '(hover: hover) and (pointer: fine)'
  const [fine, setFine] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setFine(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return fine
}
