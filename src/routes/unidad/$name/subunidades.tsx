import SubUnits from '@/modules/unit/views/SubUnits/SubUnits'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/unidad/$name/subunidades')({
  component: () => <SubUnits />,
})
