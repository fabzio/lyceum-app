import { Input } from '@frontend/components/ui/input'
import ThesisJuryRequestSelectFilter from './components/ThesisJuryRequestFilter'
import ThesisJuryRequestElement from './components/ThesisJuryRequestElements'
import NewJuryRequestDialog from './components/NewJuryRequestDialog'
import { useQuery } from '@tanstack/react-query'
import ThesisJuryRequestService from '@frontend/modules/thesis/services/thesisJuryRequest.service'
import { QueryKeys } from '@frontend/constants/queryKeys'
import Need from '@frontend/components/Need'
import { ThesisPermissionsDict } from '@frontend/interfaces/enums/permissions/Thesis'
import { useSessionStore } from '@frontend/store'
import { useState } from 'react'

export default function ThesisJuryRequestList() {
  const { getRoleWithPermission } = useSessionStore()
  const unitId = getRoleWithPermission(
    ThesisPermissionsDict.READ_THESIS_JURY
  )!.unitId
  const [filter, setFilter] = useState<
    'unassigned' | 'requested' | 'assigned' | undefined
  >(undefined)
  const { data: thesisJuryRequest } = useQuery({
    queryKey: [QueryKeys.thesis.THESIS_JURY_REQUESTS, filter],

    queryFn: () => {
      return ThesisJuryRequestService.getThesisJuryRequests(unitId, filter)
    },
  })
  return (
    <div className="flex flex-col my-6 p-2">
      <div className="w-full flex md:flex-row justify-between gap-2">
        <div className="md:flex-grow">
          <Input type="search" placeholder="🔎 Buscar" />
        </div>
        <div className="flex gap-3">
          <ThesisJuryRequestSelectFilter onFilterChange={setFilter} />
        </div>
        <Need permissions={ThesisPermissionsDict.REQUEST_THESIS_JURY}>
          <NewJuryRequestDialog />
        </Need>
      </div>
      {!thesisJuryRequest?.length ? (
        <p className="flex justify-center py-3">
          No se encontraron solicitudes de jurados
        </p>
      ) : (
        <div>
          {thesisJuryRequest?.map((juryRequest) => (
            <ThesisJuryRequestElement key={juryRequest.code} {...juryRequest} />
          ))}
        </div>
      )}
    </div>
  )
}
