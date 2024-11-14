import PresentationCardsOverview from '@frontend/modules/presentationCard/views/PresentationCardsOverview'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/carta-de-presentacion/')({
  component: () => <PresentationCardsOverview />,
})
