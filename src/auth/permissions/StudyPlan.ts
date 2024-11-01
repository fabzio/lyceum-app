const StudyPlanPermissions = [
  {
    name: 'READ_STUDY_PLAN',
    description: 'Ver planes de estudio',
  },
  {
    name: 'MANAGE_STUDY_PLAN',
    description: 'Administrar planes de estudio',
  },
  {
    name: 'MANAGE_COURSES',
    description: 'Administrar cursos',
  },
  {
    name: 'READ_COURSES',
    description: 'Ver cursos',
  },
] as const
export default StudyPlanPermissions
