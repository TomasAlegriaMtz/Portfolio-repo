import { useI18n } from '../i18n/I18nProvider'
import './Education.css'

export default function Education() {
  const { cv, t } = useI18n()

  const columns = [
    {
      label: t.education.education,
      items: cv.education.map((e) => ({ title: e.title, detail: e.school, meta: e.period })),
    },
    {
      label: t.education.certifications,
      items: cv.certifications.map((c) => ({
        title: c.title,
        detail: c.issuer,
        meta: c.status ?? (c.year ? String(c.year) : null),
      })),
    },
    {
      label: t.education.languages,
      items: cv.languages.map((l) => ({ title: l.name, detail: l.level })),
    },
  ].filter((col) => col.items.length)

  return (
    <section className="section education" aria-label={t.education.aria}>
      <div className="container edu-grid">
        {columns.map((col, i) => (
          <div key={i} className="edu-col" data-reveal style={{ '--d': i }}>
            <h2 className="section-rule mono">
              <span>{col.label}</span>
            </h2>
            <ul className="edu-list">
              {col.items.map((item, j) => (
                <li key={j}>
                  <p className="edu-title">{item.title}</p>
                  <p className="edu-detail muted">
                    {item.detail}
                    {item.meta && <span className="mono"> · {item.meta}</span>}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
