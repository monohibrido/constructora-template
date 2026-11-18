import { INTEGRACIONES } from './config.js'

const activo = () => INTEGRACIONES.gaId && !INTEGRACIONES.gaId.includes('XXXX')

// Carga Google Analytics 4 solo si pusiste un ID real en config.js
export function iniciarAnalytics() {
  if (!activo() || typeof window === 'undefined') return
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${INTEGRACIONES.gaId}`
  document.head.appendChild(s)
  window.dataLayer = window.dataLayer || []
  window.gtag = function () {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  // page_view lo enviamos nosotros en cada cambio de ruta (sitio SPA)
  window.gtag('config', INTEGRACIONES.gaId, { send_page_view: false })
}

export function registrarVista(path, titulo) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', { page_path: path, page_title: titulo })
  }
}

export function registrarEvento(nombre, datos = {}) {
  if (typeof window !== 'undefined' && window.gtag) window.gtag('event', nombre, datos)
}
