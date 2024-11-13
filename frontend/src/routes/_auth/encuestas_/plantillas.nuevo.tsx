import CreateTemplate from '@frontend/modules/surveys/views/Templates/NewTemplate'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/encuestas/plantillas/nuevo')({
  component: () => <CreateTemplate />,
})
