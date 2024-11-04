export const EnrollmentPermissionsDict = {
  REQUEST_ADITIONAL_ENROLLMENT: 'REQUEST_ADITIONAL_ENROLLMENT',
  REVIEW_ADDITIONAL_ENROLLMENT_ALL: 'REVIEW_ADDITIONAL_ENROLLMENT_ALL',
  REVIEW_ADDITIONAL_ENROLLMENT_MYSELF: 'REVIEW_ADDITIONAL_ENROLLMENT_MYSELF',
  REQUEST_SCHEDULE_PROPOSAL: 'REQUEST_SCHEDULE_PROPOSAL',
  MANAGE_SCHEDULE_PROPOSAL: 'MANAGE_SCHEDULE_PROPOSAL',
  REVIEW_SCHEDULE_PROPOSAL: 'REVIEW_SCHEDULE_PROPOSAL',
  ASSIGN_SCHEDULE_PROFESORS: 'ASSIGN_SCHEDULE_PROFESORS',
  READ_SCHEDULE_PROFESORS: 'READ_SCHEDULE_PROFESORS',
} as const

export type EnrollmentPermissionsDict = keyof typeof EnrollmentPermissionsDict
