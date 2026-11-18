import { PASOS, PILARES } from '../data/proceso.js'
import { FAQ_GENERAL } from '../data/faq.js'
import { PROCESO_PORTADA } from '../data/imagenesPaginas.js'
import { Img, PageHero, Reveal, SectionHead } from '../components/ui.jsx'
import Faq from '../components/Faq.jsx'
import CtaBand from '../components/CtaBand.jsx'

export default function Proceso() {
  return (
    <>
      <PageHero
        imagen={PROCESO_PORTADA}
        migas={[{ to: '/', texto: 'Inicio' }, { texto: 'Proceso de construcción' }]}
        eyebrow="Cómo trabajamos"
        title="El sello de nuestra obra, *en cuatro pasos*"
        text="Una metodología ordenada, cercana y transparente que integra planificación, gestión y construcción en un mismo proceso."
      />

      <section className="section">
        <div className="container-x space-y-20 sm:space-y-28">
          {PASOS.map((p, i) => (
            <div key={p.n} className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <Reveal className="aspect-[7/5] overflow-hidden bg-sand">
                <Img imagen={p.imagen} sizes="(min-width:1024px) 50vw, 100vw" />
              </Reveal>
              <Reveal delay={100}>
                <p className="font-serif text-6xl italic text-copper">{p.n}</p>
                <h2 className="mt-3 text-4xl font-medium leading-tight">{p.titulo}</h2>
                <p className="mt-5 text-lg leading-relaxed text-ink/75">{p.largo}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-ink text-white">
        <div className="container-x">
          <SectionHead dark eyebrow="Nuestros compromisos" title="Lo que *no se negocia* en ninguna obra" />
          <div className="mt-14 grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {PILARES.map((x, i) => (
              <Reveal key={x.n} delay={i * 90} className="bg-ink p-8">
                <p className="font-serif text-4xl italic text-copper">{x.n}</p>
                <h3 className="mt-4 text-2xl font-medium">{x.titulo}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{x.texto}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.4fr]">
          <SectionHead eyebrow="Preguntas frecuentes" title="Lo que más nos preguntan *antes de comenzar*" />
          <Faq items={FAQ_GENERAL} />
        </div>
      </section>

      <CtaBand eyebrow="Primer paso" title="Agenda una evaluación *inicial de tu proyecto*" />
    </>
  )
}
