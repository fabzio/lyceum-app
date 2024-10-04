import { createFileRoute } from '@tanstack/react-router'
import ThesisTheme from '@/tesis/views/ThesisTheme'

export const Route = createFileRoute('/tesis/')({
  component: () => <ThesisTheme/>
})
