// Piezas pequeñas reutilizables: texto con cursiva, imagen, aparición al scroll,
// encabezados de sección y migas de pan.
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/** Convierte "Inspírate con *nuestros proyectos*" en texto con la parte entre * en cursiva de color. */
export function Rich({ text, className = '' }) {
  const partes = text.split(/\*(.+?)\*/g)
  return (
    <span className={className}>
      {partes.map((p, i) =>
        i % 2 === 1 ? (
          <em key={i} className="font-serif font-normal italic text-copper">
            {p}
          </em>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </span>
  )
}

/** Imagen con alt, ancho y alto (evita saltos de diseño) y carga diferida. */
export function Img({ imagen, priority = false, className = '', sizes, ...rest }) {
  return (
    <img
      src={imagen.src}
      alt={imagen.alt}
      width={imagen.w}
      height={imagen.h}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
      sizes={sizes}
      className={`h-full w-full object-cover ${className}`}
      {...rest}
    />
  )
}

/** Hace aparecer el contenido suavemente cuando entra en pantalla. */
export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  )
}

/** Encabezado de sección: etiqueta + título (con *cursiva*) + texto. */
export function SectionHead({ eyebrow, title, text, center = false, dark = false, as: Tag = 'h2' }) {
  return (
    <Reveal className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <Tag className={`text-4xl font-medium leading-[1.1] sm:text-5xl ${dark ? 'text-white' : 'text-ink'}`}>
        <Rich text={title} />
      </Tag>
      {text && <p className={`mt-5 text-base leading-relaxed sm:text-lg ${dark ? 'text-white/70' : 'text-ink/70'}`}>{text}</p>}
    </Reveal>
  )
}

/** Migas de pan visibles (y equivalentes a las que se envían a Google). */
export function Migas({ items }) {
  return (
    <nav aria-label="Migas de pan" className="mb-6 text-xs uppercase tracking-[0.16em] text-white/65">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, i) => (
          <li key={it.to || it.texto} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {it.to ? (
              <Link to={it.to} className="hover:text-copper">
                {it.texto}
              </Link>
            ) : (
              <span aria-current="page" className="text-white">
                {it.texto}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Encabezado oscuro de las páginas interiores (con imagen de fondo opcional). */
export function PageHero({ migas, eyebrow, title, text, imagen, children }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink pb-16 pt-36 text-white sm:pb-24 sm:pt-44">
      {imagen && (
        <>
          <div className="absolute inset-0 -z-20">
            <Img imagen={imagen} priority />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/80 via-ink/70 to-ink" />
        </>
      )}
      <div className="container-x">
        {migas && <Migas items={migas} />}
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <h1 className="max-w-4xl text-4xl font-medium leading-[1.08] sm:text-6xl">
          <Rich text={title} />
        </h1>
        {text && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{text}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-4">{children}</div>}
      </div>
    </section>
  )
}
