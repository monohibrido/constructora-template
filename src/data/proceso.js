// PROCESO DE CONSTRUCCIÓN y contenido de "Quiénes somos" (ejemplo)
import { image } from './images.js'

export const PASOS = [
  {
    n: '01',
    titulo: 'Estudio del proyecto',
    corto: 'Revisamos tu proyecto, el terreno y las bases para entender el alcance real de la obra.',
    largo:
      'Analizamos planos, especificaciones, estudio de suelos y condiciones del terreno. Identificamos riesgos, interferencias y oportunidades de optimización antes de comprometer un precio.',
    imagen: image(
      'proceso/estudio-del-proyecto-revision-de-planos-en-terreno',
      1400,
      1000,
      'Equipo de ingeniería revisando planos de un proyecto en terreno',
      'Proceso · paso 1'
    ),
  },
  {
    n: '02',
    titulo: 'Presupuesto y planificación',
    corto: 'Preparamos un presupuesto por partidas y un cronograma con hitos claros.',
    largo:
      'Elaboramos el presupuesto detallado, la programación de obra y el plan de compras críticas. Entregamos una propuesta transparente, con supuestos explícitos.',
    imagen: image(
      'proceso/presupuesto-y-planificacion-de-obra-carta-gantt',
      1400,
      1000,
      'Mesa de trabajo con presupuesto y carta Gantt de una obra de construcción',
      'Proceso · paso 2'
    ),
  },
  {
    n: '03',
    titulo: 'Ejecución de la obra',
    corto: 'Construimos con equipos propios, prevención de riesgos y seguimiento semanal.',
    largo:
      'Instalamos faenas, ejecutamos las partidas y coordinamos subcontratos y especialidades. El mandante recibe informes de avance periódicos con fotografías, costos y plazos.',
    imagen: image(
      'proceso/ejecucion-de-obra-con-prevencion-de-riesgos',
      1400,
      1000,
      'Trabajadores con equipo de protección ejecutando una obra de construcción',
      'Proceso · paso 3'
    ),
  },
  {
    n: '04',
    titulo: 'Control de calidad y entrega',
    corto: 'Revisamos cada partida, gestionamos la recepción final y entregamos la documentación.',
    largo:
      'Realizamos protocolos de calidad, observaciones y correcciones. Gestionamos la recepción final y entregamos planos as-built, manuales y garantías. Después de la entrega seguimos disponibles para postventa.',
    imagen: image(
      'proceso/control-de-calidad-y-entrega-de-obra-terminada',
      1400,
      1000,
      'Inspección de calidad y entrega de una obra terminada al mandante',
      'Proceso · paso 4'
    ),
  },
]

export const PILARES = [
  {
    n: '01',
    titulo: 'Seguridad primero',
    texto: 'Prevención de riesgos en cada faena, con capacitación, supervisión permanente y reportes de seguridad.',
  },
  {
    n: '02',
    titulo: 'Calidad documentada',
    texto: 'Protocolos de control por partida y registros que respaldan cada etapa de la obra.',
  },
  {
    n: '03',
    titulo: 'Plazos que se cumplen',
    texto: 'Cronogramas realistas, seguimiento semanal y alertas tempranas cuando algo puede desviarse.',
  },
  {
    n: '04',
    titulo: 'Un solo responsable',
    texto: 'Un equipo a cargo de toda la obra, con un interlocutor claro para el mandante.',
  },
]

export const PRINCIPIOS = [
  {
    n: '01',
    titulo: 'Ingeniería y planificación',
    texto:
      'Cada obra comienza con un estudio técnico serio. Anticipar problemas en el escritorio cuesta mucho menos que resolverlos en terreno.',
  },
  {
    n: '02',
    titulo: 'Seguridad y cuidado de las personas',
    texto:
      'Una obra bien ejecutada es una obra donde todos vuelven a casa. La seguridad es una condición de trabajo, no un costo.',
  },
  {
    n: '03',
    titulo: 'Cumplimiento y transparencia',
    texto:
      'Presupuestos claros, plazos honestos y comunicación directa con el mandante en todas las etapas del proyecto.',
  },
]

export const VALORES = [
  { n: '01', titulo: 'Responsabilidad', texto: 'Respondemos por lo que construimos, antes, durante y después de la entrega.' },
  { n: '02', titulo: 'Precisión', texto: 'Medidas, costos y plazos se controlan con la misma exactitud que un plano.' },
  { n: '03', titulo: 'Seguridad', texto: 'Ninguna obra justifica poner en riesgo a una persona.' },
  { n: '04', titulo: 'Transparencia', texto: 'El mandante sabe qué pasa en su obra en todo momento.' },
  { n: '05', titulo: 'Compromiso', texto: 'Tratamos cada proyecto como propio, sin importar su tamaño.' },
  { n: '06', titulo: 'Permanencia', texto: 'Construimos para durar, con materiales y criterios pensados a largo plazo.' },
]

export const MISION =
  'Construir con calidad, seguridad y cumplimiento las obras que nuestros clientes necesitan, con un solo equipo responsable desde el estudio del proyecto hasta la entrega final.'

export const VISION =
  'Ser la constructora de referencia en obras de mediana y gran escala en Chile, reconocida por la solidez de su gestión, la seguridad de sus faenas y la calidad de sus obras.'
