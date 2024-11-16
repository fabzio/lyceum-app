import { AppModule } from '@frontend/interfaces/AppModule'
import { ModulesDict } from '@frontend/interfaces/enums/modules'
import { SurveyPermissionsDict } from '@frontend/interfaces/enums/permissions/Survey'
import { BarChart3 } from 'lucide-react'

export const SurveysModule: AppModule = {
  icon: <BarChart3 />,
  path: '/encuestas',
  label: 'Encuestas',
  code: ModulesDict.SURVEYS,
  description: 'Administración de encuestas y sus resultados',
  submodules: [
    {
      label: 'Gestionar encuestas',
      path: '/encuestas/gestionar',
      permissions: [
        SurveyPermissionsDict.CREATE_SURVEY,
        SurveyPermissionsDict.READ_SURVEY,
        SurveyPermissionsDict.READ_SURVEY_RESULTS,
      ],
    },
    {
      label: 'Responder encuestas',
      path: '/encuestas/listado',
      permissions: [SurveyPermissionsDict.ANSWER_SURVEY],
    },
  ],
}
