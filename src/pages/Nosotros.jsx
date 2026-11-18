import { SITE, ZONAS, CERTIFICACIONES } from '../config.js'
import { PRINCIPIOS, VALORES, MISION, VISION } from '../data/proceso.js'
import { NOSOTROS_PORTADA, NOSOTROS_EQUIPO } from '../data/imagenesPaginas.js'
import { Img, PageHero, Reveal, SectionHead } from '../components/ui.jsx'
import CtaBand from '../components/CtaBand.jsx'

export default function Nosotros() {
  return (
    <>
      <PageHero
        imagen={NOSOTROS_PORTADA}
        migas={[{ to: '/', texto: 'Inicio' }, { texto: 'Quiénes somos' }]}
        eyebrow="La empresa"
        title="El equipo detrás *de cada obra*"
        text="Construcción con nombre, criterio y responsabilidad directa en cada etapa del proyecto."
      />

      <section className="section">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Identidad" title={`${SITE.nombre} es una empresa *constructora*`} />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/75">
              <Reveal as="p">
                Desde {SITE.fundada} construimos obras industriales, comerciales, habitacionales e institucionales para empresas, desarrolladores y organismos públicos. Ejecutamos el proyecto que el mandante necesita, sin vender unidades propias: nuestro foco es construir bien.
              </Reveal>
              <Reveal as="p">
                Operamos bajo un modelo integral: estudio del proyecto, presupuesto, planificación, ejecución y entrega a cargo de un solo equipo responsable, con ingeniería, maquinaria y subcontratos coordinados.
              </Reveal>
            </div>
          </div>
          <Reveal className="aspect-[7/5] overflow-hidden bg-sand">
            <Img imagen={NOSOTROS_EQUIPO} sizes="(min-width:1024px) 50vw, 100vw" />
          </Reveal>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <SectionHead eyebrow="Nuestro enfoque" title="Tres principios que guían *cada decisión*" />
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {PRINCIPIOS.map((x, i) => (
              <Reveal key={x.n} delay={i * 90}>
                <p className="font-serif text-5xl italic text-copper">{x.n}</p>
                <h3 className="mt-4 text-2xl font-medium">{x.titulo}</h3>
                <p className="mt-3 leading-relaxed text-ink/70">{x.texto}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-ink text-white">
        <div className="container-x grid gap-12 md:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-3">Misión</p>
            <p className="font-serif text-2xl leading-snug sm:text-3xl">{MISION}</p>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow mb-3">Visión</p>
            <p className="font-serif text-2xl leading-snug sm:text-3xl">{VISION}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="Valores" title="Los principios que guían *cada obra*" />
          <div className="mt-14 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-3">
            {VALORES.map((v, i) => (
              <Reveal key={v.n} delay={(i % 3) * 80} className="bg-stone p-8">
                <p className="font-serif text-3xl italic text-copper">{v.n}</p>
                <h3 className="mt-3 text-2xl font-medium">{v.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{v.texto}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Experiencia territorial" title="Dónde hemos *construido*" />
            <div className="mt-10 space-y-6">
              {Object.entries(ZONAS).map(([region, comunas]) => (
                <Reveal key={region}>
                  <h3 className="text-xl font-medium">{region}</h3>
                  <p className="mt-1 text-ink/65">{comunas.join(' · ')}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <SectionHead eyebrow="Gestión" title="Certificaciones *y estándares*" />
            <ul className="mt-10 space-y-5">
              {CERTIFICACIONES.map((c) => (
                <Reveal as="li" key={c.sigla} className="flex items-center gap-5 border border-ink/15 p-5">
                  <span className="font-serif text-2xl text-copper">{c.sigla}</span>
                  <span className="text-ink/70">{c.texto}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand eyebrow="Conversemos" title="Detrás de cada obra *hay una conversación directa*" text="Nos gusta conocer el proyecto antes de proponer cualquier cosa. Así empezamos todas nuestras obras." />
    </>
  )
}
