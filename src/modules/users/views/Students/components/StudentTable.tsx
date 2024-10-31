import { QueryKeys } from '@/constants/queryKeys'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import DataTable from '@/components/DataTable'
import { useMemo } from 'react'
import { sortByToState, stateToSortBy } from '@/lib/table'
import StudentService from '@/modules/users/services/Student.service'
import { StudentTableColumns } from './columns'
import { useFilters } from '@/hooks/useFilters'
import { useNavigate } from '@tanstack/react-router'

export const DEFAULT_PAGE_INDEX = 0
export const DEFAULT_PAGE_SIZE = 10

export default function StudentTable() {
  const { filters, setFilters } = useFilters('/_auth/usuarios/estudiantes')
  const { data: students } = useQuery({
    queryKey: [QueryKeys.users.STUDENTS, filters],
    queryFn: () => StudentService.fetchStudents(filters),
    placeholderData: keepPreviousData,
  })
  const paginationState = {
    pageIndex: filters.pageIndex || DEFAULT_PAGE_INDEX,
    pageSize: filters.pageSize || DEFAULT_PAGE_SIZE,
  }
  const sortingState = sortByToState(filters.sortBy)
  const columns = useMemo(() => StudentTableColumns, [])
  const navigate = useNavigate({
    from: '/usuarios',
  })
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
        onRowClick={(student) =>
          navigate({
            to: '/usuarios/estudiantes/$code',
            params: { code: student.code },
            search: {
              mode: 'view',
            },
          })
        }
      />
    </>
  )
}
