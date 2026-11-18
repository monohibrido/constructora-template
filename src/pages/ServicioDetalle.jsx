import { Link, useParams } from 'react-router-dom'
import { getServicio, SERVICIOS } from '../data/servicios.js'
import { PROYECTOS } from '../data/proyectos.js'
import { PageHero, Reveal, SectionHead } from '../components/ui.jsx'
import { ProjectCard, ServiceCard } from '../components/Cards.jsx'
import Gallery from '../components/Gallery.jsx'
import Faq from '../components/Faq.jsx'
import CtaBand from '../components/CtaBand.jsx'
import NotFound from './NotFound.jsx'

export default function ServicioDetalle() {
  const { slug } = useParams()
  const s = getServicio(slug)
  if (!s) return <NotFound />

  const proyectos = PROYECTOS.filter((p) => p.servicio === s.slug).slice(0, 3)
  const otros = SERVICIOS.filter((x) => x.slug !== s.slug).slice(0, 3)

  return (
    <>
      <PageHero
        imagen={s.imagen}
        migas={[{ to: '/', texto: 'Inicio' }, { to: '/servicios', texto: 'Servicios' }, { texto: s.nombre }]}
        eyebrow="Servicio de construcción"
        title={s.titulo}
        text={s.resumen}
      >
        <Link to="/contacto" className="btn-primary">
          Cotizar este servicio
        </Link>
      </PageHero>

      <section className="section">
        <div className="container-x grid gap-14 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionHead eyebrow="Descripción" title="Cómo construimos *este tipo de obra*" />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/75">
              {s.descripcion.map((t) => (
                <Reveal as="p" key={t}>
                  {t}
                </Reveal>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-white p-7">
              <h2 className="text-2xl font-medium">Qué incluye</h2>
              <ul className="mt-5 space-y-3">
                {s.incluye.map((i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink/75">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-copper" aria-hidden="true" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Tipos de obra</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.ejemplos.map((e) => (
                  <li key={e} className="border border-ink/20 px-3 py-1.5 text-sm">
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <SectionHead eyebrow="Galería" title="Así se ve *este servicio en obra*" />
          <div className="mt-12">
            <Gallery imagenes={s.galeria} columnas="sm:grid-cols-2" />
          </div>
        </div>
      </section>

      {proyectos.length > 0 && (
        <section className="section">
          <div className="container-x">
            <SectionHead eyebrow="Proyectos relacionados" title="Obras donde *aplicamos este servicio*" />
            <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {proyectos.map((p, i) => (
                <ProjectCard key={p.slug} p={p} delay={i * 90} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section bg-white">
        <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.4fr]">
          <SectionHead eyebrow="Preguntas frecuentes" title="Lo que *nos preguntan* sobre este servicio" />
          <Faq items={s.preguntas} />
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="Otros servicios" title="También *construimos*" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otros.map((o, i) => (
              <ServiceCard key={o.slug} s={o} delay={i * 90} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand mensaje={`Hola, quiero cotizar el servicio "${s.nombre}".`} />
    </>
  )
}
