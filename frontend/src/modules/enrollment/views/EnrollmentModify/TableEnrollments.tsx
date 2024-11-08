import { useNavigate } from '@tanstack/react-router'
import { useFilters } from '@frontend/hooks/useFilters'
import DataTable from '@frontend/components/DataTable'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@frontend/constants/queryKeys'
import EnrollmentService from '../../services/enrollment.service'
import { EnrollmentTableColumns } from './columns'
import { sortByToState, stateToSortBy } from '@frontend/lib/table'
import { useMemo } from 'react'
import { useSessionStore } from '@frontend/store'
import { EnrollmentPermissionsDict } from '@frontend/interfaces/enums/permissions/Enrollment'

export const DEFAULT_PAGE_INDEX = 0
export const DEFAULT_PAGE_SIZE = 10

export default function TableEnrollments() {
  const { session, havePermission, getRoleWithPermission } = useSessionStore()
  const { filters, setFilters } = useFilters(
    '/_auth/matricula/modificacion-matricula'
  )
  const { data: enrollments } = useQuery({
    queryKey: [QueryKeys.enrollment.ENROLLMENTS_MODIFY, filters],
    queryFn: havePermission(
      EnrollmentPermissionsDict.REVIEW_ADDITIONAL_ENROLLMENT
    )
      ? () =>
          EnrollmentService.getAllEnrollmentsOfFaculty({
            facultyId: getRoleWithPermission(
              EnrollmentPermissionsDict.REVIEW_ADDITIONAL_ENROLLMENT
            )!.unitId,
            filtersAndPagination: filters,
          })
      : () =>
          EnrollmentService.getStudentEnrollments({
            studentId: session!.id,
            filters,
          }),
    placeholderData: keepPreviousData,
  })
  const navigate = useNavigate({
    from: '/matricula/modificacion-matricula',
  })

  const paginationState = {
    pageIndex: filters.pageIndex || DEFAULT_PAGE_INDEX,
    pageSize: filters.pageSize || DEFAULT_PAGE_SIZE,
  }

  const sortingState = sortByToState(filters.sortBy)
  const columns = useMemo(() => EnrollmentTableColumns, [])

  return (
    <>
      <DataTable
        data={enrollments?.result ?? []}
        columns={columns}
        pagination={paginationState}
        sorting={sortingState}
        onSortingChange={(updateOrValue) => {
          const newSortingState =
            typeof updateOrValue === 'function'
              ? updateOrValue(sortingState)
              : updateOrValue
          setFilters({ sortBy: stateToSortBy(newSortingState) })
        }}
        paginationOptions={{
          onPaginationChange: (pagination) => {
            setFilters(
              typeof pagination === 'function'
                ? pagination(paginationState)
                : pagination
            )
          },
          rowCount: enrollments?.rowCount,
          pageCount: enrollments?.totalPages,
        }}
        onRowClick={
          havePermission(EnrollmentPermissionsDict.REVIEW_ADDITIONAL_ENROLLMENT)
            ? (enrollment) =>
                navigate({
                  to: '/matricula/modificacion-matricula/$requestNumber',
                  params: {
                    requestNumber: enrollment.requestNumber.toString(),
                  },
                  search: {
                    mode: 'view',
                  },
                })
            : () => {}
        }
      />
    </>
  )
}
