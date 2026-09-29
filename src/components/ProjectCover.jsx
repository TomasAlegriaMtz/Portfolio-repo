/* Ilustraciones generadas para cada tipo de proyecto.
   Usan los tokens del tema, así que funcionan en claro y oscuro. */

const Document = () => (
  <>
    <rect className="c-sheet" x="62" y="44" width="136" height="166" rx="10" />
    <rect className="c-ink-fill" x="80" y="64" width="56" height="8" rx="4" />
    <rect className="c-muted-fill" x="80" y="80" width="34" height="5" rx="2.5" />
    {[104, 122, 140, 158].map((y, i) => (
      <g key={y}>
        <rect className="c-muted-fill" x="80" y={y} width={[62, 48, 70, 40][i]} height="5" rx="2.5" />
        <rect className="c-muted-fill" x="160" y={y} width="20" height="5" rx="2.5" />
      </g>
    ))}
    <line className="c-line" x1="80" y1="178" x2="180" y2="178" />
    <rect className="c-ink-fill" x="148" y="188" width="32" height="7" rx="3.5" />

    <path className="c-accent-stroke" d="M214 127h40m-10-10 10 10-10 10" />

    <rect className="c-accent-fill" x="270" y="62" width="88" height="126" rx="10" />
    <rect className="c-on-accent" x="284" y="80" width="40" height="6" rx="3" opacity="0.9" />
    {[100, 114, 128].map((y) => (
      <rect key={y} className="c-on-accent" x="284" y={y} width="58" height="4" rx="2" opacity="0.45" />
    ))}
    <circle className="c-on-accent" cx="314" cy="163" r="12" opacity="0.95" />
    <path className="c-accent-stroke c-thick" d="M308.5 163.5l4 4 7.5-8" />
  </>
)

const Dashboard = () => {
  const bars = [46, 70, 58, 92, 80, 112, 98, 128]
  return (
    <>
      <rect className="c-sheet" x="44" y="36" width="312" height="180" rx="12" />
      <circle className="c-accent-fill" cx="66" cy="58" r="4" />
      <rect className="c-muted-fill" x="76" y="55" width="44" height="6" rx="3" />
      <rect className="c-ink-fill" x="290" y="54" width="46" height="9" rx="4.5" />
      {[98, 134, 170].map((y) => (
        <line key={y} className="c-grid" x1="66" y1={y} x2="336" y2={y} />
      ))}
      {bars.map((h, i) => (
        <rect
          key={i}
          className={i === bars.length - 1 ? 'c-accent-fill' : 'c-bar'}
          x={72 + i * 33}
          y={196 - h}
          width="20"
          height={h}
          rx="4"
        />
      ))}
      <polyline
        className="c-accent-stroke c-thick"
        points="82,150 115,128 148,138 181,104 214,114 247,86 280,96 313,70"
      />
      <circle className="c-accent-fill" cx="313" cy="70" r="5" />
    </>
  )
}

const Flow = () => (
  <>
    <path className="c-line" d="M112 125c28 0 26-50 54-50M112 125c28 0 26 50 54 50" />
    <path className="c-line" d="M236 75c28 0 26 50 54 50M236 175c28 0 26-50 54-50" />
    <rect className="c-sheet" x="40" y="104" width="72" height="42" rx="10" />
    <rect className="c-muted-fill" x="54" y="122" width="44" height="6" rx="3" />
    <rect className="c-sheet" x="166" y="54" width="70" height="42" rx="10" />
    <circle className="c-ink-fill" cx="184" cy="75" r="5" />
    <rect className="c-muted-fill" x="195" y="72" width="28" height="6" rx="3" />
    <rect className="c-sheet" x="166" y="154" width="70" height="42" rx="10" />
    <circle className="c-ink-fill" cx="184" cy="175" r="5" />
    <rect className="c-muted-fill" x="195" y="172" width="28" height="6" rx="3" />
    <rect className="c-accent-fill" x="290" y="102" width="72" height="46" rx="12" />
    <path className="c-on-accent-stroke c-thick" d="M314 125.5l7 7 13-14" />
  </>
)

