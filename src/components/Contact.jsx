import { useI18n } from '../i18n/I18nProvider'
import { handleOf } from '../lib/format'
import CopyButton from './CopyButton'
import CvButton from './CvButton'
import { ArrowUpRight, Github, Linkedin, Whatsapp } from './Icons'
import './Contact.css'

export default function Contact() {
  const { cv, t } = useI18n()
  const { profile } = cv

  const links = [
    profile.links.linkedin && { href: profile.links.linkedin, label: 'LinkedIn', Icon: Linkedin },
    profile.links.github && { href: profile.links.github, label: 'GitHub', Icon: Github },
    profile.whatsapp && { href: `https://wa.me/${profile.whatsapp}`, label: 'WhatsApp', Icon: Whatsapp },
  ].filter(Boolean)

  return (
    <section id="contacto" className="contact" aria-labelledby="contacto-title">
      <div className="container">
        <p className="contact-cmd" data-reveal aria-hidden="true">
          <span className="prompt">{handleOf(profile.name)}@portfolio:~$</span> ./contact.sh
        </p>

        <h2 id="contacto-title" className="contact-title" data-reveal style={{ '--d': 1 }}>
          {t.contact.title}
        </h2>

        <div className="contact-main" data-reveal style={{ '--d': 2 }}>
          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email}
            <ArrowUpRight className="icon contact-email-icon" />
          </a>
          <div className="contact-actions no-print">
            <CopyButton value={profile.email} label={t.contact.copy} done={t.contact.copied} status={t.contact.copiedSr} />
            <CvButton className="btn btn--ghost" />
          </div>
        </div>

        {/* Visible en el PDF impreso, donde no hay botones */}
        <p className="print-only">
          {[profile.phone, ...Object.values(profile.links)].filter(Boolean).join(' · ')}
        </p>

        <ul className="contact-links no-print" data-reveal style={{ '--d': 3 }}>
          {links.map(({ href, label, Icon }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noreferrer">
                <Icon />
                {label}
              </a>
            </li>
          ))}
        </ul>

        <p className="contact-end" aria-hidden="true">
          <span className="prompt">{handleOf(profile.name)}@portfolio:~$</span> <span className="cursor cursor--blink" />
        </p>
      </div>
    </section>
  )
}
