import ThesisThemeDetail from '@/modules/thesis/views/ThesisTheme/ThesisThemeDetail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tesis/tema-tesis')({
  component: () => <ThesisThemeDetail />,
})
