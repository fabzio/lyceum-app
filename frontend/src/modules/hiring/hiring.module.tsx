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
    {
      label: 'Selección de docentes',
      path: '/contrataciones/seleccion-docentes',
      permissions: [],
    },
    {
      label: 'Gestión de jefes de práctica',
      path: '/contrataciones/gestion-jefes-practica',
      permissions: [],
    },
  ],
}
