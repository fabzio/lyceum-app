import General from '@frontend/modules/unit/views/UnitGeneral/General'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/unidades/departamentos/$unitId/')({
  component: () => <General />,
})
