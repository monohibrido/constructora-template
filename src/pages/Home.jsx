import { Link } from 'react-router-dom'
import { CIFRAS, ZONAS, SITE, waLink } from '../config.js'
import { PROYECTOS } from '../data/proyectos.js'
import { SERVICIOS } from '../data/servicios.js'
import { PASOS } from '../data/proceso.js'
import { FAQ_GENERAL } from '../data/faq.js'
import { HERO, INICIO_POR_QUE, INICIO_OBRAS, INICIO_DETALLE } from '../data/imagenesPaginas.js'
import { registrarEvento } from '../analytics.js'
import { Img, Rich, Reveal, SectionHead } from '../components/ui.jsx'
import { ProjectCard, ServiceCard } from '../components/Cards.jsx'
import Faq from '../components/Faq.jsx'
import CotizadorWhatsApp from '../components/CotizadorWhatsApp.jsx'
import { CONTACTO, direccionCompleta } from '../config.js'

const PORQUE = [
  {
    n: '01',
    t: 'Un solo equipo responsable',
    p: 'Planificación, compras, ejecución y entrega bajo una misma dirección. Un interlocutor claro para el mandante en cada etapa.',
  },
  {
    n: '02',
    t: 'Construimos lo que tu proyecto necesita',
    p: 'Industrial, comercial, habitacional, institucional u obras civiles. Nos adaptamos al proyecto, no al revés.',
  },
  {
    n: '03',
    t: 'Seguridad, calidad y plazo',
    p: 'Prevención de riesgos en cada faena, control de calidad por partida y seguimiento semanal del cronograma.',
  },
]

const DETALLES = [
  'Obra gruesa en hormigón armado y estructuras metálicas con control en cada etapa.',
  'Prevención de riesgos y cumplimiento de normativa en todas las faenas.',
  'Instalaciones eléctricas, sanitarias y de climatización coordinadas desde el inicio.',
  'Terminaciones y fachadas pensadas para su uso, mantención y durabilidad.',
]

