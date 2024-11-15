import PresentationCardForm from '@frontend/modules/presentationCard/views/PresentationCardDetail/components/PresentationCardForm'
import { createFileRoute } from '@tanstack/react-router'
//
export const Route = createFileRoute(
  '/_auth/carta-de-presentacion/nueva-solicitud'
)({
  component: () => <PresentationCardForm />,
})
