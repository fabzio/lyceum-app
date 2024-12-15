import { Input } from '@frontend/components/ui/input'
import ThesisThemeSelectFilter from './components/ThesisThemeRequestFilter'
import { useSuspenseQuery } from '@tanstack/react-query'
import { QueryKeys } from '@frontend/constants/queryKeys'

import ThesisThemeList from './components/ThesisThemeList'
import ThesisThemeRequestService from '@frontend/modules/thesis/services/ThesisThemeRequest.service'
import NewThesisRequest from './components/NewThesisRequest'
import { useSessionStore } from '@frontend/store'
import { ThesisPermissionsDict } from '@frontend/interfaces/enums/permissions/Thesis'
import ThesisReport from './components/ThesisReport'
import { useState } from 'react'

export default function ThesisTheme() {
  const { session, getRoleWithPermission, havePermission } = useSessionStore()

  const specialtiyId = getRoleWithPermission(
    ThesisPermissionsDict.APROVE_THESIS_PHASE_3
  )?.unitId
  const areaId = getRoleWithPermission(
    ThesisPermissionsDict.APROVE_THESIS_PHASE_2
  )?.unitId

  const accountCode = session!.code
  const [filter, setFilter] = useState<string | undefined>('')
  const { data: thesisThemeRequests } = useSuspenseQuery({
    queryKey: [QueryKeys.thesis.THESIS_REQUESTS, filter],
    queryFn: specialtiyId
      ? () =>
          ThesisThemeRequestService.getSpecialtyThesisThemeRequest({
            specialtiyId,
            filter: filter || undefined,
          })
      : areaId
        ? () =>
            ThesisThemeRequestService.getAreaThesisThemeRequest({
              areaId: areaId,
            })
        : havePermission(ThesisPermissionsDict.APROVE_THESIS_PHASE_1)
          ? () =>
              ThesisThemeRequestService.getAdvisorThesisThemeRequest({
                advisorCode: accountCode,
              })
          : () =>
              ThesisThemeRequestService.getStudentThesisThemeRequest({
                studentCode: accountCode,
              }),
  })
  return (
    <div className="flex flex-col my-6 p-2">
      <div className="w-full flex flex-col md:flex-row justify-between gap-2">
        <div className="md:flex-grow">
          <Input type="search" placeholder="🔎 Buscar" />
        </div>
        <div className="flex gap-3">
          <ThesisThemeSelectFilter onFilterChange={setFilter} />
        </div>
        <ThesisReport />
        <NewThesisRequest />
      </div>
      <ThesisThemeList thesisThemeRequests={thesisThemeRequests} />
    </div>
  )
}
