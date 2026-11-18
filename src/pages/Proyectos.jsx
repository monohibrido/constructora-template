import { useState } from 'react'
import { PROYECTOS, TIPOS_PROYECTO } from '../data/proyectos.js'
import { PROYECTOS_PORTADA } from '../data/imagenesPaginas.js'
import { PageHero } from '../components/ui.jsx'
import { ProjectCard } from '../components/Cards.jsx'
import CtaBand from '../components/CtaBand.jsx'

export default function Proyectos() {
  const [filtro, setFiltro] = useState('Todos')
  const lista = filtro === 'Todos' ? PROYECTOS : PROYECTOS.filter((p) => p.tipo === filtro)

  return (
    <>
      <PageHero
        imagen={PROYECTOS_PORTADA}
        migas={[{ to: '/', texto: 'Inicio' }, { texto: 'Proyectos' }]}
        eyebrow="Portafolio de obras"
        title="Proyectos y *obras construidas*"
        text="Obras industriales, comerciales, habitacionales e institucionales ejecutadas con un solo equipo responsable, desde la planificación hasta la entrega."
      />

      <section className="section">
        <div className="container-x">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar proyectos por tipo de obra">
            {['Todos', ...TIPOS_PROYECTO].map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={filtro === t}
                onClick={() => setFiltro(t)}
                className={`border px-4 py-2 text-sm font-medium transition-colors ${
                  filtro === t ? 'border-ink bg-ink text-white' : 'border-ink/25 hover:border-copper hover:text-copper'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {lista.map((p, i) => (
              <ProjectCard key={p.slug} p={p} delay={(i % 3) * 90} />
            ))}
          </div>
          {lista.length === 0 && <p className="mt-10 text-ink/60">No hay proyectos de este tipo por ahora.</p>}
        </div>
      </section>

      <CtaBand
        eyebrow="¿Te imaginas algo similar?"
        title="Cada obra parte de *un proyecto y una conversación*"
        mensaje="Hola, vi los proyectos en su sitio web y me gustaría cotizar una obra."
      />
    </>
  )
}
