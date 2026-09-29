# Portafolio / CV

Sitio personal hecho con React + Vite + Motion.

## Correrlo en tu compu

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Poner tu información

Todo el contenido vive en **`src/data/cv.js`**: nombre, rol, experiencia, proyectos, habilidades,
formación y contacto. Cambia los textos, guarda y la página se actualiza sola.

- **Foto (opcional):** pon `foto.jpg` en `public/` y en `cv.js` escribe `photo: '/foto.jpg'`.
- **CV en PDF (opcional):** pon `cv.pdf` en `public/` y escribe `cvPdf: '/cv.pdf'`.
  Si lo dejas en `null`, el botón "Descargar CV" abre la impresión de la página, que tiene
  un diseño especial para papel: elige "Guardar como PDF".
- **Imágenes de proyectos (opcional):** pon la captura en `public/` y usa `image: '/mi-proyecto.png'`.
- En `index.html` cambia el `<title>` y la descripción por tu nombre (es lo que sale en Google y al compartir el link).

## Inglés / español

La página abre en **inglés** y el switch **EN | ES** de la barra de arriba cambia a español
(se recuerda la elección del visitante).

- Tus textos bilingües van en `src/data/cv.js` con la forma `{ en: '...', es: '...' }`.
- Los textos de la interfaz (botones, títulos de sección) están en `src/i18n/strings.js`.
- Link directo en español para reclutadores locales: `https://tu-sitio.com/?lang=es`

## Publicarlo gratis

1. Sube la carpeta a un repositorio de GitHub.
2. Entra a [vercel.com](https://vercel.com) o [netlify.com](https://netlify.com), importa el repo y dale Deploy.
   Detectan Vite solos (build: `npm run build`, carpeta: `dist`).
