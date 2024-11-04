import { QueryKeys } from '@frontend/constants/queryKeys'
import { useFilters } from '@frontend/hooks/useFilters'
import EnrollmentProposalService from '@frontend/modules/enrollment/services/EnrollmentProposal.service'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import DataTable from '@frontend/components/DataTable'
import { sortByToState, stateToSortBy } from '@frontend/lib/table'
import { useMemo } from 'react'
import { enrollmentProposalTableColumns } from './columns'
import { useNavigate } from '@tanstack/react-router'
import { EnrollmentPermissionsDict } from '@frontend/interfaces/enums/permissions/Enrollment'
import { useSessionStore } from '@frontend/store'

export default function EnrollmentProposeTable() {
  const navigate = useNavigate({
    from: '/matricula/propuesta-horarios',
  })
  const { getRoleWithPermission } = useSessionStore()
  const facultyId = getRoleWithPermission(
    EnrollmentPermissionsDict.REQUEST_SCHEDULE_PROPOSAL
  )?.unitId
  const specilityId = getRoleWithPermission(
    EnrollmentPermissionsDict.MANAGE_SCHEDULE_PROPOSAL
  )?.unitId
  const { filters, setFilters } = useFilters(
    '/_auth/matricula/propuesta-horarios'
  )
  const { data: proposalsList } = useQuery({
    queryKey: [QueryKeys.enrollment.ENROLLMENT_PROPOSALS, filters],
    queryFn: () =>
      EnrollmentProposalService.getAllEnrollmentProposalsRequest({
        unitId: (facultyId ?? specilityId)!,
        ...filters,
      }),
    placeholderData: keepPreviousData,
  })

  const paginationState = {
    pageIndex: filters.pageIndex || 0,
    pageSize: filters.pageSize || 10,
  }

  const sortingState = sortByToState(filters.sortBy)
  const columns = useMemo(() => enrollmentProposalTableColumns, [])

  return (
    <DataTable
      data={proposalsList?.result ?? []}
      columns={columns}
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
        rowCount: proposalsList?.rowCount,
        pageCount: proposalsList?.totalPages,
      }}
      onRowClick={(original) =>
        navigate({
          to: '/matricula/propuesta-horarios/$requestNumber',
          params: {
            requestNumber: original.id.toString(),
          },
        })
      }
    />
  )
}
