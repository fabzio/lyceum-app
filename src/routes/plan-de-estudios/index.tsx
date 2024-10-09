import { createFileRoute } from '@tanstack/react-router'
import ThesisTheme from '@/thesis/views/ThesisTheme'

export const Route = createFileRoute('/plan-de-estudios/')({
  component: () => <ThesisTheme/>
})
