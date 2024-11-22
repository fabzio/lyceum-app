import ScheduleManagement from '@frontend/modules/student-process/views/ScheduleManagement'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/contrataciones/gestion-jefes-practica'
)({
  component: () => <ScheduleManagement />,
})
