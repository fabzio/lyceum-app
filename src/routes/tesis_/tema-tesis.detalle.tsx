import CodeThesisTheme from '@/thesis/views/ThesisTheme/ThesisDetail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tesis/tema-tesis/detalle')({
  component: () => <CodeThesisTheme />,
})
