import { useI18n } from '../i18n/I18nProvider'
import { Download } from './Icons'

/* Si hay un PDF en /public lo descarga; si no, imprime esta página
   (tiene hoja de estilos de impresión) para guardarla como PDF.
   En pantallas angostas la etiqueta se acorta a "CV". */
export default function CvButton({ className }) {
  const { cv, t } = useI18n()
  const label = (
    <>
      <Download />
      <span className="cv-long">{t.cv.long}</span>
      <span className="cv-short">{t.cv.short}</span>
    </>
  )

  if (cv.profile.cvPdf) {
    return (
      <a className={className} href={cv.profile.cvPdf} download>
        {label}
      </a>
    )
  }
  return (
    <button type="button" className={className} onClick={() => window.print()}>
      {label}
    </button>
  )
}
