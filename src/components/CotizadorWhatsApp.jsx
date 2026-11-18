import { useState } from 'react'
import { SITE, waLink } from '../config.js'
import { SERVICIOS } from '../data/servicios.js'
import { registrarEvento } from '../analytics.js'

const SUPERFICIES = ['Hasta 1.000 m²', '1.000 a 5.000 m²', '5.000 a 20.000 m²', 'Más de 20.000 m²', 'Aún no lo sé']
const ETAPAS = ['Tengo proyecto y permisos', 'Tengo terreno y anteproyecto', 'Solo tengo el terreno', 'Estoy evaluando']
const TIPOS = [...SERVICIOS.map((s) => s.nombre), 'Otro tipo de obra']

function Opciones({ nombre, opciones, valor, onChange }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label={nombre}>
      {opciones.map((o) => (
        <button
          key={o}
          type="button"
          role="radio"
          aria-checked={valor === o}
          onClick={() => onChange(o)}
          className={`border px-3.5 py-2 text-sm transition-colors ${
            valor === o ? 'border-copper bg-copper text-white' : 'border-ink/25 bg-white hover:border-copper'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

// Reúne 4 respuestas y abre WhatsApp con el mensaje armado (se envía solo cuando la persona confirma).
export default function CotizadorWhatsApp({ origen = 'cotizador' }) {
  const [tipo, setTipo] = useState('')
  const [lugar, setLugar] = useState('')
  const [superficie, setSuperficie] = useState('')
  const [etapa, setEtapa] = useState('')

  const mensaje = [
    `Hola, quiero cotizar una obra con ${SITE.nombre}.`,
    tipo && `• Tipo de obra: ${tipo}`,
    lugar && `• Ubicación: ${lugar}`,
    superficie && `• Superficie aproximada: ${superficie}`,
    etapa && `• Etapa del proyecto: ${etapa}`,
  ]
    .filter(Boolean)
    .join('\n')

  return (
    <div className="bg-white p-6 shadow-xl sm:p-9">
      <p className="eyebrow">Cotización rápida</p>
      <h3 className="mt-2 text-3xl font-medium">Cuéntanos sobre tu proyecto</h3>
      <p className="mt-3 text-sm text-ink/65">Responde cuatro preguntas y conversemos directamente por WhatsApp.</p>

      <div className="mt-7 space-y-7">
        <div>
          <p className="text-sm font-semibold">01 · ¿Qué tipo de obra necesitas?</p>
          <Opciones nombre="Tipo de obra" opciones={TIPOS} valor={tipo} onChange={setTipo} />
        </div>
        <div>
          <label htmlFor={`${origen}-lugar`} className="text-sm font-semibold">
            02 · ¿Dónde se construirá?
          </label>
          <input
            id={`${origen}-lugar`}
            type="text"
            value={lugar}
            onChange={(e) => setLugar(e.target.value)}
            placeholder="Comuna o ciudad"
            className="field mt-3"
          />
        </div>
        <div>
          <p className="text-sm font-semibold">03 · ¿Qué superficie aproximada tiene?</p>
          <Opciones nombre="Superficie aproximada" opciones={SUPERFICIES} valor={superficie} onChange={setSuperficie} />
        </div>
        <div>
          <p className="text-sm font-semibold">04 · ¿En qué etapa está tu proyecto?</p>
          <Opciones nombre="Etapa del proyecto" opciones={ETAPAS} valor={etapa} onChange={setEtapa} />
        </div>
      </div>

      <a
        href={waLink(mensaje)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => registrarEvento('click_whatsapp', { origen, tipo_obra: tipo || 'sin_definir' })}
        className="btn-whatsapp mt-8 w-full"
      >
        Conversemos por WhatsApp
      </a>
      <p className="mt-3 text-xs text-ink/55">Abriremos WhatsApp con tus respuestas preparadas. El mensaje solo se envía cuando tú lo confirmas.</p>
    </div>
  )
}
