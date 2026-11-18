import { Link } from 'react-router-dom'
import { SITE, CONTACTO, REDES, MENU, CREDITO, direccionCompleta, waLink } from '../config.js'
import { SERVICIOS } from '../data/servicios.js'
import Logo from './Logo.jsx'

const NOMBRES_REDES = { instagram: 'Instagram', linkedin: 'LinkedIn', facebook: 'Facebook', youtube: 'YouTube' }

export default function Footer() {
  const redes = Object.entries(REDES).filter(([, url]) => url)
  return (
    <footer className="bg-ink text-white/80">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo className="text-white" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
            Empresa constructora de obras industriales, comerciales, habitacionales e institucionales en Chile.
          </p>
        </div>

        <div>
          <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white">Páginas</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {MENU.map((m) => (
              <li key={m.to}>
                <Link to={m.to} className="transition-colors hover:text-copper">
                  {m.texto}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white">Servicios</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {SERVICIOS.map((s) => (
              <li key={s.slug}>
                <Link to={`/servicios/${s.slug}`} className="transition-colors hover:text-copper">
                  {s.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white">Oficina</h3>
          <address className="mt-5 space-y-3 text-sm not-italic">
            <p>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="hover:text-copper">
                WhatsApp: {CONTACTO.whatsappVisible}
              </a>
            </p>
            {CONTACTO.telefonos.map((t) => (
              <p key={t.tel}>
                <a href={`tel:${t.tel}`} className="hover:text-copper">
                  {t.visible}
                </a>
              </p>
            ))}
            <p>
              <a href={`mailto:${CONTACTO.email}`} className="hover:text-copper">
                {CONTACTO.email}
              </a>
            </p>
            <p className="text-white/65">{direccionCompleta()}</p>
            <p className="text-white/65">{CONTACTO.horario}</p>
          </address>
          {redes.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {redes.map(([clave, url]) => (
                <li key={clave}>
                  <a href={url} target="_blank" rel="noopener noreferrer me" className="hover:text-copper">
                    {NOMBRES_REDES[clave]}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/55 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.nombre}. Todos los derechos reservados.
          </p>
          <a href={CREDITO.url} target="_blank" rel="noopener noreferrer" className="hover:text-copper">
            {CREDITO.texto}
          </a>
        </div>
      </div>
    </footer>
  )
}
