export const mails1 = [
  {
    id: '6c84fba0-12c4-11e1-840d-7b25c5ee775a',
    name: 'Estudio del agua de las localidades amazonicas afectadas por la minería ilegal',
    email: 'williamsmith@example.com',
    subject: 'N° 97345298',
    text: " Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, William",
    date: '2023-10-22T09:00:00',
    read: true,
    labels: ['Esperando propuesta de jurados'],
  },
  {
    id: '110e840b-e29b-11d4-a716-446655440000',
    name: 'Algoritmo de busqueda de rutas optimas para el transporte publico',
    email: 'alicesmith@example.com',
    subject: 'N° 97345298',
    text: "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in.\n\nI have a few minor suggestions that I'll include in the attached document.\n\nLet's discuss these during our next meeting. Keep up the excellent work!\n\nBest regards, Alice",
    date: '2023-10-22T10:30:00',
    read: true,
    labels: ['Esperando confirmacion de jurados'],
  },
  {
    id: '3e7c3f6d-bdfc-46ae-8d90-171300f27ae2',
    name: 'Implicaciones de la funcion de onda en la teoria cuantica',
    email: 'bobjohnson@example.com',
    subject: 'N° 97345298',
    text: "Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun.\n\nIf you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature.\n\nLooking forward to your response!\n\nBest, Bob",
    date: '2023-04-10T11:45:00',
    read: true,
    labels: ['Esperando confirmacion de jurados'],
  },
  {
    id: '61c35085-72d7-42bd-8d62-738f700d4b92',
    name: 'Creacion de un sistema de recomendacion de peliculas para cineastas aficionados',
    email: 'emilydavis@example.com',
    subject: 'N° 97345298',
    text: "I have a question about the budget for the upcoming project. It seems like there's a discrepancy in the allocation of resources.\n\nI've reviewed the budget report and identified a few areas where we might be able to optimize our spending without compromising the project's quality.\n\nI've attached a detailed analysis for your reference. Let's discuss this further in our next meeting.\n\nThanks, Emily",
    date: '2023-03-25T13:15:00',
    read: false,
    labels: ['Aprobado'],
  },
]

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
  }
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
