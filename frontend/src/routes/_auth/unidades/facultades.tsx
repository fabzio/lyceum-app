import { QueryKeys } from '@frontend/constants/queryKeys'
import { UnitType } from '@frontend/interfaces/enums'
import UnitService from '@frontend/modules/unit/services/Unit.service'
import UnitGeneral from '@frontend/modules/unit/views/UnitGeneral'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/unidades/facultades')({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.unit.UNITS, UnitType.FACULTY, {}],
      queryFn: () =>
        UnitService.getUnitByTypePaginated({ unitType: UnitType.FACULTY }),
    })
  },
  component: () => <UnitGeneral unitType={UnitType.FACULTY} />,
})
