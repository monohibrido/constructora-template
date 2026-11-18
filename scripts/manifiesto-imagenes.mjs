// =====================================================================
//  Escanea public/images/ y escribe src/data/imagenes-webp.js con la lista
//  de .webp que ya existen. Se ejecuta solo antes de "npm run dev" y
//  "npm run build" (predev / prebuild).
//
//  Uso manual para ver qué fotos faltan:   npm run faltantes
// =====================================================================
import { readdirSync, writeFileSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const imagenes = join(raiz, 'public', 'images')

const listar = (dir) =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n)
    return statSync(p).isDirectory() ? listar(p) : [p]
  })

const disponibles = listar(imagenes)
  .filter((p) => p.endsWith('.webp'))
  .map((p) => relative(imagenes, p).replaceAll('\\', '/').replace(/\.webp$/, ''))
  .sort()

writeFileSync(
  join(raiz, 'src', 'data', 'imagenes-webp.js'),
  `// ARCHIVO GENERADO AUTOMÁTICAMENTE por scripts/manifiesto-imagenes.mjs (no editar a mano)\nexport const WEBP_DISPONIBLES = ${JSON.stringify(disponibles, null, 2)}\n`
)

if (process.argv.includes('--faltantes')) {
  const mods = await Promise.all([
    import('../src/data/servicios.js'),
    import('../src/data/proyectos.js'),
    import('../src/data/proceso.js'),
    import('../src/data/imagenesPaginas.js'),
  ])
  const todas = new Map()
  const visitar = (v) => {
    if (!v || typeof v !== 'object') return
    if (typeof v.file === 'string' && typeof v.w === 'number') return void todas.set(v.file, v)
    Object.values(v).forEach(visitar)
  }
  mods.forEach(visitar)
  const hay = new Set(disponibles)
  const faltan = [...todas.values()].filter((i) => !hay.has(i.file))
  console.log(`✔ ${todas.size - faltan.length} de ${todas.size} fotos listas. Faltan ${faltan.length}:\n`)
  faltan.forEach((i) => console.log(`  ${i.w}x${i.h}  public/images/${i.file}.webp\n        (${i.lugar})`))
} else {
  console.log(`✔ ${disponibles.length} fotos .webp detectadas`)
}
