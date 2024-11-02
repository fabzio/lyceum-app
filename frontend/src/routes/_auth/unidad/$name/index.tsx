import General from '@frontend/modules/unit/views/General'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/unidad/$name/')({
  component: () => <General />,
})
