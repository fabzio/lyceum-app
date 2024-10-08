import ThesisJuryRequestList from '@/thesis/views/ThesisJury'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tesis/prop-jurados')({
  component: () => <ThesisJuryRequestList />,
})
