import { useEffect, useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useI18n } from '../i18n/I18nProvider'
import { useBootOnce, useTyped } from '../lib/cyber'
import { handleOf } from '../lib/format'
import { useFinePointer } from '../lib/hooks'
import Scramble from './Scramble'
import './Security.css'

// El tecleo vive en su propio componente: re-renderiza solo esta línea por letra,
// no toda la sección
function TypedCommand({ prompt, command, active, onDone }) {
  const typed = useTyped(command, active, { speed: 18, delay: 150 })
  useEffect(() => {
    if (typed.done) onDone()
  }, [typed.done, onDone])
  return (
    <p className="term-line">
      <span className="prompt">{prompt}</span> <span>{typed.shown}</span>
      {!typed.done && <span className="cursor" aria-hidden="true" />}
    </p>
  )
}

function Cert({ cert, index, platform, t }) {
  const status = cert.inProgress ? t.progress : cert.url ? t.verifiable : t.done
  return (
    <li className="cert" style={{ '--i': index }}>
      <div className="cert-card" data-progress={cert.inProgress || undefined}>
        <span className="cert-corners" aria-hidden="true" />
        <p className="cert-top">
          <span>[{cert.kind}]</span>
          <span className="cert-status">
            {cert.inProgress ? '◌' : '✓'} {status}
          </span>
        </p>
        <p className="cert-title">{cert.title}</p>
        <p className="cert-meta">
          {platform}
          {cert.date && ` · ${cert.date}`}
        </p>
        <p className="cert-foot">
          <span>ID {cert.id ?? '— — —'}</span>
          {cert.url && (
            <a href={cert.url} target="_blank" rel="noreferrer">
              {t.verify}
            </a>
          )}
        </p>
      </div>
    </li>
  )
}

/* Trabajo real de TI: el script de aprovisionamiento "corre" en una terminal
   al llegar a él. Cada paso se imprime y un momento después marca OK. */
