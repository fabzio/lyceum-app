export const EnrollmentPermissionsDict = {
  REQUEST_ADITIONAL_ENROLLMENT: 'REQUEST_ADITIONAL_ENROLLMENT',
  REVIEW_ADDITIONAL_ENROLLMENT: 'REVIEW_ADDITIONAL_ENROLLMENT',
  REQUEST_SCHEDULE_PROPOSAL: 'REQUEST_SCHEDULE_PROPOSAL',
  MANAGE_SCHEDULE_PROPOSAL: 'MANAGE_SCHEDULE_PROPOSAL',
  REVIEW_SCHEDULE_PROPOSAL: 'REVIEW_SCHEDULE_PROPOSAL',
  ASSIGN_SCHEDULE_PROFESORS: 'ASSIGN_SCHEDULE_PROFESORS',
  READ_SCHEDULE_PROFESORS: 'READ_SCHEDULE_PROFESORS',
} as const
const EnrollmentPermissions = [
  {
    name: EnrollmentPermissionsDict.REQUEST_ADITIONAL_ENROLLMENT,
    description: 'Solicitar matrícula adicional',
  },
  {
    name: EnrollmentPermissionsDict.REVIEW_ADDITIONAL_ENROLLMENT,
    description: 'Revisar solicitudes de matrícula adicional',
  },
  {
    name: EnrollmentPermissionsDict.REQUEST_SCHEDULE_PROPOSAL,
    description: 'Solicitar propuesta de horarios',
  },
  {
    name: EnrollmentPermissionsDict.MANAGE_SCHEDULE_PROPOSAL,
    description: 'Gestionar propuestas de horarios',
  },
  {
    name: EnrollmentPermissionsDict.REVIEW_SCHEDULE_PROPOSAL,
    description: 'Revisar propuestas de horarios',
  },
  {
    name: EnrollmentPermissionsDict.ASSIGN_SCHEDULE_PROFESORS,
    description: 'Asignar profesores a horarios',
  },
  {
    name: EnrollmentPermissionsDict.READ_SCHEDULE_PROFESORS,
    description: 'Leer profesores de horarios',
  },
]

export default EnrollmentPermissions
