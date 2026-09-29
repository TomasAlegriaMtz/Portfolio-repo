import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { flushSync } from 'react-dom'
import * as rawCv from '../data/cv'
import { strings } from './strings'

export const LANGS = ['en', 'es']
const DEFAULT_LANG = 'en'

// { en: '...', es: '...' } → el texto del idioma activo, en cualquier nivel del objeto
const isLocalized = (v) =>
  v && typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 2 && 'en' in v && 'es' in v

export function localize(value, lang) {
  if (Array.isArray(value)) return value.map((v) => localize(v, lang))
  if (isLocalized(value)) return value[lang]
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, localize(v, lang)]))
  }
  return value
}

// Prioridad: ?lang=es en el link → lo último que eligió el visitante → inglés
const initialLang = () => {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (LANGS.includes(fromUrl)) return fromUrl
  try {
    const saved = localStorage.getItem('lang')
    if (LANGS.includes(saved)) return saved
  } catch {
    /* almacenamiento bloqueado */
  }
  return DEFAULT_LANG
}

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(initialLang)
  const t = strings[lang]
  const cv = useMemo(() => localize({ ...rawCv }, lang), [lang])

  useEffect(() => {
    const root = document.documentElement
    root.lang = t.htmlLang
    document.title = `${cv.profile.name} ${cv.profile.lastName} — ${cv.profile.role}`
    document.querySelector('meta[name="description"]')?.setAttribute('content', cv.profile.intro)
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* el idioma solo dura esta visita */
    }
  }, [lang, t, cv])

  /* Cambiar de idioma reemplaza casi todo el texto de la página: sin transición
     se siente como un parpadeo. Con View Transitions la página nueva entra con
     un fundido corto con blur que funde ambos textos en uno.
     Desde teclado o con movimiento reducido, el cambio es instantáneo. */
  const setLang = useCallback(
    (next, event) => {
      if (next === lang) return
      const fromKeyboard = event?.detail === 0
      if (!document.startViewTransition || reducedMotion() || fromKeyboard) {
        setLangState(next)
        return
      }
      const transition = document.startViewTransition(() => {
        flushSync(() => setLangState(next))
      })
      transition.ready
        .then(() => {
          const root = document.documentElement
          root.animate(
            { opacity: [0, 1], filter: ['blur(3px)', 'blur(0)'] },
            { duration: 240, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', pseudoElement: '::view-transition-new(root)' },
          )
          root.animate(
            { opacity: [1, 0] },
            { duration: 180, easing: 'ease-out', fill: 'forwards', pseudoElement: '::view-transition-old(root)' },
          )
        })
        .catch(() => {})
    },
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang, t, cv }), [lang, setLang, t, cv])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export const useI18n = () => useContext(I18nContext)
