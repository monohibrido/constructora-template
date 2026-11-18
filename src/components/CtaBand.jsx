import { Link } from 'react-router-dom'
import { waLink } from '../config.js'
import { registrarEvento } from '../analytics.js'
import { Rich, Reveal } from './ui.jsx'

export default function CtaBand({
  eyebrow = '¿Tienes un proyecto?',
  title = 'Conversemos sobre *tu obra*',
  text = 'Cuéntanos qué quieres construir y dónde. Revisamos tu proyecto y te proponemos los próximos pasos.',
  mensaje = 'Hola, quiero conversar sobre un proyecto de construcción.',
}) {
  return (
    <section className="bg-ink py-20 text-white sm:py-24">
      <Reveal className="container-x text-center">
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h2 className="mx-auto max-w-3xl text-4xl font-medium leading-[1.1] sm:text-5xl">
          <Rich text={title} />
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/70">{text}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <a
            href={waLink(mensaje)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => registrarEvento('click_whatsapp', { origen: 'banda_cta' })}
            className="btn-whatsapp"
          >
            Escribir por WhatsApp
          </a>
          <Link to="/contacto" className="btn-outline">
            Solicitar cotización
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
