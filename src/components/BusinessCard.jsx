import { useEffect, useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { useI18n } from '../i18n/I18nProvider'
import { useFinePointer } from '../lib/hooks'
import { Flip } from './Icons'
import Logo from './Logo'
import './BusinessCard.css'

// Ángulo de reposo: la tarjeta se lee en 3D desde el primer frame, sin tocarla
const REST_X = 7
const REST_Y = -15
const clamp = (v) => Math.max(-1, Math.min(1, v))

export default function BusinessCard({ trackRef }) {
  const { cv, t } = useI18n()
  const { profile } = cv
  const reduce = useReducedMotion()
  const fine = useFinePointer()
  const stageRef = useRef(null)
  const stageRect = useRef(null)
  const flipFromKeyboard = useRef(false)
  const [flipped, setFlipped] = useState(false)

  // Seguimiento del cursor: decorativo, así que se interpola con spring
  // (atado directo al mouse se sentiría artificial, sin inercia)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const tilt = { stiffness: 150, damping: 20, mass: 0.8 }
  const sx = useSpring(px, tilt)
  const sy = useSpring(py, tilt)
  const rx = useTransform(sy, (v) => REST_X - v * 12)
  const ry = useTransform(sx, (v) => REST_Y + v * 22)
  const tiltTransform = useMotionTemplate`perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`

  // El volteo usa spring para poder interrumpirse a medio giro y regresar
  // conservando la velocidad (un keyframe reiniciaría desde cero)
  const flip = useSpring(0, { visualDuration: 0.6, bounce: 0.22 })
  const flipTransform = useMotionTemplate`rotateY(${flip}deg)`

  const glareX = useTransform(sx, (v) => v * -30)
  const glareY = useTransform(sy, (v) => v * -30)
  const glareTransform = useMotionTemplate`translate(${glareX}%, ${glareY}%)`

  useEffect(() => {
    const target = flipped ? 180 : 0
    // Desde teclado el cambio es instantáneo: animar acciones de teclado las vuelve lentas
    if (flipFromKeyboard.current) flip.jump(target)
    else flip.set(target)
  }, [flipped, flip])

  useEffect(() => {
    const area = trackRef?.current
    if (!area || reduce || !fine) return
    // Se mide el contenedor (sin transformar), no la tarjeta: medir la tarjeta
    // inclinada retroalimentaría su propio ángulo. La medida se cachea para no
    // leer layout en cada pointermove.
    const measure = () => {
      stageRect.current = stageRef.current.getBoundingClientRect()
    }
    const onMove = (e) => {
      if (!stageRect.current) measure()
      const r = stageRect.current
      px.set(clamp((e.clientX - (r.left + r.width / 2)) / (window.innerWidth * 0.5)))
      py.set(clamp((e.clientY - (r.top + r.height / 2)) / (window.innerHeight * 0.5)))
    }
    const onLeave = () => {
      px.set(0)
      py.set(0)
    }
    const invalidate = () => {
      stageRect.current = null
    }
    area.addEventListener('pointerenter', measure)
    area.addEventListener('pointermove', onMove)
    area.addEventListener('pointerleave', onLeave)
    window.addEventListener('scroll', invalidate, { passive: true })
    window.addEventListener('resize', invalidate)
    return () => {
      area.removeEventListener('pointerenter', measure)
      area.removeEventListener('pointermove', onMove)
      area.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', invalidate)
      window.removeEventListener('resize', invalidate)
    }
  }, [trackRef, reduce, fine, px, py])

  const linkedinHandle = profile.links.linkedin?.replace(/^https?:\/\/(www\.)?linkedin\.com/, '')
  const githubHandle = profile.links.github?.replace(/^https?:\/\/(www\.)?github\.com\//, '@')

  return (
    <div className="card-stage" ref={stageRef}>
      <button
        type="button"
        className="card-button"
        onClick={(e) => {
          flipFromKeyboard.current = e.detail === 0
          setFlipped((f) => !f)
        }}
        aria-pressed={flipped}
        aria-label={flipped ? t.card.toFront : t.card.toBack}
      >
        <motion.div className="card-tilt" style={{ transform: reduce ? undefined : tiltTransform }}>
          <motion.div
            className="card-flip"
            data-flipped={flipped || undefined}
            data-reduce={reduce || undefined}
            style={{ transform: reduce ? undefined : flipTransform }}
          >
            {/* Frente: los colores y el logo de tu CV impreso */}
            <div className="card-face card-face--front" aria-hidden={flipped}>
              <Logo className="card-logo" />
              <motion.span className="card-glare" style={{ transform: glareTransform }} aria-hidden="true" />
              <span className="card-grain" aria-hidden="true" />

              <span className="card-row">
                <span className="card-meta mono">CV · {new Date().getFullYear()}</span>
              </span>

              <span className="card-row card-row--bottom">
                <span>
                  <span className="card-name">{profile.fullName ?? `${profile.name} ${profile.lastName}`}</span>
                  <span className="card-role mono">
                    {profile.role} · {profile.locationShort}
                  </span>
                </span>
              </span>
            </div>

            <div className="card-face card-face--back" aria-hidden={!flipped}>
              <span className="card-row">
                <span className="card-meta mono">{t.card.contact}</span>
                {profile.available && (
                  <span className="card-status mono">
                    <span className="status-dot" /> {t.card.available}
                  </span>
                )}
              </span>

              <span className="card-contact">
                <span className="card-line">
                  <span className="card-label mono">{t.card.email}</span>
                  <span className="card-value">{profile.email}</span>
                </span>
                <span className="card-line">
                  <span className="card-label mono">{t.card.phone}</span>
                  <span className="card-value">{profile.phone}</span>
                </span>
                {linkedinHandle && (
                  <span className="card-line">
                    <span className="card-label mono">LinkedIn</span>
                    <span className="card-value">{linkedinHandle}</span>
                  </span>
                )}
                {githubHandle && (
                  <span className="card-line">
                    <span className="card-label mono">GitHub</span>
                    <span className="card-value">{githubHandle}</span>
                  </span>
                )}
                {profile.website ? (
                  <span className="card-line">
                    <span className="card-label mono">{t.card.web}</span>
                    <span className="card-value">{profile.website}</span>
                  </span>
                ) : (
                  <span className="card-line">
                    <span className="card-label mono">{t.card.base}</span>
                    <span className="card-value">{profile.location}</span>
                  </span>
                )}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </button>

      <p className="card-hint mono" aria-hidden="true">
        <Flip />
        {flipped ? t.card.hintBack : t.card.hintFront}
      </p>
    </div>
  )
}
