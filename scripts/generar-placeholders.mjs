// =====================================================================
//  Genera un .svg de REFERENCIA por cada imagen declarada en el sitio.
//  Cada SVG dice: qué foto va ahí, con qué nombre guardarla (.webp) y
//  qué tamaño usar.
//
//  Uso:   npm run placeholders
//  No borra ni pisa tus .webp: solo escribe los .svg.
// =====================================================================
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import * as servicios from '../src/data/servicios.js'
import * as proyectos from '../src/data/proyectos.js'
import * as proceso from '../src/data/proceso.js'
import * as paginas from '../src/data/imagenesPaginas.js'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const destino = join(raiz, 'public', 'images')

// Recorre todos los datos y junta cada objeto que sea una imagen (tiene file, w y h)
const imagenes = new Map()
const visitar = (valor) => {
  if (!valor || typeof valor !== 'object') return
  if (typeof valor.file === 'string' && typeof valor.w === 'number' && typeof valor.h === 'number') {
    imagenes.set(valor.file, valor)
    return
  }
  Object.values(valor).forEach(visitar)
}
;[servicios, proyectos, proceso, paginas].forEach(visitar)

const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Parte un texto largo en líneas de máximo n caracteres
const lineas = (texto, n) => {
  const out = []
  let linea = ''
  texto.split(' ').forEach((p) => {
    if ((linea + ' ' + p).trim().length > n) {
      out.push(linea.trim())
      linea = p
    } else linea += ' ' + p
  })
  if (linea.trim()) out.push(linea.trim())
  return out
}

const svgDe = (img) => {
  const { w, h, file, alt, lugar } = img
  const base = Math.min(w, h)
  const grande = Math.round(base * 0.05)
  const medio = Math.round(base * 0.03)
  const chico = Math.round(base * 0.024)
  const maxChars = Math.max(30, Math.floor(w / (medio * 0.58)))
  const cx = w / 2
  const cy = h / 2
  const altLineas = lineas(`"${alt}"`, maxChars).slice(0, 3)
  const nombre = `public/images/${file}.webp`
  const nombreLineas = lineas(nombre, Math.floor(maxChars * 1.15)).slice(0, 3)

  let y = cy - base * 0.16
  const textos = []
  const add = (t, size, fill, weight = 400, gap = 1.5) => {
    textos.push(`<text x="${cx}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${weight}" text-anchor="middle">${esc(t)}</text>`)
    y += size * gap
  }
  add('IMAGEN DE REFERENCIA', chico, '#d9894f', 700, 2.1)
  add(`${w} × ${h} px  ·  formato .webp`, grande, '#ffffff', 700, 1.9)
  if (lugar) add(lugar, medio, '#e8e2d6', 500, 1.8)
  y += medio * 0.4
  nombreLineas.forEach((l) => add(l, chico, '#9fd0ff', 500, 1.5))
  y += medio * 0.5
  altLineas.forEach((l) => add(l, chico, '#bdb8ac', 400, 1.5))

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(alt)}" font-family="Inter, Arial, Helvetica, sans-serif">
<defs>
<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2d2d29"/><stop offset="1" stop-color="#1c1c1a"/></linearGradient>
<pattern id="p" width="${Math.round(base / 12)}" height="${Math.round(base / 12)}" patternUnits="userSpaceOnUse"><path d="M ${Math.round(base / 12)} 0 L 0 0 0 ${Math.round(base / 12)}" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/></pattern>
</defs>
<rect width="${w}" height="${h}" fill="url(#g)"/>
<rect width="${w}" height="${h}" fill="url(#p)"/>
<path d="M0 ${h * 0.82} L${w * 0.28} ${h * 0.52} L${w * 0.45} ${h * 0.68} L${w * 0.78} ${h * 0.3} L${w} ${h * 0.48} L${w} ${h} L0 ${h} Z" fill="#b5622b" fill-opacity="0.16"/>
<rect x="${base * 0.025}" y="${base * 0.025}" width="${w - base * 0.05}" height="${h - base * 0.05}" fill="none" stroke="#b5622b" stroke-opacity="0.7" stroke-width="2" stroke-dasharray="14 10"/>
${textos.join('\n')}
</svg>
`
}

let n = 0
for (const img of imagenes.values()) {
  if (existsSync(join(destino, `${img.file}.webp`))) continue // ya tienes la foto real: no hace falta referencia
  const archivo = join(destino, `${img.file}.svg`)
  mkdirSync(dirname(archivo), { recursive: true })
  writeFileSync(archivo, svgDe(img))
  n++
}
console.log(`✔ ${n} imágenes de referencia (.svg) generadas en public/images/`)
