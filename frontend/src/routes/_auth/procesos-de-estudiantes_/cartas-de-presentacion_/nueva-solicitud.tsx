import NewCoverLetter from '@frontend/modules/student-process/views/CoverLetter/PresentationCardNew'
import { createFileRoute } from '@tanstack/react-router'
//
export const Route = createFileRoute(
  '/_auth/procesos-de-estudiantes/cartas-de-presentacion/nueva-solicitud'
)({
  component: () => <NewCoverLetter />,
})
