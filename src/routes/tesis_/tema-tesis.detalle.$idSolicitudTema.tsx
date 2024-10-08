import ThesisManagement from '@/thesis/views/ThesisTheme/ThesisThemeRequestDetail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/tesis/tema-tesis/detalle/$idSolicitudTema'
)({
  component: () => <ThesisManagement />,
})
