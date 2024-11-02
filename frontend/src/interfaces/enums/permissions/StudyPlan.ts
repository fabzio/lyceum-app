export const StudyPlanPermissionsDict = {
  READ_STUDY_PLAN: 'READ_STUDY_PLAN',
  MANAGE_STUDY_PLAN: 'MANAGE_STUDY_PLAN',
  MANAGE_COURSES: 'MANAGE_COURSES',
  READ_COURSES: 'READ_COURSES',
} as const

export type StudyPlanPermissions = keyof typeof StudyPlanPermissionsDict
