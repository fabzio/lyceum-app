import General from '@/unit/views/General'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/unidad/$name/')({
  component: () => <General />,
})
