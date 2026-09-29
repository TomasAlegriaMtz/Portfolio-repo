/* ============================================================================
   ✏️  TU CURRÍCULUM VIVE AQUÍ
   Todo el contenido de la página sale de este archivo. Cambia los textos,
   guarda, y la página se actualiza sola. No necesitas tocar ningún otro archivo.

   🌐  BILINGÜE: los textos que cambian de idioma se escriben así:
         { en: 'Texto en inglés', es: 'Texto en español' }
       Lo que no cambia (correo, links, nombres de tecnologías) va normal.
       La página abre en inglés; el switch EN/ES de arriba cambia a español.
       Para compartir el link directo en español: tusitio.com/?lang=es

   ⚠️  Marcado con "POR CONFIRMAR": datos que no venían en tu CV. Revísalos.
   ============================================================================ */

export const profile = {
  // name + lastName salen enormes en la portada; fullName va en la tarjeta y el PDF
  name: 'Tomás',
  lastName: 'Alegría',
  fullName: 'Tomás Alberto Alegría Martínez',
  role: { en: 'Full-Stack Developer', es: 'Desarrollador Full-Stack' },
  location: 'Jesús María, Aguascalientes',
  locationShort: 'AGS',

  // Muestra "Disponible" en el reverso de la tarjeta
  available: true,

  intro: {
    en: 'I build end-to-end web applications with React, Laravel and Node.js, and use AI to shorten the path from a business requirement to a working app.',
    es: 'Construyo aplicaciones web de punta a punta con React, Laravel y Node.js, y uso IA para acortar el camino entre un requerimiento de negocio y una aplicación funcionando.',
  },

  email: 'thalberto04@gmail.com',
  phone: '+52 449 504 6490',
  // Solo números, con lada de país. Déjalo en null para ocultar WhatsApp.
  whatsapp: '524495046490',
  website: null,
  links: {
    linkedin: 'https://www.linkedin.com/in/tomás-alberto-a52b30305',
    // Agrega tu GitHub aquí y aparecerá en contacto y en la tarjeta
    github: null,
  },

  // Opcional: pon tu foto en /public (ej. /public/foto.jpg) y escribe '/foto.jpg'
  photo: null,
  // Opcional: pon tu CV en /public y escribe su ruta. Puede ser uno por idioma:
  //   cvPdf: { en: '/cv-en.pdf', es: '/cv-es.pdf' }
  // Si lo dejas en null, "Download CV" genera un PDF limpio de esta misma página.
  cvPdf: null,
}

export const about = {
  // Envuelve palabras en **dobles asteriscos** para resaltarlas.
  // {years} se reemplaza automáticamente con tus años de experiencia.
  statement: {
    en: 'I study **Computer Engineering** at UAA and work as a full-stack developer at **Línea Italia**, where I build internal tools with React and Laravel and connect them to the ERP. What I enjoy most is **automation**: I designed an AI workflow that turns requirements from non-technical people into working applications. Outside of work, I practice **networking and cybersecurity**.',
    es: 'Estudio **Ingeniería en Computación** en la UAA y trabajo como desarrollador full-stack en **Línea Italia**, donde construyo herramientas internas con React y Laravel y las conecto con el ERP. Lo que más disfruto es **automatizar**: diseñé un flujo con IA que convierte los requerimientos de personas no técnicas en aplicaciones funcionales. Fuera del trabajo, practico **redes y ciberseguridad**.',
  },
  facts: [
    { label: { en: 'Based in', es: 'Base' }, value: 'Jesús María, Ags.' },
    {
      label: { en: 'Education', es: 'Formación' },
      value: { en: 'Computer Engineering · UAA', es: 'Ing. en Computación · UAA' },
    },
    {
      label: { en: 'Languages', es: 'Idiomas' },
      value: { en: 'Spanish · English C1 · Basic French', es: 'Español · Inglés C1 · Francés básico' },
    },
    {
      label: { en: 'Focus', es: 'Enfoque' },
      value: { en: 'Full-stack & AI automation', es: 'Full-stack y automatización con IA' },
    },
  ],
}

