import General from '@/modules/unit/views/General'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/unidad/$name/')({
  component: () => <General />,
})
