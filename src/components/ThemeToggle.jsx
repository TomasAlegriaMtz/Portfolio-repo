import { useI18n } from '../i18n/I18nProvider'
import { useTheme } from '../lib/hooks'
import { Moon, Sun } from './Icons'
import './ThemeToggle.css'

export default function ThemeToggle() {
  const [theme, toggle] = useTheme()
  const { t } = useI18n()
  const dark = theme === 'dark'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      data-dark={dark || undefined}
      aria-label={dark ? t.theme.toLight : t.theme.toDark}
      title={dark ? t.theme.light : t.theme.dark}
    >
      <Sun className="icon theme-icon theme-icon--sun" />
      <Moon className="icon theme-icon theme-icon--moon" />
    </button>
  )
}
