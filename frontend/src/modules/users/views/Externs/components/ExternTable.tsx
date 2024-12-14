import { QueryKeys } from '@frontend/constants/queryKeys'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { sortByToState, stateToSortBy } from '@frontend/lib/table'
import { ExternTableColumns } from './columns'
import { useFilters } from '@frontend/hooks/useFilters'
import ExternService from '@frontend/modules/users/services/Extern.service'
import DataTable from '@frontend/components/DataTable'

export const DEFAULT_PAGE_INDEX = 0
export const DEFAULT_PAGE_SIZE = 10

export default function ExternTable() {
  const { filters, setFilters } = useFilters('/_auth/usuarios/externos')
  const { data: externs } = useQuery({
    queryKey: [QueryKeys.users.EXTERNS, filters],
    queryFn: () => ExternService.fetchExterns(filters),
    placeholderData: keepPreviousData,
  })
  const paginationState = {
    pageIndex: filters.pageIndex || DEFAULT_PAGE_INDEX,
    pageSize: filters.pageSize || DEFAULT_PAGE_SIZE,
  }
  const sortingState = sortByToState(filters.sortBy)
  const columns = useMemo(() => ExternTableColumns, [])

  return (
    <>
      <DataTable
        data={externs?.result ?? []}
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
          rowCount: externs?.rowCount,
          pageCount: externs?.totalPages,
        }}
      />
    </>
  )
}
