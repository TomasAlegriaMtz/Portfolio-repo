import { useId, useState } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import { experienceSummary, formatDuration, formatPeriod } from '../lib/format'
import SectionHead from './SectionHead'
import { Plus } from './Icons'
import './Experience.css'

function Job({ job, index, defaultOpen, t }) {
  const [open, setOpen] = useState(defaultOpen)
  const [instant, setInstant] = useState(false)
  const id = useId()

  return (
    <li
      className="job"
      data-open={open || undefined}
      data-instant={instant || undefined}
      data-reveal
      style={{ '--d': index }}
    >
      <button
        type="button"
        className="job-head"
        aria-expanded={open}
        aria-controls={id}
        onClick={(e) => {
          // Enter/Espacio llegan con detail 0: se abre al instante, sin animación
          setInstant(e.detail === 0)
          setOpen((o) => !o)
        }}
      >
        <span className="job-period mono">{formatPeriod(job, t)}</span>
        <span className="job-title">
          <span className="job-role">{job.role}</span>
          <span className="job-company">{[job.company, job.location].filter(Boolean).join(' · ')}</span>
        </span>
        <span className="job-duration mono muted">{formatDuration(job, t)}</span>
        <span className="job-icon" aria-hidden="true">
          <Plus />
        </span>
      </button>

      {/* El contenido siempre existe en el DOM (para impresión y buscadores);
          `inert` lo saca del foco y del lector de pantalla cuando está cerrado */}
      <div className="job-body" id={id} role="region" inert={!open}>
        <div className="job-body-inner">
          {job.summary && <p className="job-summary">{job.summary}</p>}
          <ul className="job-highlights">
            {job.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
          <ul className="tags" aria-label={t.experience.tech}>
            {job.stack.map((s) => (
              <li key={s} className="tag">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  )
}

export default function Experience() {
  const { cv, t } = useI18n()

  return (
    <section id="experiencia" className="section" aria-labelledby="experiencia-title">
      <div className="container">
        <SectionHead
          id="experiencia-title"
          label={t.experience.label}
          count={experienceSummary(cv.experience, t)}
          title={t.experience.title}
        />

        <ol className="jobs">
          {/* La key no depende del idioma: cambiarlo no debe re-montar (ni cerrar) nada */}
          {cv.experience.map((job, i) => (
            <Job key={`${job.company}-${i}`} job={job} index={i} defaultOpen={i === 0} t={t} />
          ))}
        </ol>
      </div>
    </section>
  )
}
