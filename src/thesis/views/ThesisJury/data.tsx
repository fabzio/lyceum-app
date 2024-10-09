export type Mail = (typeof mails)[number]
export interface Thesis {
  id: string
  title: string
  area: string
  students: { code: string; name: string }[]
  advisors: { code: string; name: string; isPrincipal: boolean }[]
  status: 'approved' | 'pending'
  fileInfo: {
    requestNumber: string
    name: string
    concentration: string
  } | undefined
}

export interface ThesisJuryRequest {
  id: string
  thesis: Thesis
  jury: { code: string; name: string }[]
  status: 'approved' | 'pending'
  approvalHistory: {
    step: string
    status: 'completed' | 'current' | 'pending'
    name: string
    canDownload?: boolean
  }[]
}

export const mails: ThesisJuryRequest[] = [
  {
    id: '39457392',
    thesis: {
      id: '39457392',
      title:
        'Desarrollo de un Sistema de Gestión de Proyectos Basado en Metodologías Ágiles para Mejorar la Productividad en Equipos de Trabajo Remotos',
      area: 'Sistemas de Información',
      students: [
        { code: '00089434', name: 'Rony Tupia' },
        { code: '19872992', name: 'Víctor Bello' },
      ],
      advisors: [
        { code: '00089434', name: 'Rony Tupia', isPrincipal: true },
        { code: '19872992', name: 'Víctor Bello', isPrincipal: false },
      ],
      status: 'approved',
      fileInfo: {
        requestNumber: '39457392',
        name: 'Piero Montoya',
        concentration: 'Ingeniería de Software',
      },
    },
    status: 'pending',
    jury: [
      { code: '00089434', name: 'Rony Tupia' },
      { code: '19872992', name: 'Víctor Bello' },
    ],
    approvalHistory: [
      {
        step: 'Enviado por alumno',
        status: 'completed',
        name: 'Piero Montoya',
      },
      {
        step: 'Aprobado por Asesor',
        status: 'completed',
        name: 'Rony Tupia',
        canDownload: true,
      },
      {
        step: 'Aprobado por Coordinador de Área',
        status: 'completed',
        name: 'Jheyfer Ramírez',
        canDownload: true,
      },
      {
        step: 'Aprobado por Director de Carrera',
        status: 'current',
        name: 'Ricardo Bartra',
      },
    ],
  },
  {
    id: '39457x92',
    thesis: {
      id: '39457392',
      title:
        'Desarrollo de un Sistema de Gestión de Proyectos Basado en Metodologías Ágiles para Mejorar la Productividad en Equipos de Trabajo Remotos',
      area: 'Sistemas de Información',
      students: [
        { code: '00089434', name: 'Rony Tupia' },
        { code: '19872992', name: 'Víctor Bello' },
      ],
      advisors: [
        { code: '00089434', name: 'Rony Tupia', isPrincipal: true },
        { code: '19872992', name: 'Víctor Bello', isPrincipal: false },
      ],
      status: 'approved',
      fileInfo: {
        requestNumber: '39457392',
        name: 'Piero Montoya',
        concentration: 'Ingeniería de Software',
      },
    },
    status: 'pending',
    jury: [
      { code: '00089434', name: 'Rony Tupia' },
      { code: '19872992', name: 'Víctor Bello' },
    ],
    approvalHistory: [
      {
        step: 'Enviado por alumno',
        status: 'completed',
        name: 'Piero Montoya',
      },
      {
        step: 'Aprobado por Asesor',
        status: 'completed',
        name: 'Rony Tupia',
        canDownload: true,
      },
      {
        step: 'Aprobado por Coordinador de Área',
        status: 'completed',
        name: 'Jheyfer Ramírez',
        canDownload: true,
      },
      {
        step: 'Aprobado por Director de Carrera',
        status: 'current',
        name: 'Ricardo Bartra',
      },
    ],
  },
]
