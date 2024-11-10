import Roles from '@frontend/modules/unit/views/UnitGeneral/Roles'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/unidades/secciones/$unitId/roles')(
  {
    component: () => <Roles />,
  }
)
