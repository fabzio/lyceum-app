import { AppModule } from '@frontend/interfaces/AppModule'
import { ModulesDict } from '@frontend/interfaces/enums/modules'
import { StudyPlanPermissionsDict } from '@frontend/interfaces/enums/permissions/StudyPlan'
import { GraduationCap } from 'lucide-react'

export const StudyPlanModule: AppModule = {
  code: ModulesDict.STUDY_PLAN,
  label: 'Cursos y planes de estudio',
  path: '/plan-de-estudios',
  icon: <GraduationCap />,
  description: 'Módulo de gestión de cursos y planes de estudio',
  submodules: [
    {
      label: 'Gestión de cursos',
      path: '/plan-de-estudios/cursos',
      permissions: [
        StudyPlanPermissionsDict.READ_COURSES,
        StudyPlanPermissionsDict.MANAGE_COURSES,
      ],
    },
    {
      label: 'Gestión de plan de estudios',
      path: '/plan-de-estudios/gestionar',
      permissions: [
        StudyPlanPermissionsDict.MANAGE_STUDY_PLAN,
        StudyPlanPermissionsDict.READ_STUDY_PLAN,
      ],
    },
  ],
}
