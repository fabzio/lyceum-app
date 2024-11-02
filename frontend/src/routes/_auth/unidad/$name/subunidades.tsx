import SubUnits from '@frontend/modules/unit/views/SubUnits/SubUnits'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/unidad/$name/subunidades')({
  component: () => <SubUnits />,
})
