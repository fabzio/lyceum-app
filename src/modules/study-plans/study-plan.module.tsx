import { AppModule } from '@/interfaces/AppModule'
import { GraduationCap } from 'lucide-react'

export const StudyPlanModule: AppModule = {
  code: 'STUDY_PLAN',
  label: 'Planes de Estudio',
  path: '/plan-de-estudios',
  icon: <GraduationCap />,
  description: 'Módulo de gestión de planes de estudio',
  children: [
    {
      code: '5.1',
      label: 'Gestionar plane de estudio',
      description: 'Administrar el plan de estudio vigente e historícos',
      path: '/plan-de-estudios/gestionar',
    },
  ],
}
