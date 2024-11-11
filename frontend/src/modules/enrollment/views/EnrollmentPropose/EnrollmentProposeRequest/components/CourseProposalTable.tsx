import { QueryKeys } from '@frontend/constants/queryKeys'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import DataTable from '@frontend/components/DataTable'
import { useMemo } from 'react'
import { sortByToState, stateToSortBy } from '@frontend/lib/table'
import { useFilters } from '@frontend/hooks/useFilters'
import { CourseProposalTableColumns } from './columns'
import { useParams } from '@tanstack/react-router'
import CourseProposalService from '../../../EnrollmentDistribution/services/CourseProposal.service'
import EnrollmentProposalService from '@frontend/modules/enrollment/services/EnrollmentProposal.service'

export const DEFAULT_PAGE_INDEX = 0
export const DEFAULT_PAGE_SIZE = 10

export default function CourseProposalTable() {
  const { filters, setFilters } = useFilters(
    '/_auth/matricula/propuesta-horarios/$requestNumber'
  )
  const { requestNumber } = useParams({
    from: '/_auth/matricula/propuesta-horarios/$requestNumber',
  })
  const { data: proposalData } = useQuery({
    queryKey: [QueryKeys.enrollment.ENROLLMENT_PROPOSALS, +requestNumber],
    queryFn: () =>
      EnrollmentProposalService.getEnrollmentProposalById(+requestNumber),
  })
  const { data: students } = useQuery({
    queryKey: [QueryKeys.enrollment.COURSE_PROPOSALS, +requestNumber],
    queryFn: () =>
      CourseProposalService.fetchCourseProposals({
        requestNumber: +requestNumber,
      }),
    placeholderData: keepPreviousData,
  })
  const paginationState = {
    pageIndex: filters.pageIndex || DEFAULT_PAGE_INDEX,
    pageSize: filters.pageSize || DEFAULT_PAGE_SIZE,
  }
  const sortingState = sortByToState(filters.sortBy)
  const columns = useMemo(
    () =>
      CourseProposalTableColumns.filter((_, idx) =>
        idx === CourseProposalTableColumns.length - 1
          ? proposalData?.state !== 'aproved'
          : true
      ),
    [proposalData]
  )
  return (
    <>
      <DataTable
        data={students?.result ?? []}
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
          rowCount: students?.rowCount,
          pageCount: students?.totalPages,
        }}
      />
    </>
  )
}
