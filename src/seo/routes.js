// =====================================================================
//  SEO CENTRALIZADO  (routes.js)
//  Una sola fuente de verdad para: title, description, canonical,
//  Open Graph, Twitter Card y datos estructurados (JSON-LD) de CADA URL.
//  Lo usan 3 cosas:
//    1. vite.config.js  -> inyecta el head de la portada en index.html
//    2. scripts/postbuild.mjs -> genera un HTML por ruta + sitemap + robots
//    3. hooks/useSeo.js -> actualiza el head al navegar dentro del sitio
//  Este archivo NO puede usar nada del navegador (window, document).
// =====================================================================
import { SITE, CONTACTO, REDES, INTEGRACIONES, MENU, waLink, direccionCompleta } from '../config.js'
import { SERVICIOS } from '../data/servicios.js'
import { PROYECTOS } from '../data/proyectos.js'
import { FAQ_GENERAL } from '../data/faq.js'

export const abs = (path = '/') => `${SITE.dominio}${path === '/' ? '/' : path}`

// Las redes sociales no muestran bien un SVG: si la imagen aún es de referencia
// (.svg) se usa la imagen por defecto (PNG). Con tu .webp se usa la tuya.
const ogImagen = (img) => (img && img.src.endsWith('.webp') ? abs(img.src) : abs(SITE.ogImagen))

const titulo = (t) => `${t} | ${SITE.nombre}`
const recorta = (t, n = 158) => (t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t)

// ---------- datos estructurados (JSON-LD) ----------
const redesActivas = () => Object.values(REDES).filter(Boolean)

const ldOrganizacion = () => ({
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  '@id': `${SITE.dominio}/#organizacion`,
  name: SITE.nombre,
  url: abs('/'),
  logo: abs(SITE.logo),
  image: abs(SITE.ogImagen),
  description: SITE.descripcion,
  foundingDate: String(SITE.fundada),
  email: CONTACTO.email,
  telephone: CONTACTO.telefonos[0]?.tel,
  address: {
    '@type': 'PostalAddress',
    streetAddress: CONTACTO.direccion.calle,
    addressLocality: CONTACTO.direccion.comuna,
    addressRegion: CONTACTO.direccion.region,
    postalCode: CONTACTO.direccion.codigoPostal,
    addressCountry: CONTACTO.direccion.pais,
  },
  geo: { '@type': 'GeoCoordinates', latitude: CONTACTO.geo.lat, longitude: CONTACTO.geo.lng },
  areaServed: { '@type': 'Country', name: 'Chile' },
  sameAs: redesActivas(),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de construcción',
    itemListElement: SERVICIOS.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.titulo, url: abs(`/servicios/${s.slug}`) },
    })),
  },
})

const ldSitio = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.dominio}/#sitio`,
  url: abs('/'),
  name: SITE.nombre,
  inLanguage: SITE.idioma,
  publisher: { '@id': `${SITE.dominio}/#organizacion` },
})

const ldMigas = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.nombre,
    item: abs(it.path),
  })),
})

const ldFaq = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
})

const ldServicio = (s) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: s.titulo,
  description: s.resumen,
  url: abs(`/servicios/${s.slug}`),
  serviceType: s.nombre,
  provider: { '@id': `${SITE.dominio}/#organizacion` },
  areaServed: { '@type': 'Country', name: 'Chile' },
  image: ogImagen(s.imagen),
})

const ldProyecto = (p) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: p.nombre,
  description: p.resumen,
  url: abs(`/proyectos/${p.slug}`),
  image: p.imagenes.map((i) => (i.src.endsWith('.webp') ? abs(i.src) : abs(SITE.ogImagen))),
  creator: { '@id': `${SITE.dominio}/#organizacion` },
  locationCreated: {
    '@type': 'Place',
    name: `${p.comuna}, ${p.region}`,
    address: { '@type': 'PostalAddress', addressLocality: p.comuna, addressRegion: p.region, addressCountry: 'CL' },
  },
  genre: p.tipo,
  dateCreated: p.anio,
})

// ---------- rutas ----------
const hoy = new Date().toISOString().slice(0, 10)

const base = (r) => ({ ogType: 'website', imagen: ogImagen(), changefreq: 'monthly', priority: 0.7, lastmod: hoy, ld: [], links: [], ...r })

