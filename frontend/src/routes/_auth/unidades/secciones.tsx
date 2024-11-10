import { QueryKeys } from '@frontend/constants/queryKeys'
import { UnitType } from '@frontend/interfaces/enums'
import UnitService from '@frontend/modules/unit/services/Unit.service'
import UnitGeneral from '@frontend/modules/unit/views/UnitGeneral'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/unidades/secciones')({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.unit.UNITS, UnitType.SECTION, {}],
      queryFn: () =>
        UnitService.getUnitByTypePaginated({ unitType: UnitType.SECTION }),
    })
  },
  component: () => <UnitGeneral unitType={UnitType.SECTION} />,
})
