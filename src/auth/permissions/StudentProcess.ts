export const StudentProcessPermissionsDict = {
  READ_RISK_STUDENTS: 'READ_RISK_STUDENTS',
  LOAD_RISK_STUDENTS: 'LOAD_RISK_STUDENTS',
  REQUEST_RISK_STUDENT_REPORT: 'REQUEST_RISK_STUDENT_REPORT',
  UPDATE_RISK_STUDENT_REPORT: 'UPDATE_RISK_STUDENT_REPORT',
  CREATE_PRESENTATION_CARD: 'CREATE_PRESENTATION_CARD',
  REVIEW_PRESENTATION_CARD: 'REVIEW_PRESENTATION_CARD',
  APPROVE_PRESENTATION_CARD: 'APPROVE_PRESENTATION_CARD',
  READ_PRESENTATION_CARD: 'READ_PRESENTATION_CARD',
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
    name: StudentProcessPermissionsDict.CREATE_PRESENTATION_CARD,
    description: 'Crear carta de presentación',
  },
  {
    name: StudentProcessPermissionsDict.REVIEW_PRESENTATION_CARD,
    description: 'Revisar carta de presentación',
  },
  {
    name: StudentProcessPermissionsDict.APPROVE_PRESENTATION_CARD,
    description: 'Aprobar carta de presentación',
  },
  {
    name: StudentProcessPermissionsDict.READ_PRESENTATION_CARD,
    description: 'Leer carta de presentación',
  },
] as const

export default StudentProcessPermissions
