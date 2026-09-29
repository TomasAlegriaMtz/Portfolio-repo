const toDate = (ym) => {
  const [y, m] = ym.split('-').map(Number)
  return new Date(y, m - 1, 1)
}

const monthsBetween = (start, end) => {
  const a = toDate(start)
  const b = end ? toDate(end) : new Date()
  return (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth()) + 1
}

export const yearsOfExperience = (experience) => {
  const jobs = experience.filter((job) => job.start)
  if (!jobs.length) return 0
  const earliest = jobs.reduce((min, job) => (job.start < min ? job.start : min), jobs[0].start)
  return Math.floor(monthsBetween(earliest, null) / 12)
}

// "3 years · 2 companies", or just "2 companies" until the first full year
export const experienceSummary = (experience, t) => {
  const years = yearsOfExperience(experience)
  const companies = new Set(experience.map((job) => job.company)).size
  const parts = []
  if (years >= 1) parts.push(t.experience.years(years))
  parts.push(t.experience.companies(companies))
  return parts.join(' · ')
}

export const formatPeriod = (job, t) => {
  if (!job.start) return job.periodLabel ?? ''
  const from = job.start.split('-')[0]
  const to = job.end ? job.end.split('-')[0] : t.experience.present
  return from === to ? from : `${from} — ${to}`
}

export const formatDuration = (job, t) => {
  if (!job.start) return ''
  const total = monthsBetween(job.start, job.end)
  const y = Math.floor(total / 12)
  const m = total % 12
  const parts = []
  if (y) parts.push(t.experience.years(y))
  if (m) parts.push(t.experience.months(m))
  return parts.join(' ')
}

export const initials = (name, lastName) => `${name[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase()

// Nombre sin acentos para prompts de terminal: "Tomás" → "tomas"
export const handleOf = (name) =>
  name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()

// "Text with **highlight**" → [{ text, strong }]
export const parseHighlights = (text) =>
  text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((part) =>
    part.startsWith('**') ? { text: part.slice(2, -2), strong: true } : { text: part, strong: false },
  )
