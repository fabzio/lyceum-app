import ThesisThemeDetail from '@frontend/modules/thesis/views/ThesisTheme/ThesisThemeDetail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/tesis/tema-tesis')({
  component: () => <ThesisThemeDetail />,
})
