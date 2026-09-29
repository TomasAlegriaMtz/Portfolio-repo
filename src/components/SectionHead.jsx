export default function SectionHead({ label, count, title, id }) {
  return (
    <header className="section-head">
      <p className="section-rule mono" data-reveal>
        <span>{label}</span>
        {count && <span className="count">{count}</span>}
      </p>
      <h2 className="section-title display" id={id} data-reveal style={{ '--d': 1 }}>
        {title}
      </h2>
    </header>
  )
}
