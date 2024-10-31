export const EnrollmentPermissionsDict = {
  REQUEST_ADITIONAL_ENROLLMENT: 'REQUEST_ADITIONAL_ENROLLMENT',
  REVIEW_ADDITIONAL_ENROLLMENT: 'REVIEW_ADDITIONAL_ENROLLMENT',
} as const

export type EnrollmentPermissionsDict = keyof typeof EnrollmentPermissionsDict
