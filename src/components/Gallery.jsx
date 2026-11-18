import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Img, Reveal } from './ui.jsx'

// El visor usa createPortal para que quede por encima de todo (evita problemas de z-index).
function Lightbox({ imagenes, indice, onCerrar, onCambiar }) {
  const anterior = useCallback(() => onCambiar((indice - 1 + imagenes.length) % imagenes.length), [indice, imagenes.length, onCambiar])
  const siguiente = useCallback(() => onCambiar((indice + 1) % imagenes.length), [indice, imagenes.length, onCambiar])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onCerrar()
      if (e.key === 'ArrowLeft') anterior()
      if (e.key === 'ArrowRight') siguiente()
    }
    document.addEventListener('keydown', onKey)
    const previo = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previo
    }
  }, [anterior, siguiente, onCerrar])

  const img = imagenes[indice]
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Galería de imágenes"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4"
      onClick={onCerrar}
    >
      <button type="button" onClick={onCerrar} aria-label="Cerrar galería" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center text-3xl text-white">
        ×
      </button>
      {imagenes.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              anterior()
            }}
            aria-label="Imagen anterior"
            className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white/10 text-3xl text-white hover:bg-white/20"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              siguiente()
            }}
            aria-label="Imagen siguiente"
            className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white/10 text-3xl text-white hover:bg-white/20"
          >
            ›
          </button>
        </>
      )}
      <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <img src={img.src} alt={img.alt} className="max-h-[80vh] w-auto max-w-full object-contain" />
        <figcaption className="mt-3 text-center text-sm text-white/75">
          {img.alt} · {indice + 1}/{imagenes.length}
        </figcaption>
      </figure>
    </div>,
    document.body
  )
}

export default function Gallery({ imagenes, columnas = 'sm:grid-cols-3' }) {
  const [abierta, setAbierta] = useState(null)
  return (
    <>
      <div className={`grid gap-4 ${columnas}`}>
        {imagenes.map((img, i) => (
          <Reveal key={img.file} delay={i * 80}>
            <button
              type="button"
              onClick={() => setAbierta(i)}
              className="group block aspect-[4/3] w-full overflow-hidden bg-sand"
              aria-label={`Ampliar imagen: ${img.alt}`}
            >
              <Img imagen={img} sizes="(min-width:640px) 33vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" />
            </button>
          </Reveal>
        ))}
      </div>
      {abierta !== null && <Lightbox imagenes={imagenes} indice={abierta} onCerrar={() => setAbierta(null)} onCambiar={setAbierta} />}
    </>
  )
}
