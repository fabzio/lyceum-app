import ThesisJuryRequestDetail from '@/thesis/views/ThesisJury/ThesisJuryRequestDetail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/tesis/prop-jurados/detalle/$idSolicitudJurado',
)({
  component: () => (
    <ThesisJuryRequestDetail/>
  ),
})
