import { useRef } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import { useTyped } from '../lib/cyber'
import { handleOf } from '../lib/format'
import BusinessCard from './BusinessCard'
import Scramble from './Scramble'
import { ArrowDown, ArrowRight } from './Icons'
import './Hero.css'

export default function Hero() {
  const heroRef = useRef(null)
  const { cv, t } = useI18n()
  const { profile } = cv
  const current = cv.experience.find((job) => job.start && !job.end)

  // Arranque: se teclea `whoami`, el nombre se descifra y el resto se imprime
  const typed = useTyped('whoami', true, { speed: 55, delay: 250 })
  const ready = typed.done

  return (
    <section id="inicio" className="hero" ref={heroRef} data-ready={ready || undefined}>
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-prompt" aria-hidden="true">
            <span className="prompt">{handleOf(profile.name)}@portfolio:~$</span> {typed.shown}
            {!ready && <span className="cursor" />}
          </p>

          <h1 className="hero-name">
            <span className="visually-hidden">
              {profile.name} {profile.lastName}
            </span>
            <span className="hero-name-line">
              <Scramble text={profile.name} active={ready} duration={650} />
            </span>
            <span className="hero-name-line hero-name-line--last">
              <Scramble text={profile.lastName} active={ready} delay={110} duration={800} />
            </span>
          </h1>

          <p className="hero-role step" style={{ '--s': 3 }}>
            <span className="hero-caret" aria-hidden="true">
              &gt;
            </span>
            {profile.role}
            {current && (
              <span className="muted">
                {' '}
                {t.hero.at} {current.company}
              </span>
            )}
          </p>

          <p className="hero-intro step" style={{ '--s': 4 }}>
            {profile.intro}
          </p>

          <div className="hero-ctas step no-print" style={{ '--s': 5 }}>
            <a className="btn" href="#contacto">
              {t.hero.contact}
              <ArrowRight className="icon arrow" />
            </a>
            <a className="btn btn--ghost" href="#proyectos">
              {t.hero.projects}
            </a>
          </div>
        </div>

        <div className="hero-card no-print">
          <BusinessCard trackRef={heroRef} />
        </div>
      </div>

      <a href="#sobre-mi" className="hero-scroll mono step no-print" style={{ '--s': 8 }}>
        <ArrowDown />
        {t.hero.scroll}
      </a>
    </section>
  )
}
