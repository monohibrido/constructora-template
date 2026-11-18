// =====================================================================
//  POSTBUILD  (se ejecuta solo después de "npm run build")
//  1. Genera un HTML por cada URL (dist/proyectos/<slug>/index.html, etc.)
//     con su propio title, description, canonical, Open Graph y JSON-LD,
//     para buscadores y vistas previas de enlaces que no ejecutan JavaScript.
//  2. Genera dist/sitemap.xml (con imágenes) y dist/robots.txt
//  3. Genera dist/404.html (con noindex) para las URL que no existen.
// =====================================================================
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { getRoutes, META_404, renderHead, renderBody, abs } from '../src/seo/routes.js'
import { SITE } from '../src/config.js'

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const plantilla = join(dist, 'index.html')
if (!existsSync(plantilla)) {
  console.error('✘ No existe dist/index.html. Ejecuta "npm run build".')
  process.exit(1)
}

const html = readFileSync(plantilla, 'utf8')
const reHead = /<title>[\s\S]*?<!--SEO_HEAD_END-->/
if (!reHead.test(html)) {
  console.error('✘ No se encontró el bloque SEO_HEAD en dist/index.html')
  process.exit(1)
}

const paginaPara = (meta) =>
  html
    .replace(reHead, `${renderHead(meta)}\n    <!--SEO_HEAD_END-->`)
    .replace('<div id="root"></div>', `<div id="root">${renderBody(meta)}</div>`)

const escribir = (ruta, contenido) => {
  mkdirSync(dirname(ruta), { recursive: true })
  writeFileSync(ruta, contenido)
}

const rutas = getRoutes()

// 1) HTML por ruta (la portada ya está en dist/index.html; se reescribe con su contenido)
for (const meta of rutas) {
  const archivo = meta.path === '/' ? join(dist, 'index.html') : join(dist, meta.path, 'index.html')
  escribir(archivo, paginaPara(meta))
}

// 3) 404
escribir(join(dist, '404.html'), paginaPara(META_404))

// 2) sitemap.xml
const x = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const urls = rutas
  .map((m) => {
    const imagenes = (m.imagenSitemap || [])
      .filter((i) => i.loc.endsWith('.webp')) // solo imágenes reales (no los .svg de referencia)
      .map((i) => `    <image:image><image:loc>${x(i.loc)}</image:loc><image:title>${x(i.titulo)}</image:title></image:image>`)
      .join('\n')
    return `  <url>
    <loc>${x(abs(m.path))}</loc>
    <lastmod>${m.lastmod}</lastmod>
    <changefreq>${m.changefreq}</changefreq>
    <priority>${m.priority}</priority>${imagenes ? '\n' + imagenes : ''}
  </url>`
  })
  .join('\n')

writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`
)

// robots.txt
writeFileSync(
  join(dist, 'robots.txt'),
  `User-agent: *
Allow: /

Sitemap: ${SITE.dominio}/sitemap.xml
`
)

console.log(`✔ postbuild: ${rutas.length} páginas HTML, 404.html, sitemap.xml y robots.txt generados`)
