const StudentProcessPermissions = [
  {
    name: 'READ_RISK_STUDENTS',
    description: 'Ver estudiantes en riesgo',
  },
  {
    name: 'LOAD_RISK_STUDENTS',
    description: 'Cargar estudiantes en riesgo',
  },
  {
    name: 'REQUEST_RISK_STUDENT_REPORT',
    description: 'Solicitar reporte de estudiantes en riesgo',
  },
  {
    name: 'UPDATE_RISK_STUDENT_REPORT',
    description: 'Actualizar reporte de estudiantes en riesgo',
  },
] as const

export default StudentProcessPermissions