// Del más reciente al más antiguo. Fechas 'AAAA-MM'; end: null = trabajo actual.
// Si no tienes fechas, deja start en null y escribe periodLabel.
export const experience = [
  {
    start: '2026-02',
    end: null,
    role: { en: 'Full-Stack Developer', es: 'Desarrollador Full-Stack' },
    company: 'Línea Italia',
    location: null,
    summary: {
      en: "I build and maintain the company's internal applications and integrate them with the Business Central ERP.",
      es: 'Desarrollo y mantengo las aplicaciones internas de la empresa y las integro con el ERP Business Central.',
    },
    highlights: [
      {
        en: 'Engineered an AI-driven automation pipeline with custom Claude skills that lets non-technical stakeholders generate HTML/SQL blueprints from business requirements; an internal developer tool then turns them into fully functional React and Laravel applications.',
        es: 'Diseñé un pipeline de automatización con IA (skills personalizadas de Claude) que permite a personas no técnicas generar prototipos HTML/SQL a partir de requerimientos de negocio; una herramienta interna los convierte en aplicaciones React + Laravel funcionales.',
      },
      {
        en: 'Build and maintain internal web applications with Laravel (PHP) for backend logic and React for dynamic, responsive interfaces.',
        es: 'Construyo y mantengo aplicaciones web internas con Laravel (PHP) en el backend y React en la interfaz.',
      },
      {
        en: 'Architect and implement RESTful APIs that keep the Business Central ERP in sync with custom-built web platforms.',
        es: 'Diseño e implemento APIs REST que sincronizan el ERP Business Central con plataformas web propias.',
      },
      {
        en: "Provide IT support and help maintain the company's network infrastructure.",
        es: 'Doy soporte TI y ayudo a mantener la infraestructura de red de la empresa.',
      },
      {
        en: 'Wrote a provisioning script that sets up new laptops from scratch: silent installation and configuration of apps, network printers and removal of the telemetry services Windows ships with.',
        es: 'Escribí un script de aprovisionamiento que configura laptops nuevas desde cero: instalación silenciosa y configuración de apps, impresoras de red y eliminación de los servicios de telemetría que Windows trae por defecto.',
      },
    ],
    stack: ['React', 'Laravel', 'PHP', 'REST APIs', 'Business Central', 'Claude', 'Windows', { en: 'Networking', es: 'Redes' }],
  },
  {
    start: null, // POR CONFIRMAR: ¿cuándo empezaste y terminaste? ej. '2024-08'
    end: null,
    periodLabel: { en: 'Project', es: 'Proyecto' },
    role: { en: 'Full-Stack Developer', es: 'Desarrollador Full-Stack' },
    company: 'Nova Fénix',
    location: null,
    summary: {
      en: 'Professional web application for a physical therapy clinic.',
      es: 'Aplicación web profesional para una clínica de fisioterapia.',
    },
    highlights: [
      {
        en: 'Developed the application with Angular on the frontend and Node.js on the backend.',
        es: 'Desarrollé la aplicación con Angular en el frontend y Node.js en el backend.',
      },
      {
        en: 'Modeled and managed a MySQL relational database, ensuring data integrity for patient records and treatment history.',
        es: 'Modelé y administré una base de datos relacional en MySQL, cuidando la integridad de expedientes e historial de tratamientos.',
      },
      {
        en: 'Implemented an admin dashboard for service management and patient flow control.',
        es: 'Implementé un panel administrativo para la gestión de servicios y el flujo de pacientes.',
      },
      {
        en: 'Optimized performance and styling through DOM manipulation and clean, CSS-only solutions.',
        es: 'Optimicé el rendimiento y los estilos con manipulación del DOM y soluciones solo con CSS.',
      },
    ],
    stack: ['Angular', 'Node.js', 'MySQL', 'CSS'],
  },
]

// cover: 'pipeline' | 'sync' | 'dashboard' | 'chess' | 'document' | 'grid'
// image: '/proyecto.jpg' opcional; si la pones, reemplaza la ilustración.
// metric: { value, label } opcional — ¡los números venden! (label puede ser { en, es })
// link / repo: opcionales (null para ocultar).
export const projects = [
  {
    title: { en: 'From requirement to app, with AI', es: 'De requerimiento a app, con IA' },
    year: 2026,
    role: 'Línea Italia',
    description: {
      en: 'Custom Claude skills that guide non-technical staff to describe their process and generate an HTML prototype plus a SQL schema; an internal tool turns them into a React + Laravel app.',
      es: 'Skills personalizadas de Claude que guían a personas no técnicas para describir su proceso y generan prototipo HTML + esquema SQL; una herramienta interna los convierte en una app React + Laravel.',
    },
    metric: null,
    stack: ['Claude', 'React', 'Laravel', 'MySQL'],
    cover: 'pipeline',
    image: null,
    link: null,
    repo: null,
  },
  {
    title: { en: 'ERP ↔ Web integration', es: 'Integración ERP ↔ Web' },
    year: 2026,
    role: 'Línea Italia',
    description: {
      en: "REST APIs that keep data in sync between Business Central and the company's internal web platforms.",
      es: 'APIs REST que mantienen sincronizados los datos entre Business Central y las plataformas web internas de la empresa.',
    },
    metric: null,
    stack: ['Laravel', 'REST APIs', 'Business Central'],
    cover: 'sync',
    image: null,
    link: null,
    repo: null,
  },
  {
    title: { en: 'Multiplayer chess with AI', es: 'Ajedrez multijugador con IA' },
    year: null, // POR CONFIRMAR
    role: { en: 'Personal project', es: 'Proyecto personal' },
    description: {
      en: 'Android chess game with real-time multiplayer and a single-player mode against a custom Python AI that evaluates the board and computes the best move.',
      es: 'Juego de ajedrez para Android con partidas multijugador en tiempo real y modo individual contra una IA propia en Python que evalúa el tablero y calcula la mejor jugada.',
    },
    metric: null,
    stack: ['Kotlin', 'Python', 'Android Studio'],
    cover: 'chess',
    image: null,
    link: null,
    repo: null,
  },
  {
    title: { en: 'Physical therapy clinic system', es: 'Sistema para clínica de fisioterapia' },
    year: null, // POR CONFIRMAR
    role: 'Nova Fénix',
    description: {
      en: "Web app with patient records, treatment history and a dashboard to manage services and the clinic's patient flow.",
      es: 'Aplicación web con expedientes de pacientes, historial de tratamientos y un panel para administrar servicios y el flujo de la clínica.',
    },
    metric: null,
    stack: ['Angular', 'Node.js', 'MySQL'],
    cover: 'dashboard',
    image: null,
    link: null,
    repo: null,
  },
]

