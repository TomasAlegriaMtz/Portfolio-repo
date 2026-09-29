const base = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  className: 'icon',
}

export const ArrowRight = (p) => (
  <svg {...base} {...p}>
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
)

export const ArrowUpRight = (p) => (
  <svg {...base} {...p}>
    <path d="M5 11l6-6M6 5h5v5" />
  </svg>
)

export const ArrowDown = (p) => (
  <svg {...base} {...p}>
    <path d="M8 3v10M4 9l4 4 4-4" />
  </svg>
)

export const Copy = (p) => (
  <svg {...base} {...p}>
    <rect x="5.5" y="5.5" width="8" height="8" rx="2" />
    <path d="M10.5 3.5v-.5a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 3v5A1.5 1.5 0 0 0 4 9.5h.5" />
  </svg>
)

export const Check = (p) => (
  <svg {...base} {...p}>
    <path d="M3 8.5l3 3 7-7" />
  </svg>
)

export const Plus = (p) => (
  <svg {...base} {...p}>
    <path d="M8 3v10M3 8h10" />
  </svg>
)

export const Sun = (p) => (
  <svg {...base} {...p}>
    <circle cx="8" cy="8" r="3" />
    <path d="M8 1.5v1.2M8 13.3v1.2M1.5 8h1.2M13.3 8h1.2M3.4 3.4l.85.85M11.75 11.75l.85.85M3.4 12.6l.85-.85M11.75 4.25l.85-.85" />
  </svg>
)

export const Moon = (p) => (
  <svg {...base} {...p}>
    <path d="M13.5 9.6A5.8 5.8 0 0 1 6.4 2.5a5.8 5.8 0 1 0 7.1 7.1Z" />
  </svg>
)

export const Download = (p) => (
  <svg {...base} {...p}>
    <path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10" />
  </svg>
)

export const Flip = (p) => (
  <svg {...base} {...p}>
    <path d="M2.5 8a5.5 5.5 0 0 1 9.6-3.6M13.5 8a5.5 5.5 0 0 1-9.6 3.6" />
    <path d="M12.5 2v2.6H9.9M3.5 14v-2.6h2.6" />
  </svg>
)

export const Linkedin = (p) => (
  <svg {...base} {...p} fill="currentColor" stroke="none">
    <path d="M3.6 5.8h1.9V12H3.6V5.8Zm.95-3a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM6.7 5.8h1.8v.85h.03c.25-.48.87-.98 1.8-.98 1.92 0 2.27 1.26 2.27 2.9V12h-1.88V8.87c0-.72-.01-1.66-1-1.66-1.02 0-1.17.79-1.17 1.6V12H6.7V5.8Z" />
  </svg>
)

export const Github = (p) => (
  <svg {...base} {...p} fill="currentColor" stroke="none">
    <path d="M8 1.3a6.7 6.7 0 0 0-2.12 13.06c.34.06.46-.15.46-.32v-1.2c-1.87.4-2.26-.8-2.26-.8-.3-.78-.75-.99-.75-.99-.6-.42.05-.41.05-.41.68.05 1.03.7 1.03.7.6 1.03 1.58.73 1.97.56.06-.44.24-.73.43-.9-1.49-.17-3.06-.75-3.06-3.32 0-.73.26-1.33.69-1.8-.07-.17-.3-.85.06-1.77 0 0 .56-.18 1.84.69a6.4 6.4 0 0 1 3.35 0c1.28-.87 1.84-.69 1.84-.69.37.92.14 1.6.07 1.77.43.47.69 1.07.69 1.8 0 2.58-1.57 3.15-3.07 3.31.24.21.46.62.46 1.25v1.85c0 .18.12.39.46.32A6.7 6.7 0 0 0 8 1.3Z" />
  </svg>
)

export const Whatsapp = (p) => (
  <svg {...base} {...p}>
    <path d="M2.5 13.5l.8-2.6A5.6 5.6 0 1 1 5.4 13l-2.9.5Z" />
    <path d="M6 5.6c.1-.3.3-.4.5-.4h.4c.1 0 .3.1.3.3l.4 1c0 .1 0 .3-.1.4l-.3.4c.3.7.9 1.3 1.7 1.7l.4-.3c.1-.1.3-.1.4-.1l1 .4c.2.1.3.2.3.3v.4c0 .2-.1.4-.4.5-.6.3-1.3.2-2-.2A5.2 5.2 0 0 1 6.2 7.6c-.4-.7-.5-1.4-.2-2Z" />
  </svg>
)

export const Mail = (p) => (
  <svg {...base} {...p}>
    <rect x="2" y="3.5" width="12" height="9" rx="2" />
    <path d="m2.5 4.5 5.5 4 5.5-4" />
  </svg>
)
