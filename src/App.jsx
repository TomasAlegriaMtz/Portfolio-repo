import { useI18n } from './i18n/I18nProvider'
import { useRevealOnScroll } from './lib/hooks'
import { useCyberMode } from './lib/cyber'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Security from './components/Security'
import Education from './components/Education'
import Contact from './components/Contact'
import ModeScan from './components/ModeScan'

export default function App() {
  useRevealOnScroll()
  const cyber = useCyberMode('ciberseguridad')
  const { cv, t } = useI18n()

  return (
    <>
      <a className="skip-link" href="#sobre-mi">
        {t.skip}
      </a>
      <Nav />
      <ModeScan active={cyber} />
      <div className="crt" aria-hidden="true" />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Security />
        <Education />
        <Contact />
      </main>
      <footer className="site-footer no-print">
        <div className="container site-footer-inner mono">
          <span>
            © {new Date().getFullYear()} {cv.profile.fullName}
          </span>
          <span>{t.footer}</span>
        </div>
      </footer>
    </>
  )
}
