import { useI18n } from '../i18n/I18nProvider'
import { parseHighlights, yearsOfExperience } from '../lib/format'
import './About.css'

export default function About() {
  const { cv, t } = useI18n()
  const { about, profile } = cv
  const years = String(yearsOfExperience(cv.experience))
  const statement = parseHighlights(about.statement.replaceAll('{years}', years).replaceAll('{años}', years))

  return (
    <section id="sobre-mi" className="section about" aria-labelledby="sobre-mi-title">
      <div className="container about-grid">
        <div className="about-side">
          <p className="section-rule mono" data-reveal>
            <span id="sobre-mi-title">{t.about.label}</span>
          </p>
          {profile.photo && (
            <img className="about-photo" src={profile.photo} alt={profile.fullName} data-reveal style={{ '--d': 1 }} />
          )}
        </div>

        <div>
          <p className="about-statement" data-reveal style={{ '--d': 1 }}>
            {statement.map((part, i) => (part.strong ? <strong key={i}>{part.text}</strong> : part.text))}
          </p>

          <dl className="about-facts">
            {about.facts.map((fact, i) => (
              <div key={i} className="about-fact" data-reveal style={{ '--d': i + 2 }}>
                <dt className="mono muted">{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
