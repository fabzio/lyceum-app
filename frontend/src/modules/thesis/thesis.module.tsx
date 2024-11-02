import { AppModule } from '@frontend/interfaces/AppModule'
import { ThesisPermissionsDict } from '@frontend/interfaces/enums/permissions/Thesis'
import { Book } from 'lucide-react'

export const ThesisModule: AppModule = {
  code: 'THESIS',
  label: 'Tesis',
  description: 'Módulo de gestión de tesis',
  path: '/tesis',
  icon: <Book />,
  submodules: [
    {
      label: 'Temas de tesis',
      path: '/tesis/tema-tesis',
      permissions: [
        ThesisPermissionsDict.APROVE_THESIS_PHASE_1,
        ThesisPermissionsDict.APROVE_THESIS_PHASE_2,
        ThesisPermissionsDict.APROVE_THESIS_PHASE_3,
        ThesisPermissionsDict.CREATE_THESIS,
        ThesisPermissionsDict.READ_THESIS,
      ],
    },
    {
      label: 'Jurado de tesis',
      path: '/tesis/propuesta-jurados',
      permissions: [
        ThesisPermissionsDict.ASSIGN_THESIS_JURY,
        ThesisPermissionsDict.REQUEST_THESIS_JURY,
      ],
    },
  ],
}