const Grid = () => {
  const filled = new Set([2, 7, 9, 14, 16])
  const cells = Array.from({ length: 21 }, (_, i) => i)
  return (
    <>
      {cells.map((i) => {
        const col = i % 7
        const row = Math.floor(i / 7)
        const x = 60 + col * 42
        const y = 58 + row * 46
        return (
          <rect
            key={i}
            className={filled.has(i) ? 'c-accent-fill' : 'c-sheet'}
            x={x}
            y={y}
            width="32"
            height="34"
            rx="7"
          />
        )
      })}
      {/* Visor de escaneo alrededor de una celda */}
      <path
        className="c-ink-stroke c-thick"
        d="M178 108V102a6 6 0 0 1 6-6H190M214 96H220a6 6 0 0 1 6 6V108M226 134V140a6 6 0 0 1-6 6H214M190 146H184a6 6 0 0 1-6-6V134"
      />
      <line className="c-accent-stroke c-thick" x1="170" y1="121" x2="234" y2="121" />
    </>
  )
}

/* Dos sistemas que se mantienen sincronizados: ERP a la izquierda, web a la derecha */
const Sync = () => (
  <>
    <rect className="c-sheet" x="44" y="58" width="112" height="134" rx="12" />
    <rect className="c-ink-fill" x="62" y="76" width="44" height="8" rx="4" />
    {[98, 116, 134, 152, 170].map((y, i) => (
      <g key={y}>
        <rect className="c-muted-fill" x="62" y={y} width="14" height="6" rx="3" />
        <rect className="c-muted-fill" x="84" y={y} width={[52, 40, 56, 34, 46][i]} height="6" rx="3" />
      </g>
    ))}

    <path className="c-accent-stroke c-thick" d="M172 108h56m-10-10 10 10-10 10" />
    <path className="c-line" d="M228 142h-56m10 10-10-10 10-10" />

    <rect className="c-accent-fill" x="244" y="58" width="112" height="134" rx="12" />
    <rect className="c-on-accent" x="262" y="76" width="40" height="8" rx="4" opacity="0.95" />
    <rect className="c-on-accent" x="262" y="98" width="76" height="34" rx="6" opacity="0.22" />
    <rect className="c-on-accent" x="262" y="142" width="34" height="32" rx="6" opacity="0.4" />
    <rect className="c-on-accent" x="304" y="142" width="34" height="32" rx="6" opacity="0.22" />
  </>
)

/* Tablero con la jugada que calcula la IA */
const Chess = () => {
  const size = 22
  const x0 = 112
  const y0 = 37
  const cells = []
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if ((r + c) % 2 === 1) {
        cells.push(<rect key={`${r}-${c}`} className="c-bar" x={x0 + c * size} y={y0 + r * size} width={size} height={size} />)
      }
    }
  }
  const at = (c, r) => [x0 + c * size + size / 2, y0 + r * size + size / 2]
  const [fx, fy] = at(1, 7)
  const [tx, ty] = at(2, 5)
  const pieces = [
    [4, 0], [3, 1], [5, 1], [2, 2], [6, 3], [4, 4], [3, 6], [5, 6], [6, 7],
  ]
  return (
    <>
      <rect className="c-sheet" x={x0} y={y0} width={size * 8} height={size * 8} rx="4" />
      {cells}
      {pieces.map(([c, r]) => {
        const [cx, cy] = at(c, r)
        return <circle key={`${c}-${r}`} className="c-ink-fill" cx={cx} cy={cy} r="6" />
      })}
      <rect className="c-accent-stroke" x={x0 + 2 * size + 1} y={y0 + 5 * size + 1} width={size - 2} height={size - 2} rx="3" />
      <path className="c-accent-stroke c-thick" d={`M${fx} ${fy} L${fx} ${ty} L${tx - 5} ${ty}`} strokeDasharray="4 4" />
      <circle className="c-accent-fill" cx={fx} cy={fy} r="7" />
    </>
  )
}

const covers = {
  document: Document,
  dashboard: Dashboard,
  flow: Flow,
  pipeline: Flow,
  grid: Grid,
  sync: Sync,
  chess: Chess,
}

export default function ProjectCover({ type }) {
  const Cover = covers[type] ?? Document
  return (
    <svg className="cover-svg" viewBox="0 0 400 250" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <Cover />
    </svg>
  )
}
