export const StudentProcessPermissionsDict = {
  READ_RISK_STUDENTS: 'READ_RISK_STUDENTS',
  LOAD_RISK_STUDENTS: 'LOAD_RISK_STUDENTS',
  REQUEST_RISK_STUDENT_REPORT: 'REQUEST_RISK_STUDENT_REPORT',
  UPDATE_RISK_STUDENT_REPORT: 'UPDATE_RISK_STUDENT_REPORT',
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
] as const

export default StudentProcessPermissions
