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

export const mails1: ThesisJuryRequest[] = [
  {
    id: '39457392',
    thesis: {
      id: '39457392',
      title:
        'Desarrollo de un Sistema de Gestión de Proyectos Basado en Metodologías Ágiles para Mejorar la Productividad en Equipos de Trabajo Remotos',
      area: 'Sistemas de Información',
      students: [
        { code: '00089434', name: 'Rony TupiaESTUDIANTE' },
        { code: '19872992', name: 'Víctor BelloESTUDIANTE' },
      ],
      advisors: [
        { code: '11111111', name: 'Rony TupiaASESOR', isPrincipal: true },
        { code: '22222222', name: 'Víctor BelloASESOR', isPrincipal: false },
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
      { code: '33333333', name: 'Rony TupiaJURADO' },
      { code: '44444444', name: 'Víctor BelloJURADO' },
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

export const mails: ThesisJuryRequest[] = [
  {
    id: "TJ001",
    thesis: {
      id: "T001",
      title: "Artificial Intelligence in Healthcare",
      area: "Computer Science",
      students: [
        { code: "S001", name: "Alice Johnson" },
        { code: "S002", name: "Bob Smith" }
      ],
      advisors: [
        { code: "A001", name: "Dr. John Doe", isPrincipal: true },
        { code: "A002", name: "Dr. Jane Foster", isPrincipal: false }
      ],
      status: "approved",
      fileInfo: {
        requestNumber: "REQ001",
        name: "AI in Healthcare",
        concentration: "Data Science"
      }
    },
    jury: [
      { code: "J001", name: "Prof. Anna Wright" },
      { code: "J002", name: "Prof. Samuel Brown" }
    ],
    status: "pending",
    approvalHistory: [
      { step: "submission", status: "completed", name: "Dr. John Doe", canDownload: true },
      { step: "initialReview", status: "current", name: "Prof. Anna Wright" }
    ]
  },
  {
    id: "TJ002",
    thesis: {
      id: "T002",
      title: "Blockchain in Financial Services",
      area: "Finance",
      students: [
        { code: "S003", name: "Charles Davis" }
      ],
      advisors: [
        { code: "A003", name: "Dr. Laura King", isPrincipal: true }
      ],
      status: "pending",
      fileInfo: {
        requestNumber: "REQ002",
        name: "Blockchain Financial",
        concentration: "Financial Technology"
      }
    },
    jury: [
      { code: "J003", name: "Prof. Michael Harris" },
      { code: "J004", name: "Prof. Linda Green" }
    ],
    status: "pending",
    approvalHistory: [
      { step: "submission", status: "completed", name: "Dr. Laura King", canDownload: true },
      { step: "initialReview", status: "pending", name: "Prof. Michael Harris" }
    ]
  },
  {
    id: "TJ003",
    thesis: {
      id: "T003",
      title: "Renewable Energy Solutions",
      area: "Environmental Engineering",
      students: [
        { code: "S004", name: "Diana Prince" },
        { code: "S005", name: "Bruce Wayne" }
      ],
      advisors: [
        { code: "A004", name: "Dr. Clark Kent", isPrincipal: true },
        { code: "A005", name: "Dr. Lois Lane", isPrincipal: false }
      ],
      status: "approved",
      fileInfo: {
        requestNumber: "REQ003",
        name: "Renewable Energy",
        concentration: "Sustainable Engineering"
      }
    },
    jury: [
      { code: "J005", name: "Prof. Barry Allen" },
      { code: "J006", name: "Prof. Victor Stone" }
    ],
    status: "approved",
    approvalHistory: [
      { step: "submission", status: "completed", name: "Dr. Clark Kent", canDownload: true },
      { step: "finalReview", status: "completed", name: "Prof. Barry Allen" }
    ]
  },
  {
    id: "TJ004",
    thesis: {
      id: "T004",
      title: "Cybersecurity Threats in IoT",
      area: "Cybersecurity",
      students: [
        { code: "S006", name: "Peter Parker" }
      ],
      advisors: [
        { code: "A006", name: "Dr. Tony Stark", isPrincipal: true }
      ],
      status: "pending",
      fileInfo: {
        requestNumber: "REQ004",
        name: "IoT Security",
        concentration: "Information Security"
      }
    },
    jury: [
      { code: "J007", name: "Prof. Natasha Romanoff" },
      { code: "J008", name: "Prof. Steve Rogers" }
    ],
    status: "pending",
    approvalHistory: [
      { step: "submission", status: "completed", name: "Dr. Tony Stark" },
      { step: "initialReview", status: "pending", name: "Prof. Natasha Romanoff" }
    ]
  },
  {
    id: "TJ005",
    thesis: {
      id: "T005",
      title: "Quantum Computing Applications",
      area: "Physics",
      students: [
        { code: "S007", name: "Stephen Strange" }
      ],
      advisors: [
        { code: "A007", name: "Dr. Bruce Banner", isPrincipal: true }
      ],
      status: "approved",
      fileInfo: {
        requestNumber: "REQ005",
        name: "Quantum Computing",
        concentration: "Quantum Physics"
      }
    },
    jury: [
      { code: "J009", name: "Prof. Wanda Maximoff" },
      { code: "J010", name: "Prof. Clint Barton" }
    ],
    status: "approved",
    approvalHistory: [
      { step: "submission", status: "completed", name: "Dr. Bruce Banner", canDownload: true },
      { step: "finalReview", status: "completed", name: "Prof. Wanda Maximoff" }
    ]
  },
  {
    id: "TJ006",
    thesis: {
      id: "T006",
      title: "Augmented Reality in Education",
      area: "Educational Technology",
      students: [
        { code: "S008", name: "Tony Montana" },
        { code: "S009", name: "Scarlett Johansson" }
      ],
      advisors: [
        { code: "A008", name: "Dr. Oliver Queen", isPrincipal: true }
      ],
      status: "approved",
      fileInfo: {
        requestNumber: "REQ006",
        name: "AR in Education",
        concentration: "Learning Technologies"
      }
    },
    jury: [
      { code: "J011", name: "Prof. Felicity Smoak" },
      { code: "J012", name: "Prof. Roy Harper" }
    ],
    status: "pending",
    approvalHistory: [
      { step: "submission", status: "completed", name: "Dr. Oliver Queen" },
      { step: "initialReview", status: "pending", name: "Prof. Felicity Smoak" }
    ]
  },
  {
    id: "TJ007",
    thesis: {
      id: "T007",
      title: "Autonomous Vehicles and Safety",
      area: "Mechanical Engineering",
      students: [
        { code: "S010", name: "T'Challa Udaku" }
      ],
      advisors: [
        { code: "A009", name: "Dr. Shuri Udaku", isPrincipal: true }
      ],
      status: "approved",
      fileInfo: {
        requestNumber: "REQ007",
        name: "Autonomous Vehicles",
        concentration: "Robotics"
      }
    },
    jury: [
      { code: "J013", name: "Prof. Erik Killmonger" },
      { code: "J014", name: "Prof. Nakia" }
    ],
    status: "approved",
    approvalHistory: [
      { step: "submission", status: "completed", name: "Dr. Shuri Udaku", canDownload: true },
      { step: "finalReview", status: "completed", name: "Prof. Erik Killmonger" }
    ]
  },
  {
    id: "TJ008",
    thesis: {
      id: "T008",
      title: "Climate Change and Ocean Currents",
      area: "Environmental Science",
      students: [
        { code: "S011", name: "Namor McKenzie" }
      ],
      advisors: [
        { code: "A010", name: "Dr. Ororo Munroe", isPrincipal: true }
      ],
      status: "pending",
      fileInfo: {
        requestNumber: "REQ008",
        name: "Ocean Currents",
        concentration: "Marine Sciences"
      }
    },
    jury: [
      { code: "J015", name: "Prof. Jean Grey" },
      { code: "J016", name: "Prof. Scott Summers" }
    ],
    status: "pending",
    approvalHistory: [
      { step: "submission", status: "completed", name: "Dr. Ororo Munroe" },
      { step: "initialReview", status: "pending", name: "Prof. Jean Grey" }
    ]
  }
]