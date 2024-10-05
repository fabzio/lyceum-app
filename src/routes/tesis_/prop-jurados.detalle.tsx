import ThesisJuryRequestMail from '@/thesis/views/ThesisJury/ThesisJuryRequestMail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tesis/prop-jurados/detalle')({
  component: () => <ThesisJuryRequestMail />,
})
