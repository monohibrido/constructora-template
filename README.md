# constructora-template (DaleClick)

Sitio para una constructora grande. React + Vite + Tailwind v4 + React Router. Diseño basado en ehauschile.cl.

## Cómo partir
```
npm install
npm run dev        # desarrollo
npm run build      # compila + genera HTML por ruta, sitemap.xml, robots.txt y 404.html
npm run preview    # ver lo compilado
```

## Qué editar (en este orden)
1. `src/config.js` → nombre, dominio real (https://...), WhatsApp, correo, dirección, redes, ID de Google Analytics, ID de Formspree. Lo marcado "(ejemplo)" es de demostración.
2. `src/data/*.js` → servicios, proyectos, FAQ, proceso.
3. `public/og-constructora.png` → imagen para compartir (1200x630), mismo nombre.
4. `public/favicon.svg`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `site.webmanifest`.

## Imágenes
Cada imagen tiene un .svg de referencia en `public/images/` que dice tamaño, nombre y dónde va.
1. Guarda tu foto con el MISMO nombre y carpeta, extensión `.webp`.
2. Reinicia `npm run dev` (o `npm run build`): el sitio detecta solo qué .webp existen y usa el .svg de referencia donde aún falta la foto.
3. `npm run faltantes` lista las fotos que faltan, con medida y ubicación.
4. Si agregas imágenes nuevas en los datos: `npm run placeholders` (crea el .svg solo de las que no tienen foto).

## SEO incluido
URLs descriptivas, title/description/canonical por página, Open Graph + Twitter, JSON-LD (GeneralContractor, WebSite, BreadcrumbList, FAQPage, Service), sitemap con imágenes, robots.txt, HTML prerenderizado por ruta, 404 con noindex, hreflang es-CL, Google Analytics (SPA), eventos de WhatsApp/formulario, alt + width/height + lazy en imágenes, caché y cabeceras en `vercel.json`.

## Después de publicar
Search Console: verificar dominio, enviar `https://TU-DOMINIO/sitemap.xml` y pedir indexación de la portada.
