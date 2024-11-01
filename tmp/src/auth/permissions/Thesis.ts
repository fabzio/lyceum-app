const ThesisPermissions = [
  {
    name: 'CREATE_THESIS',
    description: 'Crear tesis',
  },
  {
    name: 'READ_THESIS',
    description: 'Ver tesis de alumnos',
  },
  {
    name: 'APROVE_THESIS_PHASE_1',
    description: '1ra Aprobación de tesis',
  },
  {
    name: 'APROVE_THESIS_PHASE_2',
    description: '2da Aprobación de tesis',
  },
  {
    name: 'APROVE_THESIS_PHASE_3',
    description: '3ra Aprobación de tesis',
  },
  {
    name: 'REQUEST_THESIS_JURY',
    description: 'Solicitar jurado para tesis',
  },
  {
    name: 'ASSIGN_THESIS_JURY',
    description: 'Asignar jurados a tesis',
  },
] as const

export default ThesisPermissions
