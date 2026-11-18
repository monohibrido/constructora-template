// IMÁGENES DE PÁGINAS (portadas, secciones del inicio, "Quiénes somos"...)
// Los nombres de archivo son descriptivos a propósito: Google también lee el nombre
// de la imagen. Al reemplazar por tu .webp, mantén el mismo nombre.
import { image } from './images.js'

export const HERO = image(
  'inicio/constructora-obras-industriales-y-edificios-en-chile-portada',
  1920,
  1080,
  'Obra de construcción de un edificio y una bodega industrial al atardecer en Chile',
  'Inicio · hero a pantalla completa'
)

export const INICIO_POR_QUE = image(
  'inicio/equipo-de-ingenieria-y-construccion-coordinando-una-obra',
  1400,
  1000,
  'Equipo de ingeniería y construcción coordinando una obra con planos en terreno',
  'Inicio · sección "Por qué elegirnos"'
)

export const INICIO_OBRAS = [
  image(
    'inicio/obra-gruesa-de-hormigon-armado-en-edificio',
    1200,
    1500,
    'Obra gruesa de hormigón armado de un edificio en construcción',
    'Inicio · galería "Obras en ejecución" (vertical)'
  ),
  image(
    'inicio/montaje-de-estructura-metalica-en-obra-industrial',
    1600,
    1067,
    'Montaje de estructura metálica en una obra industrial con grúa',
    'Inicio · galería "Obras en ejecución"'
  ),
  image(
    'inicio/terminaciones-interiores-de-edificio-comercial',
    1600,
    1067,
    'Terminaciones interiores de un edificio comercial casi listo para entrega',
    'Inicio · galería "Obras en ejecución"'
  ),
]

export const INICIO_DETALLE = [
  image('inicio/detalle-de-hormigon-armado-y-moldajes', 1200, 900, 'Detalle de armaduras de acero y moldajes antes de hormigonar', 'Inicio · detalle constructivo 1'),
  image('inicio/detalle-de-soldadura-en-estructura-metalica', 1200, 900, 'Soldadura de una unión en una estructura metálica', 'Inicio · detalle constructivo 2'),
  image('inicio/prevencion-de-riesgos-y-seguridad-en-faena', 1200, 900, 'Trabajadores con casco y arnés cumpliendo medidas de seguridad en faena', 'Inicio · detalle constructivo 3'),
  image('inicio/instalaciones-electricas-y-sanitarias-en-edificio', 1200, 900, 'Instalaciones eléctricas y sanitarias en un cielo de edificio en construcción', 'Inicio · detalle constructivo 4'),
  image('inicio/terminaciones-y-fachada-de-edificio-corporativo', 1200, 900, 'Fachada y terminaciones de un edificio corporativo terminado', 'Inicio · detalle constructivo 5'),
]

export const PROYECTOS_PORTADA = image(
  'portadas/proyectos-de-construccion-industrial-comercial-y-habitacional',
  1920,
  900,
  'Panorama de obras construidas: edificios, bodegas y urbanizaciones',
  'Página Proyectos · fondo del encabezado'
)

export const SERVICIOS_PORTADA = image(
  'portadas/servicios-de-construccion-para-empresas-e-inversionistas',
  1920,
  900,
  'Equipo de construcción trabajando en una obra de gran escala',
  'Página Servicios · fondo del encabezado'
)

export const PROCESO_PORTADA = image(
  'portadas/proceso-de-construccion-de-obras-paso-a-paso',
  1920,
  900,
  'Etapas de una obra de construcción desde el plano hasta la entrega',
  'Página Proceso · fondo del encabezado'
)

export const NOSOTROS_PORTADA = image(
  'nosotros/empresa-constructora-chilena-equipo-en-terreno',
  1920,
  900,
  'Equipo de la empresa constructora reunido frente a una obra en Chile',
  'Página Quiénes somos · fondo del encabezado'
)

export const NOSOTROS_EQUIPO = image(
  'nosotros/equipo-directivo-y-profesionales-de-la-constructora',
  1400,
  1000,
  'Equipo directivo y profesionales de la constructora en su oficina',
  'Quiénes somos · identidad de la empresa'
)

export const CONTACTO_PORTADA = image(
  'portadas/contacto-y-cotizacion-de-obras-de-construccion',
  1920,
  900,
  'Edificio terminado visto desde abajo, con cielo despejado',
  'Página Contacto · fondo del encabezado'
)