// usedIn: dónde la aplicaste (sale junto a la tecnología). years: opcional, dibuja una barra.
const chessAi = { en: 'Chess AI', es: 'IA de ajedrez' }
const chessApp = { en: 'Chess app', es: 'App de ajedrez' }

export const skills = [
  {
    category: { en: 'Web & backend', es: 'Web y backend' },
    items: [
      { name: 'React', usedIn: 'Línea Italia' },
      { name: 'Laravel', usedIn: 'Línea Italia' },
      { name: 'REST APIs', usedIn: 'Línea Italia' },
      { name: 'Angular', usedIn: 'Nova Fénix' },
      { name: 'Node.js', usedIn: 'Nova Fénix' },
      { name: 'Salesforce', usedIn: { en: 'Certification in progress', es: 'Certificación en curso' } },
    ],
  },
  {
    category: { en: 'Languages', es: 'Lenguajes' },
    items: [
      { name: 'JavaScript', usedIn: 'Línea Italia · Nova Fénix' },
      { name: 'PHP', usedIn: 'Línea Italia' },
      { name: 'Python', usedIn: chessAi },
      { name: 'Kotlin', usedIn: chessApp },
      { name: 'TypeScript' },
      { name: 'C++' },
      { name: 'Java' },
      { name: 'C#' },
      { name: 'Lua' },
    ],
  },
  {
    category: { en: 'Data', es: 'Datos' },
    items: [
      { name: 'MySQL', usedIn: 'Nova Fénix' },
      { name: 'SQL', usedIn: 'Línea Italia' },
      { name: 'Firebase' },
      { name: 'MongoDB' },
    ],
  },
  {
    category: { en: 'DevOps', es: 'DevOps' },
    items: [{ name: 'Docker' }, { name: 'Kubernetes' }, { name: 'CI/CD' }],
  },
  {
    category: { en: 'Tools', es: 'Herramientas' },
    items: [
      { name: { en: 'Claude / Generative AI', es: 'Claude / IA generativa' }, usedIn: 'Línea Italia' },
      { name: 'Business Central', usedIn: 'Línea Italia' },
      { name: { en: 'Git & GitHub', es: 'Git y GitHub' } },
      { name: 'Jira' },
      { name: 'Android Studio', usedIn: chessApp },
      { name: 'VS Code' },
    ],
  },
  {
    category: { en: 'Game engines', es: 'Motores de juego' },
    items: [{ name: 'Unreal Engine' }, { name: 'Blueprints' }, { name: 'Roblox Studio' }],
  },
]

/* ============================================================================
   🔐  REDES Y CIBERSEGURIDAD
   Esta sección tiene su propio diseño (terminal). Si algún día pones datos de
   ejemplo, cambia `example` a true y aparecerá un aviso "# TODO" en la terminal.
   ============================================================================ */

