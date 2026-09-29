/* El logo del CV redibujado en vector: una X con la T y la A a los lados
   y dos chevrones que apuntan al cruce. Hereda el color del texto (currentColor),
   así que cambia de gris a verde junto con el resto de la terminal. */
export default function Logo({ className, title }) {
  return (
    <svg
      className={className}
      viewBox="-6 -6 112 112"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {/* Dos trazos separados y translúcidos: donde se cruzan, brilla más (como en el original) */}
      <g stroke="currentColor" strokeWidth="3.4" strokeLinecap="butt" opacity="0.82">
        <line x1="0" y1="0" x2="100" y2="100" />
        <line x1="100" y1="1" x2="0" y2="100" />
      </g>
      <g fill="currentColor" opacity="0.85">
        <path d="M35 -1 L49 4.6 L63 -1 L49 12.4 Z" />
        <path d="M34 101.6 L48 88.4 L62 101.6 L48 96.6 Z" />
      </g>
      <g
        fill="currentColor"
        opacity="0.62"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="25"
        textAnchor="middle"
      >
        <text x="26.8" y="60">
          T
        </text>
        <text x="78.6" y="60">
          A
        </text>
      </g>
    </svg>
  )
}
