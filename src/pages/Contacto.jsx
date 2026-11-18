import { CONTACTO, REDES, waLink, direccionCompleta } from '../config.js'
import { CONTACTO_PORTADA } from '../data/imagenesPaginas.js'
import { registrarEvento } from '../analytics.js'
import { PageHero, Reveal } from '../components/ui.jsx'
import CotizadorWhatsApp from '../components/CotizadorWhatsApp.jsx'
import FormularioContacto from '../components/FormularioContacto.jsx'

export default function Contacto() {
  const redes = Object.entries(REDES).filter(([, url]) => url)
  const mapa = `https://www.google.com/maps?q=${encodeURIComponent(CONTACTO.mapaConsulta)}&output=embed`

  return (
    <>
      <PageHero
        imagen={CONTACTO_PORTADA}
        migas={[{ to: '/', texto: 'Inicio' }, { texto: 'Contacto' }]}
        eyebrow="Evaluación inicial"
        title="Cuéntanos sobre *tu proyecto*"
        text="Agenda una primera conversación para revisar tu proyecto, ubicación, plazos y próximos pasos."
      >
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => registrarEvento('click_whatsapp', { origen: 'contacto_hero' })}
          className="btn-whatsapp"
        >
          Escribir por WhatsApp
        </a>
      </PageHero>

      <section className="section">
        <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow mb-3">Datos de contacto</p>
            <h2 className="text-4xl font-medium leading-tight">
              Hablemos <em className="font-serif font-normal italic text-copper">directamente</em>
            </h2>
            <dl className="mt-10 space-y-7">
              <div>
                <dt className="eyebrow">WhatsApp</dt>
                <dd className="mt-1 text-lg">
                  <a href={waLink()} target="_blank" rel="noopener noreferrer" className="hover:text-copper">
                    {CONTACTO.whatsappVisible}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Teléfono</dt>
                {CONTACTO.telefonos.map((t) => (
                  <dd key={t.tel} className="mt-1 text-lg">
                    <a href={`tel:${t.tel}`} className="hover:text-copper">
                      {t.visible}
                    </a>
                  </dd>
                ))}
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
                <dd className="mt-1 text-lg">{direccionCompleta()}</dd>
                <dd className="mt-1 text-sm text-ink/60">{CONTACTO.horario}</dd>
              </div>
              {redes.length > 0 && (
                <div>
                  <dt className="eyebrow">Redes sociales</dt>
                  <dd className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-lg">
                    {redes.map(([k, url]) => (
                      <a key={k} href={url} target="_blank" rel="noopener noreferrer me" className="capitalize hover:text-copper">
                        {k}
                      </a>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </Reveal>

          <div id="formulario" className="scroll-mt-28 space-y-10">
            <CotizadorWhatsApp origen="contacto" />
            <FormularioContacto />
          </div>
        </div>
      </section>

      <section aria-label="Ubicación de la oficina" className="bg-white">
        <iframe
          title={`Mapa de la oficina en ${CONTACTO.direccion.comuna}`}
          src={mapa}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[420px] w-full border-0"
        />
      </section>
    </>
  )
}
