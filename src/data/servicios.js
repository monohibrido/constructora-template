// SERVICIOS (ejemplo). Cada servicio tiene su propia URL: /servicios/<slug>
// El slug es descriptivo a propósito: Google lo lee como parte del contenido.
import { image } from './images.js'

const img = (slug, parte, alt, w = 1600, h = 1000, lugar = '') =>
  image(`servicios/${slug}/${parte}-${slug}`, w, h, alt, lugar)

const mk = (s) => ({
  ...s,
  imagen: img(s.slug, 'portada', `${s.titulo}`, 1600, 1000, `Servicio · ${s.nombre} · tarjeta y portada`),
  galeria: s.galeria.map(([parte, alt]) =>
    img(s.slug, parte, alt, 1600, 1067, `Servicio · ${s.nombre} · galería`)
  ),
})

export const SERVICIOS = [
  mk({
    slug: 'construccion-de-obras-industriales-y-bodegas',
    nombre: 'Obras industriales y bodegas',
    titulo: 'Construcción de obras industriales, bodegas y centros logísticos',
    resumen:
      'Galpones, centros de distribución, plantas de proceso y bodegas con estructura metálica u hormigón, entregados en plazo y listos para operar.',
    descripcion: [
      'Construimos instalaciones industriales pensadas para operar desde el primer día: radieres de alta exigencia, estructuras metálicas y de hormigón, cubiertas, muelles de carga y redes de servicios coordinadas con el proceso productivo de cada cliente.',
      'Trabajamos con ingeniería y planificación propias, lo que nos permite anticipar interferencias, ordenar las compras críticas y cuidar el cronograma, que en una obra industrial es tan importante como el presupuesto.',
    ],
    incluye: [
      'Movimiento de tierras, fundaciones y radieres industriales',
      'Estructuras metálicas y de hormigón armado o prefabricado',
      'Cubiertas, revestimientos y aislación térmica',
      'Muelles de carga, pavimentos y obras exteriores',
      'Instalaciones eléctricas, sanitarias, climatización y protección contra incendios',
    ],
    ejemplos: ['Centros de distribución', 'Galpones y bodegas', 'Plantas agroindustriales', 'Bodegas refrigeradas'],
    preguntas: [
      {
        q: '¿Cuánto demora construir una bodega industrial?',
        a: 'Depende de la superficie, el tipo de estructura y el terreno. Como referencia, una bodega mediana puede ejecutarse en pocos meses una vez aprobados los permisos. Te entregamos un cronograma por etapas junto con la propuesta.',
      },
      {
        q: '¿Pueden construir sobre un terreno que aún no está nivelado?',
        a: 'Sí. Incluimos movimiento de tierras y mejoramiento de suelos dentro del alcance cuando el proyecto lo requiere, previa revisión del estudio de mecánica de suelos.',
      },
    ],
    galeria: [
      ['estructura-metalica-de-galpon-industrial', 'Estructura metálica de un galpón industrial en construcción'],
      ['radier-industrial-en-bodega-de-distribucion', 'Radier industrial terminado dentro de una bodega de distribución'],
    ],
  }),
  mk({
    slug: 'construccion-de-edificios-comerciales-y-oficinas',
    nombre: 'Edificios comerciales y oficinas',
    titulo: 'Construcción de edificios comerciales, oficinas y centros comerciales',
    resumen:
      'Edificios corporativos, strip centers, locales y espacios de retail construidos con foco en funcionalidad, imagen de marca y fecha de apertura.',
    descripcion: [
      'Ejecutamos edificios de oficinas, centros comerciales y locales a medida, coordinando arquitectura, especialidades y habilitación para que el espacio abra en la fecha comprometida.',
      'Entendemos que en un proyecto comercial cada semana de atraso tiene costo. Por eso planificamos hitos de entrega, controlamos las terminaciones y mantenemos informado al mandante durante toda la obra.',
    ],
    incluye: [
      'Obra gruesa en hormigón armado y estructuras mixtas',
      'Fachadas, muros cortina y revestimientos',
      'Terminaciones interiores de alto estándar',
      'Climatización, ascensores, redes eléctricas y de datos',
      'Habilitación de locales y espacios corporativos',
    ],
    ejemplos: ['Edificios corporativos', 'Strip centers', 'Locales comerciales', 'Habilitación de oficinas'],
    preguntas: [
      {
        q: '¿Pueden construir y habilitar un local comercial al mismo tiempo?',
        a: 'Sí. Podemos ejecutar la obra gruesa, las instalaciones y la habilitación interior bajo un mismo contrato, lo que reduce coordinaciones y plazos.',
      },
      {
        q: '¿Trabajan con proyectos de arquitectura de terceros?',
        a: 'Sí. Construimos a partir de proyectos de arquitectura e ingeniería de tu equipo o de otro estudio, y también podemos coordinar esas especialidades si lo necesitas.',
      },
    ],
    galeria: [
      ['fachada-de-edificio-de-oficinas-corporativas', 'Fachada vidriada de un edificio de oficinas corporativas'],
      ['hall-de-acceso-de-centro-comercial', 'Hall de acceso de un centro comercial terminado'],
    ],
  }),
  mk({
    slug: 'construccion-de-edificios-habitacionales-y-condominios',
    nombre: 'Edificios habitacionales y condominios',
    titulo: 'Construcción de edificios habitacionales, condominios y viviendas',
    resumen:
      'Edificios de departamentos, condominios y conjuntos de viviendas ejecutados con control de calidad por partida y recepción final a conformidad.',
    descripcion: [
      'Construimos proyectos habitacionales para desarrolladores, cooperativas y mandantes particulares, desde conjuntos de casas hasta edificios en altura, cumpliendo la normativa vigente y los estándares de terminación acordados.',
      'Cada partida se controla con protocolos de calidad y se documenta, de modo que la recepción final y la postventa se resuelvan con información clara y sin sorpresas.',
    ],
    incluye: [
      'Obra gruesa en hormigón armado y albañilería',
      'Terminaciones interiores y áreas comunes',
      'Instalaciones sanitarias, eléctricas, gas y calefacción',
      'Urbanización interior y áreas verdes',
      'Gestión de recepción final y postventa',
    ],
    ejemplos: ['Edificios de departamentos', 'Condominios de casas', 'Conjuntos habitacionales', 'Viviendas a medida'],
    preguntas: [
      {
        q: '¿Construyen para inmobiliarias o también para particulares?',
        a: 'Construimos para ambos. Somos una constructora: ejecutamos la obra que el mandante nos encarga, sin vender unidades propias.',
      },
      {
        q: '¿Incluyen la gestión de la recepción final?',
        a: 'Sí. Acompañamos los trámites de recepción y entregamos la documentación técnica de la obra al cierre del proyecto.',
      },
    ],
    galeria: [
      ['edificio-de-departamentos-en-obra-gruesa', 'Edificio de departamentos en etapa de obra gruesa'],
      ['condominio-de-viviendas-terminado', 'Condominio de viviendas terminado con áreas verdes'],
    ],
  }),
  mk({
    slug: 'construccion-de-edificios-institucionales-colegios-y-salud',
    nombre: 'Edificios institucionales, colegios y salud',
    titulo: 'Construcción de colegios, clínicas y edificios institucionales',
    resumen:
      'Colegios, centros médicos, edificios públicos y recintos deportivos construidos bajo normativa específica y con estrictos plazos de entrega.',
    descripcion: [
      'Los proyectos institucionales exigen cumplir normativas particulares, trabajar con calendarios muy definidos y, muchas veces, intervenir recintos en funcionamiento. Tenemos experiencia planificando esas condiciones.',
      'Construimos colegios, centros de salud y edificios de servicio con estándares de accesibilidad, seguridad y durabilidad pensados para un uso intensivo durante décadas.',
    ],
    incluye: [
      'Construcción de colegios, jardines infantiles y recintos educacionales',
      'Clínicas, centros médicos y edificios de salud',
      'Edificios públicos y recintos deportivos',
      'Cumplimiento de normativa de accesibilidad y seguridad',
      'Obras por etapas en recintos en funcionamiento',
    ],
    ejemplos: ['Colegios', 'Clínicas y centros médicos', 'Edificios públicos', 'Gimnasios y recintos deportivos'],
    preguntas: [
      {
        q: '¿Pueden trabajar en un recinto que sigue funcionando?',
        a: 'Sí. Planificamos la obra por etapas, con accesos y cierres independientes, para minimizar el impacto sobre la operación diaria.',
      },
      {
        q: '¿Participan en licitaciones?',
        a: 'Sí. Preparamos ofertas técnicas y económicas para licitaciones públicas y privadas. Escríbenos con las bases y las revisamos.',
      },
    ],
    galeria: [
      ['colegio-en-construccion-etapa-estructural', 'Colegio en construcción durante la etapa estructural'],
      ['centro-medico-terminado-fachada-principal', 'Fachada principal de un centro médico terminado'],
    ],
  }),
  mk({
    slug: 'obras-civiles-urbanizacion-y-movimiento-de-tierras',
    nombre: 'Obras civiles y urbanización',
    titulo: 'Obras civiles, urbanización y movimiento de tierras',
    resumen:
      'Movimiento de tierras, pavimentación, redes húmedas y urbanización de loteos y parques industriales con maquinaria y equipos propios.',
    descripcion: [
      'Ejecutamos las obras que dan soporte a un proyecto: nivelación de terrenos, vialidad, redes de agua potable, alcantarillado y aguas lluvias, además de urbanización completa de loteos y parques industriales.',
      'Contar con maquinaria y equipos propios nos da control sobre los tiempos y los costos de las partidas que más condicionan el cronograma general.',
    ],
    incluye: [
      'Excavaciones, rellenos y nivelación de terrenos',
      'Pavimentos de hormigón y asfalto',
      'Redes de agua potable, alcantarillado y aguas lluvias',
      'Obras de contención y drenaje',
      'Urbanización de loteos y parques industriales',
    ],
    ejemplos: ['Loteos', 'Parques industriales', 'Vialidad interior', 'Redes húmedas'],
    preguntas: [
      {
        q: '¿Hacen solo el movimiento de tierras o la obra completa?',
        a: 'Ambas cosas. Podemos tomar una partida específica o encargarnos de la obra completa bajo un solo contrato.',
      },
      {
        q: '¿Cuentan con maquinaria propia?',
        a: 'Sí, contamos con equipos propios y subcontratos de confianza para cubrir los picos de trabajo, sin comprometer el plazo.',
      },
    ],
    galeria: [
      ['movimiento-de-tierras-con-maquinaria-pesada', 'Maquinaria pesada realizando movimiento de tierras en una obra'],
      ['urbanizacion-de-parque-industrial-pavimentos', 'Pavimentos y vialidad de un parque industrial recién urbanizado'],
    ],
  }),
  mk({
    slug: 'remodelaciones-ampliaciones-y-obras-de-mejoramiento',
    nombre: 'Remodelaciones y ampliaciones',
    titulo: 'Remodelaciones, ampliaciones y obras de mejoramiento',
    resumen:
      'Ampliaciones de plantas, remodelaciones de edificios y obras de mejoramiento ejecutadas sin detener la operación del cliente.',
    descripcion: [
      'Intervenir una construcción existente exige más planificación que una obra nueva: hay que levantar lo que ya existe, proteger lo que sigue operando y coordinar los trabajos para que el impacto sea mínimo.',
      'Realizamos ampliaciones de plantas y bodegas, remodelaciones de oficinas y edificios, y mejoras de infraestructura con un plan de trabajo adaptado a la operación de cada cliente.',
    ],
    incluye: [
      'Levantamiento y diagnóstico de la construcción existente',
      'Ampliaciones de plantas, bodegas y edificios',
      'Remodelaciones interiores y de fachadas',
      'Refuerzos estructurales',
      'Trabajos nocturnos o por etapas para no detener la operación',
    ],
    ejemplos: ['Ampliación de plantas', 'Remodelación de oficinas', 'Refuerzo estructural', 'Cambios de fachada'],
    preguntas: [
      {
        q: '¿Pueden trabajar fuera del horario de operación?',
        a: 'Sí. Podemos programar trabajos nocturnos, en fines de semana o por sectores, según lo que necesite tu operación.',
      },
      {
        q: '¿Hacen un diagnóstico antes de cotizar?',
        a: 'Sí. Una visita a terreno y un levantamiento inicial nos permiten entregar una propuesta realista con alcance y plazos claros.',
      },
    ],
    galeria: [
      ['ampliacion-de-planta-industrial-en-operacion', 'Ampliación de una planta industrial mientras sigue en operación'],
      ['remodelacion-interior-de-oficinas-corporativas', 'Remodelación interior de oficinas corporativas terminada'],
    ],
  }),
]

export const getServicio = (slug) => SERVICIOS.find((s) => s.slug === slug)
