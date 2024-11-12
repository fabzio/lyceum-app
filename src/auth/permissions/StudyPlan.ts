export const StudyPlanPermissionsDict = {
  READ_STUDY_PLAN: 'Ver planes de estudio',
  MANAGE_STUDY_PLAN: 'Administrar planes de estudio',
  MANAGE_COURSES: 'Administrar cursos',
  READ_COURSES: 'Ver cursos',
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
