export const StudyPlanPermissionsDict = {
  READ_STUDY_PLAN: 'READ_STUDY_PLAN',
  MANAGE_STUDY_PLAN: 'MANAGE_STUDY_PLAN',
  MANAGE_COURSES: 'MANAGE_COURSES',
  READ_COURSES: 'READ_COURSES',
} as const

const StudyPlanPermissions = [
  {
    name: StudyPlanPermissionsDict.READ_STUDY_PLAN,
    description: 'Ver planes de estudio',
  },
  {
    name: StudyPlanPermissionsDict.MANAGE_STUDY_PLAN,
    description: 'Administrar planes de estudio',
  },
  {
    name: StudyPlanPermissionsDict.MANAGE_COURSES,
    description: 'Administrar cursos',
  },
  {
    name: StudyPlanPermissionsDict.READ_COURSES,
    description: 'Ver cursos',
  },
] as const
export default StudyPlanPermissions
