import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { getRoutes, renderHead, verificacionGoogle } from './src/seo/routes.js'
import { SITE } from './src/config.js'

// Inyecta en index.html el <head> de la portada (title, description, canonical,
// Open Graph, JSON-LD...) leyendo todo desde src/config.js y src/seo/routes.js.
const inyectarSeo = () => ({
  name: 'inyectar-seo-desde-config',
  transformIndexHtml(html) {
    const home = getRoutes().find((r) => r.path === '/')
    return html
      .replace('<!--SEO_HEAD-->', `<!--SEO_HEAD_START-->\n    ${renderHead(home)}\n    <!--SEO_HEAD_END-->`)
      .replace('<!--VERIFICACION_GOOGLE-->', verificacionGoogle())
      .replaceAll('%COLOR_TEMA%', SITE.colorTema)
      .replaceAll('%NOMBRE_SITIO%', SITE.nombre)
  },
})

export default defineConfig({
  plugins: [react(), tailwindcss(), inyectarSeo()],
})