function FieldWork({ field, t }) {
  const n = field.steps.length
  return (
    <div className="cyber-block field" data-reveal>
      <h3 className="cyber-cmd">
        <span className="prompt">$</span> {t.fieldCmd}
      </h3>
      <div className="field-grid">
        <div className="field-info">
          <p className="field-place">
            {field.place} · {field.role}
          </p>
          <p className="field-summary">{field.summary}</p>
          <ul className="field-duties">
            {field.duties.map((d, i) => (
              <li key={i}>
                <span aria-hidden="true">[✓]</span> {d}
              </li>
            ))}
          </ul>
        </div>

        <div className="term field-term">
          <div className="term-bar" aria-hidden="true">
            <span className="term-dots">
              <i />
              <i />
              <i />
            </span>
            <span>{field.script.split(' ')[0].replace(/^\.\\/, '')}</span>
            <span className="term-size">admin</span>
          </div>
          <div className="term-body">
            <p className="field-line" style={{ '--l': 0 }}>
              <span className="prompt">{field.shell}</span> {field.script}
            </p>
            {field.steps.map((step, i) => (
              <p key={i} className="field-line field-step" style={{ '--l': i + 1 }}>
                <span className="field-count">
                  [{i + 1}/{n}]
                </span>
                <span className="field-text">{step}</span>
                <span className="field-dots" aria-hidden="true" />
                <span className="field-ok">OK</span>
              </p>
            ))}
            <p className="field-line field-done" style={{ '--l': n + 1 }}>
              ✓ {field.done}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Security() {
  const { cv, t: all } = useI18n()
  const t = all.security
  const { security } = cv
  const { name: platform, username } = security.platform
  const handle = handleOf(cv.profile.name)
  const prompt = `${handle}@portfolio:~$`

  const ref = useRef(null)
  const booted = useBootOnce(ref)
  const [ready, setReady] = useState(false)
  const markReady = useRef(() => setReady(true)).current
  const reduce = useReducedMotion()
  const fine = useFinePointer()

  // Brillo que sigue al cursor: solo transform (se mueve en GPU, no repinta la sección)
  // y con spring para que tenga inercia en vez de pegarse al mouse
  const mx = useMotionValue(-600)
  const my = useMotionValue(-600)
  const sx = useSpring(mx, { stiffness: 180, damping: 26, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 180, damping: 26, mass: 0.6 })
  const spot = useMotionTemplate`translate(${sx}px, ${sy}px)`
  const origin = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reduce || !fine) return
    const measure = () => {
      const r = el.getBoundingClientRect()
      origin.current = { x: r.left + window.scrollX, y: r.top + window.scrollY }
    }
    const onMove = (e) => {
      if (!origin.current) measure()
      mx.set(e.pageX - origin.current.x)
      my.set(e.pageY - origin.current.y)
    }
    const reset = () => {
      origin.current = null
    }
    el.addEventListener('pointerenter', measure)
    el.addEventListener('pointermove', onMove)
    window.addEventListener('resize', reset)
    return () => {
      el.removeEventListener('pointerenter', measure)
      el.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', reset)
    }
  }, [reduce, fine, mx, my])

  return (
    <section
      id="ciberseguridad"
      ref={ref}
      className="cyber"
      data-booted={booted || undefined}
      data-ready={ready || undefined}
      aria-labelledby="cyber-title"
    >
      <div className="cyber-grid" aria-hidden="true" />
      {fine && !reduce && <motion.div className="cyber-spot" style={{ transform: spot }} aria-hidden="true" />}

      <div className="container cyber-inner">
        <div className="term">
          <div className="term-bar" aria-hidden="true">
            <span className="term-dots">
              <i />
              <i />
              <i />
            </span>
            <span>
              {handle}@portfolio: ~/{t.dir}
            </span>
            <span className="term-size">bash — 80×24</span>
          </div>
          <div className="term-body">
            <TypedCommand prompt={prompt} command={t.command} active={booted} onDone={markReady} />
            {security.example && (
              <p className="term-comment step" style={{ '--s': 0 }}>
                {t.todo}
              </p>
            )}
            <p className="term-ok step" style={{ '--s': 1 }}>
              <span className="term-badge">OK</span> {t.ok}
            </p>
          </div>
        </div>

        <header className="cyber-head">
          <p className="cyber-eyebrow step" style={{ '--s': 2 }}>
            // {platform} · {t.eyebrow}
          </p>
          <h2 id="cyber-title" className="cyber-title">
            <span className="visually-hidden">{t.titleSr}</span>
            <span className="cyber-title-line">
              <Scramble text={t.titleA} active={ready} delay={100} duration={700} />
            </span>
            <span className="cyber-title-line">
              <Scramble text={t.titleB} active={ready} delay={220} duration={950} />
            </span>
          </h2>
          <p className="cyber-intro step" style={{ '--s': 4 }}>
            {security.intro}
          </p>
        </header>

        <dl className="cyber-stats">
          {security.stats.map((s, i) => (
            <div key={i} className="cyber-stat step" style={{ '--s': 5 + i }}>
              <dt>{s.label}</dt>
              <dd>
                <span className="visually-hidden">{s.value}</span>
                <Scramble text={s.value} active={ready} delay={520 + i * 90} duration={600} />
              </dd>
            </div>
          ))}
        </dl>

        {security.fieldWork && <FieldWork field={security.fieldWork} t={t} />}

        <div className="cyber-block" data-reveal>
          <h3 className="cyber-cmd">
            <span className="prompt">$</span> {t.certsCmd}
            {platform.toLowerCase()}
          </h3>
          <ul className="certs">
            {security.certifications.map((c, i) => (
              <Cert key={i} cert={c} index={i} platform={platform} t={t} />
            ))}
          </ul>
        </div>

        <div className="cyber-cols">
          <div className="cyber-block" data-reveal>
            <h3 className="cyber-cmd">
              <span className="prompt">$</span> {t.nmapCmd}
            </h3>
            <div className="nmap-scroll">
              <table className="nmap">
                <thead>
                  <tr>
                    <th scope="col">{t.port}</th>
                    <th scope="col">{t.state}</th>
                    <th scope="col" className="col-service">
                      {t.service}
                    </th>
                    <th scope="col">{t.knowledge}</th>
                  </tr>
                </thead>
                <tbody>
                  {security.knowledge.map((k, i) => (
                    <tr key={k.port} style={{ '--l': i }}>
                      <td className="nmap-port">{k.port}</td>
                      <td>
                        <span className="nmap-open">open</span>
                      </td>
                      <td className="col-service muted-amber">{k.service}</td>
                      <td>{k.skill}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="nmap-done" style={{ '--l': security.knowledge.length }}>
              {t.nmapDone(security.knowledge.length)}
            </p>
          </div>

          <div className="cyber-side">
            <div className="cyber-block" data-reveal>
              <h3 className="cyber-cmd">
                <span className="prompt">$</span> {t.netCmd}
              </h3>
              <ul className="cyber-chips">
                {security.networking.map((n, i) => (
                  <li key={i} style={{ '--l': i }}>
                    [ {n} ]
                  </li>
                ))}
              </ul>
            </div>

            {security.tools.length > 0 && (
              <div className="cyber-block" data-reveal>
                <h3 className="cyber-cmd">
                  <span className="prompt">$</span> {t.toolsCmd}
                </h3>
                <ul className="cyber-ls">
                  {security.tools.map((tool, i) => (
                    <li key={tool} style={{ '--l': i }}>
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {username && (
              <div className="cyber-block" data-reveal>
                <h3 className="cyber-cmd">
                  <span className="prompt">$</span> open tryhackme.com/p/{username}
                </h3>
                <a className="btn btn--ghost thm-profile" href={`https://tryhackme.com/p/${username}`} target="_blank" rel="noreferrer">
                  {t.profile(platform)} ↗
                </a>
              </div>
            )}
          </div>
        </div>

        <p className="term-line term-line--end" aria-hidden="true">
          <span className="prompt">{prompt}</span> <span className="cursor cursor--blink" />
        </p>
      </div>
    </section>
  )
}
