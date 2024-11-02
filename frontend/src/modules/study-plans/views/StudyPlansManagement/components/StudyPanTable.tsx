import DataTable from '@frontend/components/DataTable'
import { useMemo } from 'react'
import { studyPlanTableColumns } from './columns'
import { StudyPlan } from '@frontend/interfaces/models/StudyPlan'
import { useFilters } from '@frontend/hooks/useFilters'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@frontend/constants/queryKeys'
import StudyPlanService from '@frontend/modules/study-plans/services/studyPlan.service'
import { sortByToState, stateToSortBy } from '@frontend/lib/table'
import { useNavigate } from '@tanstack/react-router'
import { useSessionStore } from '@frontend/store'
import { StudyPlanPermissionsDict } from '@frontend/interfaces/enums/permissions/StudyPlan'

const DEFAULT_PAGE_INDEX = 0
const DEFAULT_PAGE_SIZE = 10

export default function StudyPlanTable() {
  const navigate = useNavigate()
  const { getRoleWithPermission } = useSessionStore()
  const { filters, setFilters } = useFilters(
    '/_auth/plan-de-estudios/gestionar'
  )
  const { data: studyPlans } = useQuery({
    queryKey: [QueryKeys.studyPlan.STUDY_PLANS, filters],
    queryFn: () =>
      StudyPlanService.getStudyPlans(
        getRoleWithPermission(StudyPlanPermissionsDict.READ_STUDY_PLAN)!.unitId
      ),
    placeholderData: keepPreviousData,
  })
  const paginationState = {
    pageIndex: filters.pageIndex || DEFAULT_PAGE_INDEX,
    pageSize: filters.pageSize || DEFAULT_PAGE_SIZE,
  }
  const sortingState = sortByToState(filters.sortBy)
  const columns = useMemo(() => studyPlanTableColumns, [])

  const handleRowClick = (studyPlan: StudyPlan) => {
    navigate({
      to: '/plan-de-estudios/gestionar/$planId',
      params: { planId: studyPlan.id.toString() },
    })
  }
  return (
    <DataTable
      columns={columns}
      data={studyPlans || []}
      onRowClick={handleRowClick}
      pagination={paginationState}
      sorting={sortingState}
      onSortingChange={(updateOrValue) => {
        const newSortingState =
          typeof updateOrValue === 'function'
            ? updateOrValue(sortingState)
            : updateOrValue
        return setFilters({ sortBy: stateToSortBy(newSortingState) })
      }}
      paginationOptions={{
        onPaginationChange: (pagination) => {
          setFilters(
            typeof pagination === 'function'
              ? pagination(paginationState)
              : pagination
          )
        },
        rowCount: studyPlans?.length,
        pageCount: 1,
      }}
    />
  )
}
