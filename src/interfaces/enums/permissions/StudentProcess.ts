export const StudentProcessPermissionsDict = {
  READ_RISK_STUDENTS: 'READ_RISK_STUDENTS',
  LOAD_RISK_STUDENTS: 'LOAD_RISK_STUDENTS',
  REQUEST_RISK_STUDENT_REPORT: 'REQUEST_RISK_STUDENT_REPORT',
  UPDATE_RISK_STUDENT_REPORT: 'UPDATE_RISK_STUDENT_REPORT',
} as const

export type StudentProcessPermissionsDict =
  keyof typeof StudentProcessPermissionsDict