export const security = {
  example: false,

  intro: {
    en: 'At Línea Italia I also handle IT support, network infrastructure and laptop provisioning, and I train in TryHackMe labs. I want to understand how systems break so I can build and run them more securely.',
    es: 'En Línea Italia también me encargo de soporte TI, infraestructura de red y aprovisionamiento de laptops, y entreno en laboratorios de TryHackMe. Me interesa entender cómo se rompen los sistemas para construirlos y operarlos más seguros.',
  },

  // Tu trabajo real de TI. En la página se ve como tu script corriendo en una terminal.
  fieldWork: {
    place: 'Línea Italia',
    role: { en: 'IT support & network infrastructure', es: 'Soporte TI e infraestructura de red' },
    summary: {
      en: 'Besides developing, I support users, help maintain the network and prepare every new laptop with a script I wrote, so each machine comes out identical, clean and ready to work.',
      es: 'Además de desarrollar, doy soporte a usuarios, ayudo a mantener la red y preparo cada laptop nueva con un script que escribí, para que todas queden iguales, limpias y listas para trabajar.',
    },
    duties: [
      { en: 'End-user IT support', es: 'Soporte a usuarios' },
      { en: 'Network infrastructure', es: 'Infraestructura de red' },
      { en: 'Automated laptop provisioning', es: 'Aprovisionamiento automatizado de laptops' },
    ],
    // POR CONFIRMAR: el nombre real de tu script y la terminal donde corre
    shell: 'PS C:\\>',
    script: '.\\setup-laptop.ps1 -Silent',
    steps: [
      { en: 'Installing and configuring company apps (silent)', es: 'Instalando y configurando apps de la empresa (silencioso)' },
      { en: 'Adding network printers', es: 'Agregando impresoras de red' },
      { en: 'Removing default telemetry services', es: 'Quitando servicios de telemetría por defecto' },
    ],
    done: { en: 'Laptop ready for its user', es: 'Laptop lista para su usuario' },
  },

  platform: {
    name: 'TryHackMe',
    // Tu usuario público: activa el link a tu perfil (tryhackme.com/p/usuario)
    username: 'thalberto04',
  },

  // Los datos de tu perfil público de TryHackMe (actualízalos cuando subas).
  // En lugar de la racha va tu nivel: la racha cambia cada día y se quedaría vieja.
  stats: [
    { label: 'Ranking', value: 'Top 30%' },
    { label: 'Rooms', value: '23' },
    { label: { en: 'Badges', es: 'Insignias' }, value: '3' },
    { label: { en: 'Level · Seeker', es: 'Nivel · Seeker' }, value: '0x4' },
  ],

  // url: link de verificación del certificado (TryHackMe da uno por certificado)
  // inProgress: true para los que sigues cursando
  // Real: Pre Security completado. Agrega la fecha, el ID y el link de verificación
  // (en TryHackMe: Profile → Certificates). Cuando empieces otro path, agrégalo con inProgress: true.
  certifications: [{ title: 'Pre Security', kind: 'Learning path', date: null, id: null, url: null }],

  // Se muestra como la salida de un escaneo de nmap: puerto → lo que sabes de ese servicio.
  // Solo lo que cubre Pre Security y tu trabajo real; agrega filas conforme avances.
  knowledge: [
    { port: '22/tcp', service: 'ssh', skill: { en: 'Linux fundamentals and SSH', es: 'Fundamentos de Linux y SSH' } },
    { port: '53/udp', service: 'domain', skill: { en: 'How DNS works', es: 'Cómo funciona el DNS' } },
    { port: '67/udp', service: 'dhcps', skill: { en: 'DHCP and LAN basics', es: 'DHCP y redes LAN' } },
    { port: '80/tcp', service: 'http', skill: { en: 'How the web works: HTTP', es: 'Cómo funciona la web: HTTP' } },
    { port: '3389/tcp', service: 'ms-wbt-server', skill: { en: 'Windows fundamentals', es: 'Fundamentos de Windows' } },
    {
      port: '9100/tcp',
      service: 'jetdirect',
      skill: { en: 'Network printer deployment (Línea Italia)', es: 'Instalación de impresoras de red (Línea Italia)' },
    },
  ],

  networking: [{ en: 'OSI model', es: 'Modelo OSI' }, 'TCP/IP', 'Subnetting', 'DHCP', 'Firewalls', 'VPN'],
  // Herramientas de seguridad que ya hayas usado (nmap, wireshark…). Vacío = no se muestra.
  tools: [],
}

export const education = [
  {
    title: { en: 'Computer Engineering', es: 'Ingeniería en Computación' },
    school: 'Universidad Autónoma de Aguascalientes (UAA)',
    period: { en: 'Expected Dec 2026', es: 'Egreso: dic. 2026' },
  },
]

export const certifications = [
  { title: 'OCI 2024 Generative AI Certified Professional', issuer: 'Oracle', status: null },
  { title: 'Salesforce Platform Developer', issuer: 'Salesforce', status: { en: 'In progress', es: 'En curso' } },
]

export const languages = [
  { name: { en: 'Spanish', es: 'Español' }, level: { en: 'Native', es: 'Nativo' } },
  { name: { en: 'English', es: 'Inglés' }, level: { en: 'C1 · Advanced', es: 'C1 · Avanzado' } },
  { name: { en: 'French', es: 'Francés' }, level: { en: 'Basic', es: 'Básico' } },
]
