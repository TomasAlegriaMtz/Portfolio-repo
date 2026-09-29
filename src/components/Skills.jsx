import { useCallback, useId, useLayoutEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import SectionHead from './SectionHead'
import './Skills.css'

function TabList({ categories, active, onSelect, onKeyDown, tabRefs, ids, label, copy = false }) {
  return (
    <div className="tabs-list" role={copy ? undefined : 'tablist'} aria-label={copy ? undefined : label}>
      {categories.map((c, i) =>
        copy ? (
          <span key={i} className="tab">
            {c.category}
          </span>
        ) : (
          <button
            key={i}
            ref={(el) => (tabRefs.current[i] = el)}
            type="button"
            role="tab"
            id={`${ids}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${ids}-panel`}
            tabIndex={active === i ? 0 : -1}
            className="tab"
            onClick={(e) => onSelect(i, e.detail === 0)}
            onKeyDown={onKeyDown}
          >
            {c.category}
          </button>
        ),
      )}
    </div>
  )
}

export default function Skills() {
  const { cv, t, lang } = useI18n()
  const categories = cv.skills
  const total = categories.reduce((n, c) => n + c.items.length, 0)
  const maxYears = Math.max(1, ...categories.flatMap((c) => c.items.map((s) => s.years ?? 0)))
  const metaLabel = (s) => s.usedIn ?? (s.years ? t.skills.years(s.years) : null)

  // La pestaña activa se guarda por posición: cambiar de idioma no la pierde
  const [active, setActive] = useState(0)
  // Acciones desde teclado cambian al instante: animarlas las haría sentir lentas
  const [instant, setInstant] = useState(false)
  const ids = useId()
  const tabsRef = useRef(null)
  const overlayRef = useRef(null)
  const tabRefs = useRef([])
  const firstPaint = useRef(true)
  const lastLang = useRef(lang)

  // La pestaña activa es una copia de la lista recortada con clip-path:
  // texto y fondo cambian juntos, sin interpolar colores por separado.
  useLayoutEffect(() => {
    const overlay = overlayRef.current
    const place = (animate) => {
      const tab = tabRefs.current[active]
      if (!tab || !overlay) return
      const left = tab.offsetLeft - overlay.offsetLeft
      const right = overlay.offsetWidth - (left + tab.offsetWidth)
      if (!animate) overlay.setAttribute('data-instant', '')
      overlay.style.clipPath = `inset(0 ${right}px 0 ${left}px round 2px)`
      if (!animate) {
        overlay.getBoundingClientRect() // aplica sin transición antes de restaurar
        requestAnimationFrame(() => overlay.removeAttribute('data-instant'))
      }
    }
    // Un cambio de idioma cambia el ancho de las etiquetas: se recoloca sin animar
    const langChanged = lastLang.current !== lang
    lastLang.current = lang
    place(!firstPaint.current && !instant && !langChanged)
    firstPaint.current = false

    const ro = new ResizeObserver(() => place(false))
    ro.observe(tabsRef.current)
    return () => ro.disconnect()
  }, [active, instant, lang])

  const select = useCallback((i, fromKeyboard) => {
    setInstant(fromKeyboard)
    setActive(i)
  }, [])

  const onKeyDown = (e) => {
    const n = categories.length
    const next = { ArrowRight: (active + 1) % n, ArrowLeft: (active - 1 + n) % n, Home: 0, End: n - 1 }[e.key]
    if (next === undefined) return
    e.preventDefault()
    select(next, true)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="habilidades" className="section skills" aria-labelledby="habilidades-title">
      <div className="container">
        <SectionHead
          id="habilidades-title"
          label={t.skills.label}
          count={t.skills.count(total)}
          title={t.skills.title}
        />

        <div className="skills-screen no-print">
          <div className="skills-toolbar" data-reveal>
            <div className="tabs-scroll">
              <div className="tabs" ref={tabsRef}>
                <TabList
                  categories={categories}
                  active={active}
                  onSelect={select}
                  onKeyDown={onKeyDown}
                  tabRefs={tabRefs}
                  ids={ids}
                  label={t.skills.categories}
                />
                <div className="tabs-overlay" ref={overlayRef} aria-hidden="true">
                  <TabList categories={categories} copy />
                </div>
              </div>
            </div>
            <p className="skills-note mono muted">
              <span className="skills-note-dot" aria-hidden="true" /> {t.skills.note}
            </p>
          </div>

          {/* El revelado va en un contenedor fijo: el panel se re-monta en cada cambio */}
          <div data-reveal style={{ '--d': 1 }}>
            <ul
              key={active}
              className="skills-panel"
              role="tabpanel"
              id={`${ids}-panel`}
              aria-labelledby={`${ids}-tab-${active}`}
              data-instant={instant || undefined}
            >
              {categories[active].items.map((s, i) => (
                <li key={i} className="skill" data-proven={s.usedIn ? '' : undefined} style={{ '--i': i }}>
                  <span className="skill-name">{s.name}</span>
                  {metaLabel(s) && <span className="skill-years mono">{metaLabel(s)}</span>}
                  {s.years && (
                    <span className="skill-bar" aria-hidden="true">
                      <span style={{ transform: `scaleX(${s.years / maxYears})` }} />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Versión impresa: todas las categorías a la vista */}
        <div className="print-only skills-print">
          {categories.map((c, i) => (
            <p key={i}>
              <strong>{c.category}:</strong> {c.items.map((s) => s.name).join(', ')}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
