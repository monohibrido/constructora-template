import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { MENU } from '../config.js'
import Logo from './Logo.jsx'

export default function Navbar() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [abierto, setAbierto] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cierra el menú al cambiar de página
  useEffect(() => setAbierto(false), [pathname])

  // Bloquea el scroll mientras el menú está abierto
  useEffect(() => {
    document.body.style.overflow = abierto ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [abierto])

  const solido = scrolled || abierto

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 text-white transition-all duration-300 ${
        abierto ? 'bg-ink' : solido ? 'bg-ink/95 shadow-lg backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <Link
          to="/"
          aria-label="Ir al inicio"
          className="text-white"
          onClick={(e) => {
            // Si ya estás en el inicio, sube suave al banner superior
            if (pathname === '/') {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
        >
          <Logo />
        </Link>

        <nav aria-label="Navegación principal" className="hidden items-center gap-8 lg:flex">
          {MENU.map((m) => (
            <NavLink
              key={m.to}
              to={m.to}
              end={m.to === '/'}
              className={({ isActive }) =>
                `text-[0.8rem] font-medium uppercase tracking-[0.14em] transition-colors hover:text-copper ${
                  isActive ? 'text-copper' : 'text-white/90'
                }`
              }
            >
              {m.texto}
            </NavLink>
          ))}
          <Link to="/contacto#formulario" className="btn-primary !px-5 !py-3 !text-xs uppercase">
            Cotizar proyecto
          </Link>
        </nav>

        <button
          type="button"
          className="relative z-[60] flex h-11 w-11 items-center justify-center lg:hidden"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={abierto}
          aria-controls="menu-movil"
          onClick={() => setAbierto((v) => !v)}
        >
          <span className="block w-6">
            <span className={`block h-0.5 bg-white transition-transform ${abierto ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`my-[5px] block h-0.5 bg-white transition-opacity ${abierto ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-white transition-transform ${abierto ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </span>
        </button>
      </div>
    </header>

      {/* Menú lateral (móvil).
          Va FUERA del <header> a propósito: el header usa backdrop-blur, y eso encierra
          a todo elemento fixed que tenga dentro (el menú quedaba del alto del header y
          se veían las letras del banner). Con z-[45] queda debajo del header (z-50),
          así el logo y el botón ☰/✕ siguen visibles encima. */}
      <div
        id="menu-movil"
        className={`fixed inset-0 z-[45] overflow-y-auto bg-ink px-6 pb-10 pt-28 transition-transform duration-300 lg:hidden ${
          abierto ? 'translate-x-0' : 'pointer-events-none translate-x-full'
        }`}
        aria-hidden={!abierto}
      >
        <nav aria-label="Navegación móvil" className="flex flex-col gap-1">
          {MENU.map((m) => (
            <NavLink
              key={m.to}
              to={m.to}
              end={m.to === '/'}
              tabIndex={abierto ? 0 : -1}
              className={({ isActive }) =>
                `border-b border-white/10 py-4 font-serif text-2xl ${isActive ? 'text-copper' : 'text-white'}`
              }
            >
              {m.texto}
            </NavLink>
          ))}
          <Link to="/contacto#formulario" tabIndex={abierto ? 0 : -1} className="btn-primary mt-8 uppercase">
            Cotizar proyecto
          </Link>
        </nav>
      </div>
    </>
  )
}
