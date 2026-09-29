import { useEffect, useRef } from 'react'
import './ModeScan.css'

/* Una línea de escaneo que barre la pantalla al entrar o salir de seguridad.
   Marca el cambio de fósforo (gris ↔ verde) y disimula el cambio de color.
   Entrar: baja, deliberada. Salir: sube, más rápida. */
export default function ModeScan({ active }) {
  const ref = useRef(null)
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    el.getAnimations().forEach((a) => a.cancel())
    const down = [{ transform: 'translateY(-30vh)' }, { transform: 'translateY(110vh)' }]
    el.animate(active ? down : [...down].reverse(), {
      duration: active ? 560 : 320,
      easing: 'cubic-bezier(0.77, 0, 0.175, 1)',
    })
  }, [active])

  return (
    <div className="mode-scan" aria-hidden="true">
      <div ref={ref} className="mode-scan-line" data-exit={active ? undefined : ''} />
    </div>
  )
}
