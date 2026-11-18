// PROYECTOS (ejemplo). Cada proyecto tiene su propia URL: /proyectos/<slug>
// Reemplaza estos datos por las obras reales de la constructora.
import { image } from './images.js'

const PARTES = [
  ['vista-general', 'Vista general'],
  ['fachada-exterior', 'Fachada exterior'],
  ['estructura-en-obra', 'Estructura durante la construcción'],
  ['interior-y-terminaciones', 'Interior y terminaciones'],
]

const mk = (p) => {
  const imagenes = PARTES.map(([parte, texto], i) =>
    image(
      `proyectos/${p.slug}/${parte}-${p.slug}`,
      1600,
      i === 0 ? 1000 : 1067,
      `${texto} de ${p.nombre} en ${p.comuna}`,
      `Proyecto · ${p.nombre} · ${i === 0 ? 'portada (tarjeta y encabezado)' : 'galería'}`
    )
  )
  return { ...p, imagen: imagenes[0], galeria: imagenes.slice(1), imagenes }
}

export const TIPOS_PROYECTO = ['Industrial', 'Comercial', 'Habitacional', 'Institucional', 'Infraestructura']

export const PROYECTOS = [
  mk({
    slug: 'centro-de-distribucion-logistico-quilicura',
    nombre: 'Centro de distribución logístico Quilicura',
    tipo: 'Industrial',
    comuna: 'Quilicura',
    region: 'Región Metropolitana',
    superficie: '42.000 m²',
    estado: 'Obra entregada',
    anio: '2025',
    plazo: '14 meses',
    mandante: 'Operador logístico (ejemplo)',
    servicio: 'construccion-de-obras-industriales-y-bodegas',
    resumen: 'Bodega logística de gran escala con muelles de carga, oficinas y patio de maniobras.',
    descripcion: [
      'Construcción llave en mano de un centro de distribución con estructura metálica, radier industrial de alta exigencia y 28 andenes de carga.',
      'La obra se ejecutó por etapas para que el mandante pudiera comenzar a operar el primer módulo mientras se terminaba el resto del recinto.',
    ],
    alcance: [
      'Movimiento de tierras y mejoramiento de suelos',
      'Estructura metálica y cubierta',
      'Radier industrial y pavimentos exteriores',
      'Oficinas administrativas y áreas de servicio',
      'Instalaciones y protección contra incendios',
    ],
  }),
  mk({
    slug: 'edificio-de-oficinas-corporativas-las-condes',
    nombre: 'Edificio de oficinas corporativas Las Condes',
    tipo: 'Comercial',
    comuna: 'Las Condes',
    region: 'Región Metropolitana',
    superficie: '18.500 m²',
    estado: 'Obra entregada',
    anio: '2024',
    plazo: '22 meses',
    mandante: 'Empresa de inversiones (ejemplo)',
    servicio: 'construccion-de-edificios-comerciales-y-oficinas',
    resumen: 'Edificio corporativo de 12 pisos con fachada vidriada y estacionamientos subterráneos.',
    descripcion: [
      'Edificio de oficinas de 12 pisos y tres subterráneos, construido en hormigón armado con fachada de muro cortina y terminaciones de alto estándar.',
      'Se coordinaron más de quince especialidades para entregar plantas libres listas para ser habilitadas por los arrendatarios.',
    ],
    alcance: [
      'Excavación, entibaciones y subterráneos',
      'Obra gruesa en hormigón armado',
      'Fachada de muro cortina',
      'Ascensores, climatización y redes de datos',
      'Terminaciones de hall y áreas comunes',
    ],
  }),
  mk({
    slug: 'condominio-de-departamentos-vina-del-mar',
    nombre: 'Condominio de departamentos Viña del Mar',
    tipo: 'Habitacional',
    comuna: 'Viña del Mar',
    region: 'Valparaíso',
    superficie: '24.000 m²',
    estado: 'En construcción',
    anio: '2026',
    plazo: '26 meses',
    mandante: 'Desarrollador inmobiliario (ejemplo)',
    servicio: 'construccion-de-edificios-habitacionales-y-condominios',
    resumen: 'Tres torres de departamentos con áreas verdes, piscina y estacionamientos.',
    descripcion: [
      'Conjunto de tres torres habitacionales en hormigón armado, con áreas comunes, piscina y urbanización interior, ejecutado en terreno con pendiente.',
      'La obra avanza con control de calidad por partida y entregas parciales programadas por torre.',
    ],
    alcance: [
      'Obra gruesa de tres torres',
      'Terminaciones interiores de departamentos',
      'Áreas comunes, piscina y paisajismo',
      'Urbanización y estacionamientos',
      'Entregas parciales por torre',
    ],
  }),
  mk({
    slug: 'planta-de-procesamiento-agroindustrial-rancagua',
    nombre: 'Planta de procesamiento agroindustrial Rancagua',
    tipo: 'Industrial',
    comuna: 'Rancagua',
    region: 'O’Higgins',
    superficie: '12.800 m²',
    estado: 'Obra entregada',
    anio: '2024',
    plazo: '11 meses',
    mandante: 'Empresa agroindustrial (ejemplo)',
    servicio: 'construccion-de-obras-industriales-y-bodegas',
    resumen: 'Planta de proceso con cámaras de frío, sala de máquinas y tratamiento de residuos.',
    descripcion: [
      'Planta con exigencias sanitarias específicas: pavimentos continuos, muros lavables, cámaras de frío y redes de proceso coordinadas con el proveedor de equipos.',
      'La construcción se programó para estar lista antes de la temporada alta del cliente.',
    ],
    alcance: [
      'Edificio principal de proceso',
      'Cámaras de frío y sala de máquinas',
      'Pavimentos sanitarios y redes de proceso',
      'Planta de tratamiento de riles',
      'Obras exteriores y accesos',
    ],
  }),
  mk({
    slug: 'colegio-y-centro-educacional-concepcion',
    nombre: 'Colegio y centro educacional Concepción',
    tipo: 'Institucional',
    comuna: 'Concepción',
    region: 'Biobío',
    superficie: '9.600 m²',
    estado: 'Obra entregada',
    anio: '2023',
    plazo: '13 meses',
    mandante: 'Sostenedor educacional (ejemplo)',
    servicio: 'construccion-de-edificios-institucionales-colegios-y-salud',
    resumen: 'Colegio con 32 salas, gimnasio, biblioteca y patios, construido con diseño sísmico.',
    descripcion: [
      'Establecimiento educacional completo con salas, laboratorios, gimnasio techado y biblioteca, construido para estar listo antes del inicio del año escolar.',
      'Se priorizó la durabilidad de los materiales y la accesibilidad universal en todos los recorridos.',
    ],
    alcance: [
      'Edificio de aulas y laboratorios',
      'Gimnasio techado y multicancha',
      'Biblioteca y áreas administrativas',
      'Accesibilidad universal',
      'Paisajismo y obras exteriores',
    ],
  }),
  mk({
    slug: 'centro-comercial-y-strip-center-antofagasta',
    nombre: 'Centro comercial y strip center Antofagasta',
    tipo: 'Comercial',
    comuna: 'Antofagasta',
    region: 'Antofagasta',
    superficie: '15.200 m²',
    estado: 'Obra entregada',
    anio: '2025',
    plazo: '12 meses',
    mandante: 'Administradora de centros comerciales (ejemplo)',
    servicio: 'construccion-de-edificios-comerciales-y-oficinas',
    resumen: 'Strip center con locales ancla, patio de comidas y estacionamientos para 600 vehículos.',
    descripcion: [
      'Centro comercial de un nivel con locales ancla, galería, patio de comidas y amplio estacionamiento, diseñado para las condiciones climáticas del norte.',
      'Se entregaron los locales por etapas para que los arrendatarios iniciaran su habilitación mientras terminaba el resto del recinto.',
    ],
    alcance: [
      'Estructura y cubiertas de gran luz',
      'Locales ancla y galería comercial',
      'Patio de comidas',
      'Estacionamientos y pavimentos',
      'Entregas por etapas a arrendatarios',
    ],
  }),
  mk({
    slug: 'clinica-y-centro-medico-temuco',
    nombre: 'Clínica y centro médico Temuco',
    tipo: 'Institucional',
    comuna: 'Temuco',
    region: 'La Araucanía',
    superficie: '11.000 m²',
    estado: 'En construcción',
    anio: '2026',
    plazo: '20 meses',
    mandante: 'Prestador de salud (ejemplo)',
    servicio: 'construccion-de-edificios-institucionales-colegios-y-salud',
    resumen: 'Clínica de cinco niveles con pabellones, urgencia y centro de diagnóstico.',
    descripcion: [
      'Edificio de salud con pabellones quirúrgicos, unidad de urgencia, hospitalización y centro de diagnóstico, bajo normativa sanitaria específica.',
      'La coordinación de instalaciones especiales (gases clínicos, climatización y electricidad de respaldo) es parte central del plan de obra.',
    ],
    alcance: [
      'Obra gruesa de cinco niveles',
      'Pabellones y unidad de urgencia',
      'Gases clínicos y climatización especial',
      'Generación eléctrica de respaldo',
      'Terminaciones sanitarias',
    ],
  }),
  mk({
    slug: 'urbanizacion-y-obras-viales-parque-industrial-lampa',
    nombre: 'Urbanización y obras viales Parque Industrial Lampa',
    tipo: 'Infraestructura',
    comuna: 'Lampa',
    region: 'Región Metropolitana',
    superficie: '60 hectáreas urbanizadas',
    estado: 'Obra entregada',
    anio: '2023',
    plazo: '10 meses',
    mandante: 'Desarrollador de parques industriales (ejemplo)',
    servicio: 'obras-civiles-urbanizacion-y-movimiento-de-tierras',
    resumen: 'Urbanización completa de un parque industrial con vialidad, redes húmedas y paisajismo.',
    descripcion: [
      'Urbanización de 60 hectáreas con calles de hormigón, redes de agua potable, alcantarillado, aguas lluvias y obras de drenaje.',
      'La entrega se organizó por sectores para que los primeros lotes pudieran venderse y construirse sin esperar el cierre total de la obra.',
    ],
    alcance: [
      'Movimiento de tierras masivo',
      'Calles y pavimentos de hormigón',
      'Redes de agua, alcantarillado y aguas lluvias',
      'Obras de drenaje y contención',
      'Paisajismo y señalética',
    ],
  }),
]

export const getProyecto = (slug) => PROYECTOS.find((p) => p.slug === slug)
