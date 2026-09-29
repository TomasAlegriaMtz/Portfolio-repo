import { useI18n } from '../i18n/I18nProvider'
import SectionHead from './SectionHead'
import ProjectCover from './ProjectCover'
import { ArrowUpRight } from './Icons'
import './Projects.css'

export default function Projects() {
  const { cv, t } = useI18n()
  const { projects } = cv

  return (
    <section id="proyectos" className="section projects" aria-labelledby="proyectos-title">
      <div className="container">
        <SectionHead
          id="proyectos-title"
          label={t.projects.label}
          count={t.projects.count(projects.length)}
          title={t.projects.title}
        />

        <div className="project-grid">
          {projects.map((p, i) => (
            <article key={i} className="project">
              {/* Se observa el contenedor: un elemento recortado al 100% tiene área
                  visible cero y IntersectionObserver nunca lo reportaría */}
              <div className="cover-reveal no-print" data-reveal>
                <div className="project-cover">
                  {p.image ? <img src={p.image} alt="" loading="lazy" /> : <ProjectCover type={p.cover} />}
                </div>
              </div>

              <div className="project-body" data-reveal style={{ '--d': 2 }}>
                <p className="project-meta mono muted">{[p.year, p.role].filter(Boolean).join(' · ')}</p>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.description}</p>

                {p.metric && (
                  <p className="project-metric">
                    <span className="metric-value">{p.metric.value}</span>
                    <span className="metric-label">{p.metric.label}</span>
                  </p>
                )}

                <div className="project-foot">
                  <ul className="tags project-tags" aria-label={t.experience.tech}>
                    {p.stack.map((s) => (
                      <li key={s} className="tag">
                        {s}
                      </li>
                    ))}
                  </ul>

                  {(p.link || p.repo) && (
                    <div className="project-links no-print">
                      {p.link && (
                        <a href={p.link} target="_blank" rel="noreferrer">
                          {t.projects.view} <ArrowUpRight />
                        </a>
                      )}
                      {p.repo && (
                        <a href={p.repo} target="_blank" rel="noreferrer">
                          {t.projects.code} <ArrowUpRight />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
