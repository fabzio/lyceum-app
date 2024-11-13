import SurveyTemplates from '@frontend/modules/surveys/views/Templates'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/encuestas/plantillas')({
  component: () => <SurveyTemplates />,
})
