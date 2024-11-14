import AnwserSurvey from '@frontend/modules/surveys/views/AnwserSurvey'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/encuestas/listado')({
  component: () => <AnwserSurvey />,
})