export const getRoutes = () => {
  const home = { nombre: 'Inicio', path: '/' }
  const rutas = []

  rutas.push(
    base({
      path: '/',
      title: `Constructora de obras industriales, comerciales y habitacionales en Chile | ${SITE.nombre}`,
      description: recorta(SITE.descripcion),
      h1: 'Tienes un proyecto. Lo construimos.',
      priority: 1,
      changefreq: 'weekly',
      ld: [ldOrganizacion(), ldSitio(), ldFaq(FAQ_GENERAL)],
      links: MENU.map((m) => ({ to: m.to, texto: m.texto })),
    })
  )

  rutas.push(
    base({
      path: '/proyectos',
      title: titulo('Proyectos y obras construidas en Chile'),
      description: recorta(
        'Conoce las obras industriales, comerciales, habitacionales e institucionales que hemos construido en Chile: superficies, plazos y alcance de cada proyecto.'
      ),
      h1: 'Proyectos y obras construidas',
      priority: 0.9,
      ld: [ldMigas([home, { nombre: 'Proyectos', path: '/proyectos' }])],
      links: PROYECTOS.map((p) => ({ to: `/proyectos/${p.slug}`, texto: p.nombre })),
    })
  )

  PROYECTOS.forEach((p) =>
    rutas.push(
      base({
        path: `/proyectos/${p.slug}`,
        title: titulo(`${p.nombre} · ${p.tipo} en ${p.comuna}`),
        description: recorta(`${p.resumen} ${p.superficie}, ${p.estado.toLowerCase()} en ${p.comuna}, ${p.region}.`),
        h1: p.nombre,
        imagen: ogImagen(p.imagen),
        imagenSitemap: p.imagenes.map((i) => ({ loc: abs(i.src), titulo: i.alt })),
        priority: 0.7,
        ld: [
          ldProyecto(p),
          ldMigas([home, { nombre: 'Proyectos', path: '/proyectos' }, { nombre: p.nombre, path: `/proyectos/${p.slug}` }]),
        ],
      })
    )
  )

  rutas.push(
    base({
      path: '/servicios',
      title: titulo('Servicios de construcción: industrial, comercial, habitacional y civil'),
      description: recorta(
        'Servicios de construcción de obras industriales y bodegas, edificios comerciales, habitacionales, colegios y clínicas, obras civiles, remodelaciones y ampliaciones.'
      ),
      h1: 'Servicios de construcción',
      priority: 0.9,
      ld: [ldMigas([home, { nombre: 'Servicios', path: '/servicios' }])],
      links: SERVICIOS.map((s) => ({ to: `/servicios/${s.slug}`, texto: s.titulo })),
    })
  )

  SERVICIOS.forEach((s) =>
    rutas.push(
      base({
        path: `/servicios/${s.slug}`,
        title: titulo(s.titulo),
        description: recorta(s.resumen),
        h1: s.titulo,
        imagen: ogImagen(s.imagen),
        priority: 0.8,
        ld: [
          ldServicio(s),
          ldFaq(s.preguntas),
          ldMigas([home, { nombre: 'Servicios', path: '/servicios' }, { nombre: s.nombre, path: `/servicios/${s.slug}` }]),
        ],
      })
    )
  )

  rutas.push(
    base({
      path: '/proceso-de-construccion',
      title: titulo('Proceso de construcción: de la planificación a la entrega'),
      description: recorta(
        'Conoce cómo trabajamos: estudio del proyecto, presupuesto y planificación, ejecución de la obra y entrega con control de calidad y seguridad.'
      ),
      h1: 'Nuestro proceso de construcción',
      ld: [ldMigas([home, { nombre: 'Proceso de construcción', path: '/proceso-de-construccion' }]), ldFaq(FAQ_GENERAL)],
    })
  )

  rutas.push(
    base({
      path: '/quienes-somos',
      title: titulo('Quiénes somos: empresa constructora en Chile'),
      description: recorta(
        `Somos ${SITE.nombre}, empresa constructora con más de ${new Date().getFullYear() - SITE.fundada} años de experiencia. Misión, visión, valores y zonas donde construimos.`
      ),
      h1: 'Quiénes somos',
      ld: [ldMigas([home, { nombre: 'Quiénes somos', path: '/quienes-somos' }])],
    })
  )

  rutas.push(
    base({
      path: '/contacto',
      title: titulo('Contacto y cotización de obras de construcción'),
      description: recorta(
        `Cotiza tu proyecto de construcción. Escríbenos por WhatsApp, completa el formulario o visítanos en ${direccionCompleta()}. ${CONTACTO.horario}.`
      ),
      h1: 'Cuéntanos sobre tu proyecto',
      priority: 0.8,
      ld: [ldMigas([home, { nombre: 'Contacto', path: '/contacto' }])],
    })
  )

  return rutas
}

