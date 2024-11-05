import { AppModule } from '@frontend/interfaces/AppModule'
import { ModulesDict } from '@frontend/interfaces/enums/modules'
import { FAQPermissionsDict } from '@frontend/interfaces/enums/permissions/FAQ'
import { MessageCircleQuestion } from 'lucide-react'

export const FAQModule: AppModule = {
  icon: <MessageCircleQuestion />,
  path: '/preguntas-frecuentes',
  label: 'Preguntas frecuentes',
  description: 'Módulo de preguntas frecuentes',
  code: ModulesDict.FAQ,
  submodules: [
    {
      label: 'Listado de preguntas',
      path: '/preguntas-frecuentes',
      permissions: [FAQPermissionsDict.MAGANE_FAQ, FAQPermissionsDict.READ_FAQ],
    },
    {
      label: 'Sugerir pregunta',
      path: '/preguntas-frecuentes',
      permissions: [
        FAQPermissionsDict.SUGGEST_FAQ,
        FAQPermissionsDict.VIEW_FAQ_SUGGESTIONS,
      ],
    },
  ],
}
