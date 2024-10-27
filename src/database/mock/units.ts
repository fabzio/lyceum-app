import { UnitsInsertSchema } from '../schema/units'

export const facultiesMock: UnitsInsertSchema[] = [
  {
    name: 'Ciencias e Ingeniería',
    type: 'faculty',
  },
  {
    name: 'Letras y Ciencias Humanas',
    type: 'faculty',
  },
  {
    name: 'Ciencias Sociales',
    type: 'faculty',
  },
  {
    name: 'Derecho',
    type: 'faculty',
  },
  {
    name: 'Ciencias y Artes de la Comunicación',
    type: 'faculty',
  },
  {
    name: 'Psicología',
    type: 'faculty',
  },
  {
    name: 'Gestión y Alta Dirección',
    type: 'faculty',
  },
  {
    name: 'Gastronomía, Hotelería y Turismo',
    type: 'faculty',
  },
  {
    name: 'Derecho',
    type: 'faculty',
  },
  {
    name: 'Educación',
    type: 'faculty',
  },
  {
    name: 'Arquitectura y Urbanismo',
    type: 'faculty',
  },
  {
    name: 'Arte y Diseño',
    type: 'faculty',
  },
  {
    name: 'Artes Escénicas',
    type: 'faculty',
  },
  {
    name: 'Ciencias Contables',
    type: 'faculty',
  },
]

export const specialitiesMap: Record<string, string[]> = {
  'Ciencias e Ingeniería': [
    'Estadística',
    'Física',
    'Matemáticas',
    'Química',
    'Ingeniería Ambiental y Sostenible',
    'Ingeniería Biomédica',
    'Ingeniería Civil',
    'Ingeniería de las Telecomunicaciones',
    'Ingeniería de Minas',
    'Ingeniería Electrónica',
    'Ingeniería Geológica',
    'Ingeniería Industrial',
    'Ingeniería Informática',
    'Ingeniería Mecánica',
    'Ingeniería Mecatrónica',
    'Ingeniería Química',
  ],
  'Letras y Ciencias Humanas': [
    'Arqueología',
    'Ciencias de la Información',
    'Filosofía',
    'Geografía y Medio Ambiente',
    'Historia',
    'Humanidades',
    'Lingüística y Literatura',
  ],
  'Ciencias Sociales': [
    'Antropología',
    'Ciencia Política y Gobierno',
    'Economía',
    'Finanzas',
    'Relaciones Internacionales',
    'Sociología',
  ],
  Derecho: ['Derecho'],
  'Ciencias y Artes de la Comunicación': [
    'Comunicación Audiovisual',
    'Comunicación para el Desarrollo',
    'Periodismo',
    'Publicidad',
  ],

  Psicología: ['Psicología'],
  'Gestión y Alta Dirección': ['Gestión'],
  'Gastronomía, Hotelería y Turismo': ['Gastronomía', 'Hotelería', 'Turismo'],
  Educación: [
    'Educación Primaria',
    'Educación Secundaria',
    'Educación Inicial',
  ],
  'Arquitectura y Urbanismo': ['Arquitectura'],
  'Arte y Diseño': [
    'Educación Artística',
    'Diseño Gráfico',
    'Diseño Industrial',
    'Escultura',
    'Pintura',
    'Arte, Moda y Diseño Textil',
    'Grabado',
  ],
  'Artes Escénicas': [
    'Danza',
    'Teatro',
    'Música',
    'Creación y Producción Escénica',
  ],
  'Ciencias Contables': ['Contabilidad'],
}
export const areasMap: Record<string, string[]> = {
  'Ingeniería Informática': [
    'Ingeniería de Software',
    'Ciberseguridad',
    'Ciencia de la Computación',
  ],
}

export const departmentsMock = [
  'Arquitectura',
  'Arte y Diseño',
  'Artes Escénicas',
  'Ciencias',
  'Ciencias Administrativas',
  'Ciencias de la Gestión',
  'Ciencias Sociales',
  'Comunicaciones',
  'Derecho',
  'Economía',
  'Educación',
  'Humanidades',
  'Psicología',
  'Teología',
  'Informática, Electrónica y de las Telecomunicaciones',
]

;('')
const sectionsMap: Record<string, string[]> = {
  Ciencias: ['Física', 'Matemáticas', 'Química'],
  'Informática, Electrónica y de las Telecomunicaciones': [
    'Informática',
    'Electrónica',
    'Telecomunicaciones',
  ],
}
