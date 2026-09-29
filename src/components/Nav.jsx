import { useI18n } from '../i18n/I18nProvider'
import { handleOf } from '../lib/format'
import { useScrolled } from '../lib/hooks'
import ThemeToggle from './ThemeToggle'
import LangSwitch from './LangSwitch'
import CvButton from './CvButton'
import Logo from './Logo'
import './Nav.css'

export default function Nav() {
  const scrolled = useScrolled()
  const { cv, t } = useI18n()
  const { profile } = cv

  const links = [
    { href: '#experiencia', label: t.nav.experience },
    { href: '#proyectos', label: t.nav.projects },
    { href: '#habilidades', label: t.nav.skills },
    { href: '#ciberseguridad', label: t.nav.security },
    { href: '#contacto', label: t.nav.contact },
  ]

  return (
    <header className="nav no-print" data-scrolled={scrolled || undefined}>
      <div className="container nav-inner">
        <a href="#inicio" className="nav-mark" aria-label={`${profile.name} ${profile.lastName} — ${t.nav.home}`}>
          <Logo className="nav-logo" />
          {/* En la sección de seguridad el nombre se vuelve un prompt de root */}
          <span className="nav-label" aria-hidden="true">
            <span className="nav-name">
              {profile.name} {profile.lastName}
            </span>
            <span className="nav-root">root@{handleOf(profile.name)}:~#</span>
          </span>
        </a>

        <nav aria-label={t.nav.sections}>
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <LangSwitch />
          <ThemeToggle />
          <CvButton className="btn btn--sm nav-cv" />
        </div>
      </div>
    </header>
  )
}
