export const StudentProcessPermissionsDict = {
  READ_RISK_STUDENTS: 'READ_RISK_STUDENTS',
  LOAD_RISK_STUDENTS: 'LOAD_RISK_STUDENTS',
  REQUEST_RISK_STUDENT_REPORT: 'REQUEST_RISK_STUDENT_REPORT',
  UPDATE_RISK_STUDENT_REPORT: 'UPDATE_RISK_STUDENT_REPORT',
  CREATE_PRESENTATION_LETTER: 'CREATE_PRESENTATION_LETTER',
  REVIEW_PRESENTATION_LETTER: 'REVIEW_PRESENTATION_LETTER',
  APPROVE_PRESENTATION_LETTER: 'APPROVE_PRESENTATION_LETTER',
  READ_PRESENTATION_LETTER: 'READ_PRESENTATION_LETTER',
  MANAGE_JP: 'MANAGE_JP',
  MANAGE_DELEGATE: 'MANAGE_DELEGATE',
} as const

const StudentProcessPermissions = [
  {
    name: StudentProcessPermissionsDict.READ_RISK_STUDENTS,
    description: 'Ver estudiantes en riesgo',
  },
  {
    name: StudentProcessPermissionsDict.LOAD_RISK_STUDENTS,
    description: 'Cargar estudiantes en riesgo',
  },
  {
    name: StudentProcessPermissionsDict.REQUEST_RISK_STUDENT_REPORT,
    description: 'Solicitar reporte de estudiantes en riesgo',
  },
  {
    name: StudentProcessPermissionsDict.UPDATE_RISK_STUDENT_REPORT,
    description: 'Actualizar reporte de estudiantes en riesgo',
  },
  {
    name: StudentProcessPermissionsDict.CREATE_PRESENTATION_LETTER,
    description: 'Crear carta de presentación',
  },
  {
    name: StudentProcessPermissionsDict.REVIEW_PRESENTATION_LETTER,
    description: 'Revisar carta de presentación',
  },
  {
    name: StudentProcessPermissionsDict.APPROVE_PRESENTATION_LETTER,
    description: 'Aprobar carta de presentación',
  },
  {
    name: StudentProcessPermissionsDict.READ_PRESENTATION_LETTER,
    description: 'Leer carta de presentación',
  },
  {
    name: StudentProcessPermissionsDict.MANAGE_JP,
    description: 'Administrar JP',
  },
  {
    name: StudentProcessPermissionsDict.MANAGE_DELEGATE,
    description: 'Administrar delegados',
  },
] as const

export default StudentProcessPermissions
