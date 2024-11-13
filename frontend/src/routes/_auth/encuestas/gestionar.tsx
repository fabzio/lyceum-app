import ManageSurvey from '@frontend/modules/surveys/views/ManageSurvey'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/encuestas/gestionar')({
  component: () => <ManageSurvey />,
})
