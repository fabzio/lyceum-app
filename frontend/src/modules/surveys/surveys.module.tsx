import { AppModule } from '@frontend/interfaces/AppModule'
import { ModulesDict } from '@frontend/interfaces/enums/modules'
import { BarChart3 } from 'lucide-react'

export const SurveysModule: AppModule = {
  icon: <BarChart3 />,
  path: '/encuestas',
  label: 'Gestión de Encuestas',
  code: ModulesDict.SURVEY,
  description: 'Administración de encuestas y sus resultados',
  submodules: [
    {
      label: 'Docentes',
      path: '/encuestas',
      permissions: [], // Sin permisos específicos por ahora
    },
    {
      label: 'Asistentes',
      path: '/encuestas/coordinador-seccion',
      permissions: [], // Sin permisos específicos por ahora
    },
    {
      label: 'Plantillas',
      path: '/encuestas/plantillas',
      permissions: [], // Sin permisos específicos por ahora
    },
  ],
}
