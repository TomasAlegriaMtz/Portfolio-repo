import { useEffect, useRef, useState } from 'react'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Activa el "modo terminal" de toda la página mientras la sección de seguridad
   ocupa la mitad superior de la pantalla. Se refleja en <html data-mode="cyber">
   para que la navegación también cambie de piel. */
export function useCyberMode(sectionId) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = document.getElementById(sectionId)
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      rootMargin: '-64px 0px -50% 0px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [sectionId])

  useEffect(() => {
    const root = document.documentElement
    // Cambio parejo: sin transiciones durante el frame en que cambian los colores
    root.setAttribute('data-switching', '')
    if (active) root.dataset.mode = 'cyber'
    else delete root.dataset.mode
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => root.removeAttribute('data-switching'))
    })
    return () => {
      cancelAnimationFrame(raf)
      root.removeAttribute('data-switching')
    }
  }, [active])

  return active
}

/* La sección "arranca" una sola vez, la primera vez que entra en pantalla */
export function useBootOnce(ref) {
  const [booted, setBooted] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reducedMotion() || !('IntersectionObserver' in window)) {
      setBooted(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBooted(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -25% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
  return booted
}

/* Texto que se escribe letra por letra */
export function useTyped(text, active, { speed = 26, delay = 0 } = {}) {
  const [count, setCount] = useState(0)
  // Solo se teclea una vez: si el texto cambia después (otro idioma), aparece completo
  const finished = useRef(false)
  useEffect(() => {
    if (count >= text.length && count > 0) finished.current = true
  }, [count, text.length])

  useEffect(() => {
    if (!active) return
    if (reducedMotion() || finished.current) {
      setCount(text.length)
      return
    }
    let i = 0
    let interval
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setCount(i)
        if (i >= text.length) clearInterval(interval)
      }, speed)
    }, delay)
    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [text, active, speed, delay])
  return { shown: text.slice(0, count), done: count >= text.length || finished.current }
}

const GLYPHS = '!<>-_\\/[]{}—=+*^?#01ABCDEF'

/* Texto que se "descifra": cada letra resuelve de izquierda a derecha */
export function useScramble(text, active, { duration = 900, delay = 0 } = {}) {
  const [out, setOut] = useState(() => text.replace(/\S/g, ' '))

  useEffect(() => {
    if (!active) return
    if (reducedMotion()) {
      setOut(text)
      return
    }
    let raf
    const t0 = performance.now() + delay
    // Cada carácter tiene su momento de "resolución", escalonado con algo de azar
    const resolveAt = [...text].map((_, i) => (i / text.length) * duration * 0.75 + Math.random() * duration * 0.25)

    const tick = (now) => {
      const t = now - t0
      if (t < 0) {
        raf = requestAnimationFrame(tick)
        return
      }
      let finished = true
      const next = [...text]
        .map((ch, i) => {
          if (ch === ' ') return ' '
          if (t >= resolveAt[i]) return ch
          finished = false
          return t < resolveAt[i] - duration * 0.5 ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0]
        })
        .join('')
      setOut(next)
      if (!finished) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, active, duration, delay])

  return out
}