export default function Home() {
  const destacados = PROYECTOS.slice(0, 6)

  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 -z-20">
          <Img imagen={HERO} priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/30" />
        <div className="container-x pb-16 pt-40 sm:pb-24">
          <p className="eyebrow mb-5">{SITE.nombre} · Obras en todo Chile</p>
          <h1 className="max-w-4xl text-5xl font-medium leading-[1.04] sm:text-7xl">
            Tienes un proyecto. <em className="font-serif font-normal italic text-copper">Lo construimos.</em>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
            Construimos obras industriales, comerciales, habitacionales e institucionales. Un solo equipo responsable desde el estudio del proyecto hasta la entrega.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/contacto" className="btn-primary">
              Cotizar mi proyecto
            </Link>
            <Link to="/proyectos" className="btn-outline">
              Ver proyectos
            </Link>
          </div>
          <p className="mt-10 text-xs uppercase tracking-[0.2em] text-white/60">
            {Object.values(ZONAS).flat().slice(0, 6).join(' · ')}
          </p>
        </div>
      </section>

      {/* CIFRAS */}
      <section aria-label="Cifras de la empresa" className="bg-ink text-white">
        <div className="container-x grid grid-cols-2 gap-y-10 border-t border-white/10 py-12 lg:grid-cols-4">
          {CIFRAS.map((c, i) => (
            <Reveal key={c.etiqueta} delay={i * 80} className="px-2 text-center lg:border-l lg:border-white/10 lg:first:border-l-0">
              <p className="font-serif text-4xl font-medium text-copper sm:text-5xl">{c.valor}</p>
              <p className="mt-2 text-sm font-semibold">{c.etiqueta}</p>
              <p className="mt-1 text-xs text-white/55">{c.detalle}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROYECTOS SELECCIONADOS */}
      <section className="section">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHead eyebrow="Proyectos seleccionados" title="Obras que *hablan por nosotros*" />
            <Reveal>
              <Link to="/proyectos" className="btn-outline-dark">
                Ver todos los proyectos
              </Link>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {destacados.map((p, i) => (
              <ProjectCard key={p.slug} p={p} delay={(i % 3) * 90} />
            ))}
          </div>
        </div>
      </section>

      {/* POR QUÉ */}
      <section className="section bg-white">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="aspect-[7/5] overflow-hidden bg-sand">
            <Img imagen={INICIO_POR_QUE} sizes="(min-width:1024px) 50vw, 100vw" />
          </Reveal>
          <div>
            <SectionHead eyebrow={`Por qué ${SITE.nombreCorto}`} title="Construcción de principio a fin, *bajo una misma mirada*" />
            <ol className="mt-10 space-y-8">
              {PORQUE.map((x, i) => (
                <Reveal as="li" key={x.n} delay={i * 90} className="flex gap-5">
                  <span className="font-serif text-3xl italic text-copper">{x.n}</span>
                  <div>
                    <h3 className="text-2xl font-medium">{x.t}</h3>
                    <p className="mt-2 leading-relaxed text-ink/70">{x.p}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="section">
        <div className="container-x">
          <SectionHead
            eyebrow="Servicios"
            title="Todo tipo de obra, *un mismo estándar*"
            text="Desde una bodega industrial hasta un edificio de oficinas o la urbanización de un parque. Estos son los servicios que más nos piden."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICIOS.map((s, i) => (
              <ServiceCard key={s.slug} s={s} delay={(i % 3) * 90} />
            ))}
          </div>
        </div>
      </section>

      {/* OBRAS EN EJECUCIÓN */}
      <section className="section bg-ink text-white">
        <div className="container-x">
          <SectionHead
            dark
            eyebrow="Obras en ejecución"
            title="Del plano a la obra, *con estándar de entrega*"
            text="Una selección de faenas y terminaciones que muestran cómo trabajamos en terreno."
          />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            <Reveal className="aspect-[4/5] overflow-hidden bg-ink-soft md:row-span-2 md:aspect-auto">
              <Img imagen={INICIO_OBRAS[0]} sizes="(min-width:768px) 33vw, 100vw" />
            </Reveal>
            <Reveal delay={90} className="aspect-[3/2] overflow-hidden bg-ink-soft md:col-span-2">
              <Img imagen={INICIO_OBRAS[1]} sizes="(min-width:768px) 66vw, 100vw" />
            </Reveal>
            <Reveal delay={180} className="aspect-[3/2] overflow-hidden bg-ink-soft md:col-span-2">
              <Img imagen={INICIO_OBRAS[2]} sizes="(min-width:768px) 66vw, 100vw" />
            </Reveal>
          </div>
          <Reveal className="mt-12 flex flex-wrap gap-4">
            <Link to="/contacto" className="btn-primary">
              Cotizar mi proyecto
            </Link>
            <Link to="/proyectos" className="btn-outline">
              Ver proyectos
            </Link>
          </Reveal>
        </div>
      </section>

      {/* PROCESO */}
      <section className="section">
        <div className="container-x">
          <SectionHead
            eyebrow="Cómo trabajamos"
            title="Un proceso claro, *de principio a fin*"
            text="Cuatro etapas, cada una con decisiones, avances y entregables que compartimos contigo."
          />
          <ol className="mt-14 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
            {PASOS.map((p, i) => (
              <Reveal as="li" key={p.n} delay={i * 90} className="bg-stone p-7 sm:p-8">
                <p className="font-serif text-5xl italic text-copper">{p.n}</p>
                <h3 className="mt-5 text-2xl font-medium">{p.titulo}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{p.corto}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-10 flex flex-wrap items-center gap-6">
            <Link to="/proceso-de-construccion" className="btn-outline-dark">
              Ver proceso completo →
            </Link>
            <p className="max-w-md text-sm text-ink/65">
              <strong className="text-ink">Continuidad en cada etapa.</strong> Revisamos los antecedentes y las decisiones necesarias antes de avanzar a la siguiente.
            </p>
          </Reveal>
        </div>
      </section>

      {/* DETALLE CONSTRUCTIVO */}
      <section className="section bg-white">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHead eyebrow="Detalle constructivo" title="Ingeniería, seguridad *y detalle como parte de la obra*" />
            <ul className="mt-8 space-y-4">
              {DETALLES.map((d, i) => (
                <Reveal as="li" key={d} delay={i * 70} className="flex gap-3 leading-relaxed text-ink/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-copper" aria-hidden="true" />
                  {d}
                </Reveal>
              ))}
            </ul>
            <Reveal className="mt-9">
              <Link to="/contacto" className="btn-primary">
                Quiero cotizar mi proyecto
              </Link>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {INICIO_DETALLE.map((img, i) => (
              <Reveal key={img.file} delay={i * 70} className={`overflow-hidden bg-sand ${i === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-[4/3]'}`}>
                <Img imagen={img} sizes="(min-width:1024px) 30vw, 50vw" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.4fr]">
          <SectionHead eyebrow="Preguntas frecuentes" title="Lo que más nos preguntan *antes de comenzar*" />
          <Faq items={FAQ_GENERAL} />
        </div>
      </section>

      {/* CONTACTO / COTIZADOR */}
      <section className="section bg-ink text-white" id="evaluar-proyecto">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHead dark eyebrow="Evaluación inicial" title="Conversemos *sobre tu obra*" text="Una primera evaluación parte con información sencilla: qué quieres construir, dónde y la superficie aproximada." />
            <dl className="mt-10 space-y-6 text-sm">
              <div>
                <dt className="eyebrow">WhatsApp</dt>
                <dd className="mt-1 text-lg">
                  <a
                    href={waLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => registrarEvento('click_whatsapp', { origen: 'inicio_contacto' })}
                    className="hover:text-copper"
                  >
                    {CONTACTO.whatsappVisible}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Correo</dt>
                <dd className="mt-1 text-lg">
                  <a href={`mailto:${CONTACTO.email}`} className="hover:text-copper">
                    {CONTACTO.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Oficina</dt>
                <dd className="mt-1 text-lg text-white/80">{direccionCompleta()}</dd>
              </div>
            </dl>
          </div>
          <div className="text-ink">
            <CotizadorWhatsApp origen="inicio" />
          </div>
        </div>
      </section>
    </>
  )
}
