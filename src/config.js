// =====================================================================
//  CONFIG CENTRAL DEL SITIO  (config.js)
//  Todo lo que cambia entre un cliente y otro vive en este archivo.
//  Los datos que dicen "(ejemplo)" son de demostración: reemplázalos.
// =====================================================================

export const SITE = {
  nombre: 'Constructora Cordillera', // (ejemplo) nombre comercial
  nombreCorto: 'Cordillera',
  slogan: 'Construimos lo que tu proyecto necesita',
  // IMPORTANTE: dominio final, con https y sin "/" al final. Se usa para
  // canonical, sitemap, Open Graph y datos estructurados (JSON-LD).
  dominio: 'https://www.constructoracordillera.cl', // (ejemplo)
  idioma: 'es-CL',
  fundada: 2008, // (ejemplo)
  descripcion:
    'Constructora chilena de obras industriales, comerciales, habitacionales e institucionales. Construimos el proyecto que necesites, con un solo equipo responsable desde la planificación hasta la entrega.',
  colorTema: '#1C1C1A',
  // Imagen para compartir en WhatsApp/Facebook/LinkedIn (1200x630, PNG o JPG).
  // Reemplaza public/og-constructora.png por la tuya con el mismo nombre.
  ogImagen: '/og-constructora.png',
  logo: '/icon-512.png',
}

export const CONTACTO = {
  whatsapp: '56900000000', // (ejemplo) formato internacional sin +
  whatsappVisible: '+56 9 0000 0000',
  telefonos: [{ visible: '+56 2 2000 0000', tel: '+56220000000' }], // (ejemplo)
  email: 'contacto@constructoracordillera.cl', // (ejemplo)
  direccion: {
    calle: 'Av. Apoquindo 0000, Of. 000', // (ejemplo)
    comuna: 'Las Condes',
    ciudad: 'Santiago',
    region: 'Región Metropolitana',
    codigoPostal: '7550000',
    pais: 'CL',
  },
  geo: { lat: -33.4115, lng: -70.5776 }, // (ejemplo)
  horario: 'Lunes a viernes de 9:00 a 18:00 h',
  mapaConsulta: 'Av. Apoquindo, Las Condes, Santiago, Chile', // texto para el mapa de Google
}

export const REDES = {
  instagram: 'https://www.instagram.com/', // (ejemplo) deja '' para ocultar
  linkedin: 'https://www.linkedin.com/',
  facebook: '',
  youtube: '',
}

export const INTEGRACIONES = {
  // Google Analytics 4: pega tu ID real (G-XXXXXXXXXX). Si no lo cambias, no se carga.
  gaId: 'G-XXXXXXXXXX',
  // Formspree: pega el ID de tu formulario (lo que va después de /f/).
  formspreeId: 'TU_ID_FORMSPREE',
  // Search Console: código de verificación si lo haces por etiqueta HTML (opcional).
  googleSiteVerification: '',
}

export const MENU = [
  { to: '/', texto: 'Inicio' },
  { to: '/proyectos', texto: 'Proyectos' },
  { to: '/servicios', texto: 'Servicios' },
  { to: '/proceso-de-construccion', texto: 'Proceso' },
  { to: '/quienes-somos', texto: 'Nosotros' },
  { to: '/contacto', texto: 'Contacto' },
]

// Cifras de la franja bajo el hero (ejemplo)
export const CIFRAS = [
  { valor: '+15', etiqueta: 'Años de experiencia', detalle: 'Obras en todo Chile' },
  { valor: '+120', etiqueta: 'Obras ejecutadas', detalle: 'Industriales, comerciales y más' },
  { valor: '+850.000 m²', etiqueta: 'Superficie construida', detalle: 'Entregada a conformidad' },
  { valor: '0', etiqueta: 'Obras sin cierre formal', detalle: 'Recepción final en cada proyecto' },
]

export const ZONAS = {
  'Región Metropolitana': ['Santiago', 'Quilicura', 'Lampa', 'Las Condes', 'Colina', 'Pudahuel'],
  'Valparaíso y O’Higgins': ['Viña del Mar', 'Concón', 'Valparaíso', 'Rancagua'],
  'Biobío y Araucanía': ['Concepción', 'Talcahuano', 'Temuco'],
  'Norte': ['Antofagasta', 'Calama', 'La Serena'],
}

export const CERTIFICACIONES = [
  // (ejemplo) deja solo las que la empresa realmente tenga
  { sigla: 'ISO 9001', texto: 'Gestión de calidad' },
  { sigla: 'ISO 14001', texto: 'Gestión ambiental' },
  { sigla: 'ISO 45001', texto: 'Seguridad y salud ocupacional' },
]

export const CREDITO = { texto: 'Hecho por DaleClick.cl', url: 'https://daleclick.cl' }

// ---------- utilidades ----------
export const waLink = (mensaje = 'Hola, me gustaría cotizar una obra.') =>
  `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(mensaje)}`

export const direccionCompleta = () => {
  const d = CONTACTO.direccion
  return `${d.calle}, ${d.comuna}, ${d.ciudad}`
}
