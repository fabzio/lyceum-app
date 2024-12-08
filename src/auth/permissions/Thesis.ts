export const ThesisPermissionsDict = {
  CREATE_THESIS: 'CREATE_THESIS',
  READ_THESIS: 'READ_THESIS',
  APROVE_THESIS_PHASE_1: 'APROVE_THESIS_PHASE_1',
  APROVE_THESIS_PHASE_2: 'APROVE_THESIS_PHASE_2',
  APROVE_THESIS_PHASE_3: 'APROVE_THESIS_PHASE_3',
  REQUEST_THESIS_JURY: 'REQUEST_THESIS_JURY',
  ASSIGN_THESIS_JURY: 'ASSIGN_THESIS_JURY',
  DOWNLOAD_THESIS_REPORT: 'DOWNLOAD_THESIS_REPORT',
} as const

export type ThesisPermissions = keyof typeof ThesisPermissionsDict
const ThesisPermissions = [
  {
    name: ThesisPermissionsDict.CREATE_THESIS,
    description: 'Crear tesis',
  },
  {
    name: ThesisPermissionsDict.READ_THESIS,
    description: 'Ver tesis de alumnos',
  },
  {
    name: ThesisPermissionsDict.APROVE_THESIS_PHASE_1,
    description: '1ra Aprobación de tesis',
  },
  {
    name: ThesisPermissionsDict.APROVE_THESIS_PHASE_2,
    description: '2da Aprobación de tesis',
  },
  {
    name: ThesisPermissionsDict.APROVE_THESIS_PHASE_3,
    description: '3ra Aprobación de tesis',
  },
  {
    name: ThesisPermissionsDict.REQUEST_THESIS_JURY,
    description: 'Solicitar jurado para tesis',
  },
  {
    name: ThesisPermissionsDict.ASSIGN_THESIS_JURY,
    description: 'Asignar jurados a tesis',
  },
  {
    name: ThesisPermissionsDict.DOWNLOAD_THESIS_REPORT,
    description: 'Descargar reporte de tesis',
  },
] as const

export default ThesisPermissions
