import { Link } from 'react-router-dom'
import { Img, Reveal } from './ui.jsx'

export function ProjectCard({ p, delay = 0, priority = false }) {
  return (
    <Reveal delay={delay}>
      <Link to={`/proyectos/${p.slug}`} className="group block" aria-label={`Ver proyecto ${p.nombre}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-sand">
          <Img
            imagen={p.imagen}
            priority={priority}
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 bg-ink/85 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white">
            {p.tipo}
          </span>
        </div>
        <div className="pt-5">
          <p className="text-xs uppercase tracking-[0.16em] text-ink/55">
            {p.comuna} · {p.region}
          </p>
          <h3 className="mt-2 text-2xl font-medium leading-tight transition-colors group-hover:text-copper">{p.nombre}</h3>
          <p className="mt-2 text-sm text-ink/65">
            {p.superficie} · {p.estado}
          </p>
          <span className="mt-4 inline-block text-sm font-semibold text-copper">Ver proyecto →</span>
        </div>
      </Link>
    </Reveal>
  )
}

export function ServiceCard({ s, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <Link to={`/servicios/${s.slug}`} className="group block h-full bg-white" aria-label={`Ver servicio ${s.nombre}`}>
        <div className="aspect-[16/10] overflow-hidden bg-sand">
          <Img imagen={s.imagen} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div className="p-6 sm:p-7">
          <h3 className="text-2xl font-medium leading-tight transition-colors group-hover:text-copper">{s.nombre}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">{s.resumen}</p>
          <span className="mt-5 inline-block text-sm font-semibold text-copper">Ver servicio →</span>
        </div>
      </Link>
    </Reveal>
  )
}