export const META_404 = {
  path: '/404',
  title: titulo('Página no encontrada'),
  description: 'La página que buscas no existe o cambió de dirección.',
  h1: 'Página no encontrada',
  ogType: 'website',
  imagen: abs(SITE.ogImagen),
  noindex: true,
  ld: [],
  links: MENU.map((m) => ({ to: m.to, texto: m.texto })),
}

export const getMeta = (pathname) => {
  const limpio = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  return getRoutes().find((r) => r.path === limpio) || META_404
}

// ---------- etiquetas del <head> ----------
const esc = (t = '') =>
  String(t).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Devuelve la lista de etiquetas (sin <title>) como descriptores. */
export const headTags = (m) => {
  const url = abs(m.path === '/404' ? '/' : m.path)
  const tags = [
    { tag: 'meta', attrs: { name: 'description', content: m.description } },
    { tag: 'meta', attrs: { name: 'robots', content: m.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large' } },
    { tag: 'link', attrs: { rel: 'canonical', href: url } },
    { tag: 'link', attrs: { rel: 'alternate', hreflang: SITE.idioma, href: url } },
    { tag: 'link', attrs: { rel: 'alternate', hreflang: 'x-default', href: url } },
    { tag: 'meta', attrs: { property: 'og:type', content: m.ogType } },
    { tag: 'meta', attrs: { property: 'og:site_name', content: SITE.nombre } },
    { tag: 'meta', attrs: { property: 'og:locale', content: SITE.idioma.replace('-', '_') } },
    { tag: 'meta', attrs: { property: 'og:title', content: m.title } },
    { tag: 'meta', attrs: { property: 'og:description', content: m.description } },
    { tag: 'meta', attrs: { property: 'og:url', content: url } },
    { tag: 'meta', attrs: { property: 'og:image', content: m.imagen } },
    { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
    { tag: 'meta', attrs: { name: 'twitter:title', content: m.title } },
    { tag: 'meta', attrs: { name: 'twitter:description', content: m.description } },
    { tag: 'meta', attrs: { name: 'twitter:image', content: m.imagen } },
  ]
  if (m.ogType === 'article' && m.lastmod) tags.push({ tag: 'meta', attrs: { property: 'article:published_time', content: m.lastmod } })
  ;(m.ld || []).forEach((obj) => tags.push({ tag: 'script', json: obj }))
  return tags
}

const stringifyTag = (t) => {
  if (t.tag === 'script') {
    const json = JSON.stringify(t.json).replace(/</g, '\\u003c')
    return `<script type="application/ld+json" data-seo>${json}</script>`
  }
  const attrs = Object.entries(t.attrs)
    .map(([k, v]) => `${k}="${esc(v)}"`)
    .join(' ')
  return `<${t.tag} ${attrs} data-seo>`
}

/** Bloque HTML completo del <head> dinámico (title + metas + JSON-LD). */
export const renderHead = (m) =>
  [`<title>${esc(m.title)}</title>`, ...headTags(m).map(stringifyTag)].join('\n    ')

/** Contenido mínimo (visible para lectores de pantalla y buscadores) dentro de #root. */
export const renderBody = (m) => {
  const enlaces = (m.links || []).map((l) => `<li><a href="${esc(l.to)}">${esc(l.texto)}</a></li>`).join('')
  return (
    `<div class="seo-static" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">` +
    `<h1>${esc(m.h1)}</h1><p>${esc(m.description)}</p>` +
    (enlaces ? `<nav aria-label="Enlaces principales"><ul>${enlaces}</ul></nav>` : '') +
    `</div>`
  )
}

export const verificacionGoogle = () =>
  INTEGRACIONES.googleSiteVerification
    ? `<meta name="google-site-verification" content="${esc(INTEGRACIONES.googleSiteVerification)}">`
    : ''

export { waLink }
