import { Link, useParams } from 'react-router-dom'
import { getProyecto, PROYECTOS } from '../data/proyectos.js'
import { getServicio } from '../data/servicios.js'
import { PageHero, Reveal, SectionHead, Img } from '../components/ui.jsx'
import { ProjectCard } from '../components/Cards.jsx'
import Gallery from '../components/Gallery.jsx'
import CtaBand from '../components/CtaBand.jsx'
import NotFound from './NotFound.jsx'

export default function ProyectoDetalle() {
  const { slug } = useParams()
  const p = getProyecto(slug)
  if (!p) return <NotFound />

  const servicio = getServicio(p.servicio)
  const relacionados = PROYECTOS.filter((x) => x.slug !== p.slug && x.tipo === p.tipo).concat(PROYECTOS.filter((x) => x.slug !== p.slug && x.tipo !== p.tipo)).slice(0, 3)

  const ficha = [
    ['Tipo de obra', p.tipo],
    ['Ubicación', `${p.comuna}, ${p.region}`],
    ['Superficie', p.superficie],
    ['Estado', `${p.estado} · ${p.anio}`],
    ['Plazo de ejecución', p.plazo],
    ['Mandante', p.mandante],
  ]

  return (
    <>
      <PageHero
        imagen={p.imagen}
        migas={[{ to: '/', texto: 'Inicio' }, { to: '/proyectos', texto: 'Proyectos' }, { texto: p.nombre }]}
        eyebrow={`${p.tipo} · ${p.comuna}`}
        title={p.nombre}
        text={p.resumen}
      />

      <section className="section">
        <div className="container-x grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHead eyebrow="Sobre el proyecto" title="Qué construimos *y cómo lo hicimos*" />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/75">
              {p.descripcion.map((t) => (
                <Reveal as="p" key={t}>
                  {t}
                </Reveal>
              ))}
            </div>
            <h2 className="mt-12 text-3xl font-medium">Alcance de la obra</h2>
            <ul className="mt-5 space-y-3">
              {p.alcance.map((a) => (
                <li key={a} className="flex gap-3 text-ink/75">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-copper" aria-hidden="true" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <aside aria-label="Ficha técnica del proyecto">
            <dl className="divide-y divide-ink/15 border-y border-ink/15 bg-white px-6">
              {ficha.map(([k, v]) => (
                <div key={k} className="py-4">
                  <dt className="eyebrow">{k}</dt>
                  <dd className="mt-1 text-base">{v}</dd>
                </div>
              ))}
            </dl>
            {servicio && (
              <Link to={`/servicios/${servicio.slug}`} className="btn-outline-dark mt-6 w-full">
                Ver servicio: {servicio.nombre}
              </Link>
            )}
          </aside>
        </div>
      </section>

      <section className="section bg-white pt-0 sm:pt-0">
        <div className="container-x pt-20 sm:pt-28">
          <SectionHead eyebrow="Galería del proyecto" title="Recorrido visual *de la obra*" />
          <div className="mt-12">
            <Gallery imagenes={p.galeria} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="Otros proyectos" title="Más obras *que podrían interesarte*" />
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {relacionados.map((r, i) => (
              <ProjectCard key={r.slug} p={r} delay={i * 90} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand mensaje={`Hola, vi el proyecto "${p.nombre}" en su sitio web y me gustaría cotizar una obra similar.`} />
    </>
  )
}
