import { AppModule } from '@/interfaces/AppModule'
import { ModulesDict } from '@/interfaces/enums/modules'
import { GraduationCap } from 'lucide-react'

export const StudyPlanModule: AppModule = {
  code: ModulesDict.STUDY_PLAN,
  label: 'Planes de Estudio',
  path: '/plan-de-estudios',
  icon: <GraduationCap />,
  description: 'Módulo de gestión de planes de estudio',
}
