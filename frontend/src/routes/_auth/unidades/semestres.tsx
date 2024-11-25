import { QueryKeys } from '@frontend/constants/queryKeys'
import UnitService from '@frontend/modules/unit/services/Unit.service'
import TermManagement from '@frontend/modules/unit/views/Terms'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/unidades/semestres')({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.unit.TERMS, {}],
      queryFn: () => UnitService.fetchTerms({}),
    })
  },
  component: () => <TermManagement />,
})
