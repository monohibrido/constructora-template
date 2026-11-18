import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getMeta, headTags } from '../seo/routes.js'
import { registrarVista } from '../analytics.js'

// Actualiza <title>, meta description, canonical, Open Graph y JSON-LD
// cada vez que cambia la URL dentro del sitio (navegación sin recargar).
export default function useSeo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = getMeta(pathname)
    document.title = meta.title

    document.head.querySelectorAll('[data-seo]').forEach((n) => n.remove())
    headTags(meta).forEach((t) => {
      if (t.tag === 'script') {
        const s = document.createElement('script')
        s.type = 'application/ld+json'
        s.setAttribute('data-seo', '')
        s.textContent = JSON.stringify(t.json)
        document.head.appendChild(s)
      } else {
        const el = document.createElement(t.tag)
        Object.entries(t.attrs).forEach(([k, v]) => el.setAttribute(k, v))
        el.setAttribute('data-seo', '')
        document.head.appendChild(el)
      }
    })

    registrarVista(pathname, meta.title)
  }, [pathname])
}
