import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from './Icons'
import './CopyButton.css'

export default function CopyButton({ value, label, done, status }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef()

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      // Sin API de portapapeles (http, permisos): método clásico con un textarea temporal
      const ta = document.createElement('textarea')
      ta.value = value
      ta.setAttribute('readonly', '')
      ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      ta.remove()
      if (!ok) return
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button type="button" className="btn btn--ghost copy-btn" data-copied={copied || undefined} onClick={copy}>
      <span className="copy-state copy-state--idle" aria-hidden={copied}>
        <Copy />
        {label}
      </span>
      <span className="copy-state copy-state--done" aria-hidden={!copied}>
        <Check />
        {done}
      </span>
      <span className="visually-hidden" role="status">
        {copied ? status : ''}
      </span>
    </button>
  )
}
