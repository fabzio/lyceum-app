import { AppModule } from '@/interfaces/AppModule'
import { ModulesDict } from '@/interfaces/enums/modules'
import { StudyPlanPermissionsDict } from '@/interfaces/enums/permissions/StudyPlan'
import { GraduationCap } from 'lucide-react'

export const StudyPlanModule: AppModule = {
  code: ModulesDict.STUDY_PLAN,
  label: 'Planes de Estudio',
  path: '/plan-de-estudios',
  icon: <GraduationCap />,
  description: 'Módulo de gestión de planes de estudio',
  submodules: [
    {
      label: 'Gestión de cursos',
      path: '/plan-de-estudios/cursos',
      permissions: [
        StudyPlanPermissionsDict.MANAGE_COURSES,
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
