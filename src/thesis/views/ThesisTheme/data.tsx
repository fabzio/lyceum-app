import { ThesisThemeRequest } from '@/thesis/Interfaces/ThesisThemeRequest'

export const thesisThemeRequestList: ThesisThemeRequest[] = [
  {
    id: '39457392',
    status: 'pending',
    thesis: {
      id: '1',
      title: 'Análisis de vulnerabilidades comunes en contratos inteligentes',
      area: 'Sistemas de Información',
      status: 'pending',
      students: [
        { code: '00089434', name: 'Rony Tupia' },
        { code: '19872992', name: 'Víctor Bello' },
      ],
      advisors: [
        { code: '00089434', name: 'Rony Tupia', isPrincipal: true },
        { code: '19872992', name: 'Víctor Bello', isPrincipal: false },
      ],
      concentration: 'Ingeniería de Software',
    },
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
        step: 'Aprobado por Director de Carrera',
        status: 'completed',
        name: 'Ricardo Bartra',
        canDownload: true,
      },
      {
        step: 'Aprobado por Coordinador de Área',
        status: 'current',
        name: 'Jheyfer Ramírez',
      },
    ],
  },
  {
    id: '39457393',
    status: 'approved',
    thesis: {
      id: '2',
      title:
        'Desarrollo de un Sistema de Gestión de Proyectos Basado en Metodologías Ágiles para Mejorar la Productividad en Equipos de Trabajo Remotos',
      area: 'Sistemas de Información',
      status: 'approved',
      students: [
        { code: '00089434', name: 'Rony Tupia' },
        { code: '19872992', name: 'Víctor Bello' },
      ],
      advisors: [
        { code: '00089434', name: 'Rony Tupia', isPrincipal: true },
        { code: '19872992', name: 'Víctor Bello', isPrincipal: false },
      ],
      concentration: 'Sistemas de Información',
    },
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
        step: 'Aprobado por Director de Carrera',
        status: 'completed',
        name: 'Ricardo Bartra',
        canDownload: true,
      },
      {
        step: 'Aprobado por Coordinador de Área',
        status: 'completed',
        name: 'Jheyfer Ramírez',
      },
    ],
  },
]
