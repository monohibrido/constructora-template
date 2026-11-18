import { useRef, useState } from 'react'
import { INTEGRACIONES, SITE } from '../config.js'
import { SERVICIOS } from '../data/servicios.js'
import { registrarEvento } from '../analytics.js'

// Formulario con Formspree + anti-spam:
//  1) campo trampa invisible (_gotcha): los bots lo llenan, las personas no
//  2) tiempo mínimo: si se envía en menos de 4 segundos, se descarta
//  3) mensajes con 3 o más enlaces se descartan
export default function FormularioContacto() {
  const montado = useRef(Date.now())
  const [estado, setEstado] = useState('idle') // idle | enviando | ok | error | config
  const [error, setError] = useState('')

  async function enviar(e) {
    e.preventDefault()
    const form = e.currentTarget
    const datos = new FormData(form)

    // Anti-spam: si el campo trampa viene lleno, fingimos éxito y no enviamos nada
    if (datos.get('_gotcha')) {
      setEstado('ok')
      return
    }
    if (Date.now() - montado.current < 4000) {
      setError('Por favor espera unos segundos antes de enviar.')
      setEstado('error')
      return
    }
    if ((String(datos.get('mensaje')).match(/https?:\/\//gi) || []).length >= 3) {
      setError('El mensaje contiene demasiados enlaces.')
      setEstado('error')
      return
    }
    if (!INTEGRACIONES.formspreeId || INTEGRACIONES.formspreeId.startsWith('TU_ID')) {
      setEstado('config')
      return
    }

    setEstado('enviando')
    try {
      datos.append('_subject', `Nueva cotización desde ${SITE.nombre}`)
      const resp = await fetch(`https://formspree.io/f/${INTEGRACIONES.formspreeId}`, {
        method: 'POST',
        body: datos,
        headers: { Accept: 'application/json' },
      })
      if (!resp.ok) throw new Error('respuesta no válida')
      registrarEvento('envio_formulario', { origen: 'contacto' })
      form.reset()
      setEstado('ok')
    } catch {
      setError('No pudimos enviar el formulario. Inténtalo otra vez o escríbenos por WhatsApp.')
      setEstado('error')
    }
  }

  if (estado === 'ok') {
    return (
      <div className="border border-copper/40 bg-white p-8" role="status">
        <h3 className="text-3xl font-medium">¡Mensaje recibido!</h3>
        <p className="mt-3 text-ink/70">Gracias por escribirnos. Revisaremos tu proyecto y te contactaremos pronto.</p>
      </div>
    )
  }

  return (
    <form onSubmit={enviar} className="bg-white p-6 shadow-xl sm:p-9" noValidate={false}>
      <p className="eyebrow">Formulario de contacto</p>
      <h3 className="mt-2 text-3xl font-medium">Solicitar cotización</h3>

      {/* Campo trampa anti-spam: oculto para las personas */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          No completar este campo
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nombre" className="mb-2 block text-sm font-semibold">Nombre *</label>
          <input id="nombre" name="nombre" type="text" required autoComplete="name" className="field" />
        </div>
        <div>
          <label htmlFor="empresa" className="mb-2 block text-sm font-semibold">Empresa</label>
          <input id="empresa" name="empresa" type="text" autoComplete="organization" className="field" />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold">Correo *</label>
          <input id="email" name="email" type="email" required autoComplete="email" className="field" />
        </div>
        <div>
          <label htmlFor="telefono" className="mb-2 block text-sm font-semibold">Teléfono</label>
          <input id="telefono" name="telefono" type="tel" autoComplete="tel" className="field" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="tipo" className="mb-2 block text-sm font-semibold">Tipo de obra</label>
          <select id="tipo" name="tipo_de_obra" className="field" defaultValue="">
            <option value="">Selecciona una opción</option>
            {SERVICIOS.map((s) => (
              <option key={s.slug} value={s.nombre}>{s.nombre}</option>
            ))}
            <option value="Otro tipo de obra">Otro tipo de obra</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="mensaje" className="mb-2 block text-sm font-semibold">Cuéntanos sobre tu proyecto *</label>
          <textarea id="mensaje" name="mensaje" rows={5} required className="field" placeholder="Ubicación, superficie aproximada, plazos, etapa del proyecto…" />
        </div>
      </div>

      {estado === 'error' && <p role="alert" className="mt-5 text-sm font-medium text-red-700">{error}</p>}
      {estado === 'config' && (
        <p role="alert" className="mt-5 text-sm font-medium text-red-700">
          El formulario aún no está configurado: pega tu ID de Formspree en src/config.js (INTEGRACIONES.formspreeId).
        </p>
      )}

      <button type="submit" disabled={estado === 'enviando'} className="btn-primary mt-7 w-full disabled:opacity-60">
        {estado === 'enviando' ? 'Enviando…' : 'Enviar solicitud'}
      </button>
    </form>
  )
}
