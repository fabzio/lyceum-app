import { QueryKeys } from '@frontend/constants/queryKeys'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { sortByToState, stateToSortBy } from '@frontend/lib/table'
import { useFilters } from '@frontend/hooks/useFilters'
import DataAccordion from '../EnrollmentProposeRequest/components/DataAccordion'
import { useSessionStore } from '@frontend/store'
import { EnrollmentPermissionsDict } from '@frontend/interfaces/enums/permissions/Enrollment'
import { ColumnDef } from '@tanstack/react-table'
import EnrollmentProposalService from '@frontend/modules/enrollment/services/EnrollmentProposal.service'
import { EnrollmentProposalColumns } from '../EnrollmentProposeRequest/components/enrcolumns'

export const DEFAULT_PAGE_INDEX = 0
export const DEFAULT_PAGE_SIZE = 10

export default function EnrollmentProposalAccordion() {
  const { filters, setFilters } = useFilters(
    '/_auth/matricula/propuesta-horarios/$requestNumber'
  )
  const { getRoleWithPermission } = useSessionStore()
  const { data: students } = useQuery({
    queryKey: [QueryKeys.enrollment.ENROLLMENT_PROPOSALS, filters],
    queryFn: () =>
      EnrollmentProposalService.getAllEnrollmentProposalsRequest({
        unitId: getRoleWithPermission(
          EnrollmentPermissionsDict.REQUEST_SCHEDULE_PROPOSAL
        )!.unitId,
        ...filters,
      }),
    placeholderData: keepPreviousData,
  })
  const paginationState = {
    pageIndex: filters.pageIndex || DEFAULT_PAGE_INDEX,
    pageSize: filters.pageSize || DEFAULT_PAGE_SIZE,
  }
  const sortingState = sortByToState(filters.sortBy)
  const columns = useMemo(() => EnrollmentProposalColumns, [])

  return (
    <>
      <DataAccordion
        data={students?.result.map((student) => ({ ...student })) ?? []}
        columns={columns as ColumnDef<Record<string, unknown>>[]}
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
          rowCount: students?.rowCount,
          pageCount: students?.totalPages,
        }}
      />
    </>
  )
}
