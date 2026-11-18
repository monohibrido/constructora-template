// =====================================================================
//  IMÁGENES  (images.js)
//  Cada imagen del sitio se declara con image(...).
//
//  AHORA ES AUTOMÁTICO: si existe el .webp en public/images/ con el
//  nombre exacto, el sitio lo usa. Si todavía no existe, muestra el .svg
//  de referencia (que dice qué foto va ahí, con qué nombre y tamaño).
//  Ya no hay que activar nada a mano.
//
//  CÓMO AGREGAR UNA FOTO
//  1. Guarda tu foto en public/images/ con el MISMO nombre y carpeta que
//     el .svg de referencia, pero con extensión .webp
//  2. Reinicia "npm run dev" (o corre "npm run build"): la lista de fotos
//     disponibles (imagenes-webp.js) se actualiza sola.
//  3. Para ver qué fotos faltan:  npm run faltantes
// =====================================================================
import { WEBP_DISPONIBLES } from './imagenes-webp.js'

const disponibles = new Set(WEBP_DISPONIBLES)
const usaWebp = (file) => disponibles.has(file)

/**
 * @param {string} file   ruta dentro de public/images, SIN extensión
 * @param {number} w      ancho recomendado en px
 * @param {number} h      alto recomendado en px
 * @param {string} alt    texto alternativo descriptivo (importante para SEO)
 * @param {string} lugar  dónde se usa (solo aparece escrito en el SVG de referencia)
 */
export const image = (file, w, h, alt, lugar = '') => ({
  file,
  w,
  h,
  alt,
  lugar,
  src: `/images/${file}.${usaWebp(file) ? 'webp' : 'svg'}`,
})
