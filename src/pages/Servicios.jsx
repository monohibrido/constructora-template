import { SERVICIOS } from '../data/servicios.js'
import { SERVICIOS_PORTADA } from '../data/imagenesPaginas.js'
import { PASOS } from '../data/proceso.js'
import { PageHero, SectionHead, Reveal } from '../components/ui.jsx'
import { ServiceCard } from '../components/Cards.jsx'
import CtaBand from '../components/CtaBand.jsx'

export default function Servicios() {
  return (
    <>
      <PageHero
        imagen={SERVICIOS_PORTADA}
        migas={[{ to: '/', texto: 'Inicio' }, { texto: 'Servicios' }]}
        eyebrow="Qué construimos"
        title="Servicios de *construcción*"
        text="Industrial, comercial, habitacional, institucional y obras civiles. Construimos el proyecto que necesites con un mismo estándar de seguridad, calidad y plazo."
      />

      <section className="section">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICIOS.map((s, i) => (
              <ServiceCard key={s.slug} s={s} delay={(i % 3) * 90} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <SectionHead eyebrow="Cómo lo hacemos" title="El mismo proceso *para cada tipo de obra*" />
          <ol className="mt-12 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
            {PASOS.map((p, i) => (
              <Reveal as="li" key={p.n} delay={i * 80} className="bg-white p-7">
                <p className="font-serif text-4xl italic text-copper">{p.n}</p>
                <h3 className="mt-4 text-xl font-medium">{p.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{p.corto}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title="¿No encuentras *tu tipo de obra*?" text="Construimos lo que tu proyecto necesite. Cuéntanos de qué se trata y te decimos cómo podemos ayudarte." />
    </>
  )
}
