import { QueryKeys } from '@frontend/constants/queryKeys'
import { UnitType } from '@frontend/interfaces/enums'
import UnitService from '@frontend/modules/unit/services/Unit.service'
import UnitGeneral from '@frontend/modules/unit/views/UnitGeneral'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/unidades/especialidades')({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.unit.UNITS, UnitType.SPECIALTY, {}],
      queryFn: () =>
        UnitService.getUnitByTypePaginated({ unitType: UnitType.SPECIALTY }),
    })
  },
  component: () => <UnitGeneral unitType={UnitType.SPECIALTY} />,
})
