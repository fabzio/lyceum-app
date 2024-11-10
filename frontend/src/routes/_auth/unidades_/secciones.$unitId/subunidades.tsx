import SubUnits from '@frontend/modules/unit/views/UnitGeneral/SubUnits/SubUnits'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/unidades/secciones/$unitId/subunidades'
)({
  component: () => <SubUnits />,
})
