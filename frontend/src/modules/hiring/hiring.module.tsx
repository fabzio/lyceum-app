import { AppModule } from '@frontend/interfaces/AppModule'
import { ModulesDict } from '@frontend/interfaces/enums/modules'
import { Briefcase } from 'lucide-react'

export const HiringModule: AppModule = {
  code: ModulesDict.HIRING,
  label: 'Contrataciones',
  path: '/contrataciones',
  icon: <Briefcase />,
  description: 'Módulo de gestión de contrataciones',
  submodules: [
  ],
}