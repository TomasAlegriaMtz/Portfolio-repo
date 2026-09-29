import { useState } from 'react'
import { LANGS, useI18n } from '../i18n/I18nProvider'
import './LangSwitch.css'

/* EN | ES. La opción activa es una copia de las etiquetas recortada con clip-path:
   fondo y texto cambian juntos, en vez de interpolar dos colores por separado. */
export default function LangSwitch() {
  const { lang, setLang, t } = useI18n()
  // Desde teclado, el indicador salta sin animar
  const [instant, setInstant] = useState(false)

  return (
    <div
      className="lang-switch"
      role="group"
      aria-label={t.lang.label}
      data-active={lang}
      data-instant={instant || undefined}
    >
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          className="lang-option"
          lang={l}
          aria-pressed={l === lang}
          aria-label={t.lang[l]}
          onClick={(e) => {
            setInstant(e.detail === 0)
            setLang(l, e)
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
      <span className="lang-overlay" aria-hidden="true">
        {LANGS.map((l) => (
          <span key={l} className="lang-option">
            {l.toUpperCase()}
          </span>
        ))}
      </span>
    </div>
  )
}
