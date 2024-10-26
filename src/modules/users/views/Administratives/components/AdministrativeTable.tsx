import { QueryKeys } from '@/constants/queryKeys'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { sortByToState, stateToSortBy } from '@/lib/table'
import { AdministrativeTableColumns } from './columns'
import { useFilters } from '@/hooks/useFilters'
import AdministrativeService from '@/modules/users/services/Administrative.service'
import DataTable from '@/components/DataTable'

export const DEFAULT_PAGE_INDEX = 0
export const DEFAULT_PAGE_SIZE = 10

export default function AdministrativeTable() {
  const { filters, setFilters } = useFilters('/_auth/usuarios/administrativos')
  const { data: administratives } = useQuery({
    queryKey: [QueryKeys.users.PROFESSORS, filters],
    queryFn: () => AdministrativeService.fetchAdministratives(filters),
    placeholderData: keepPreviousData,
  })
  const paginationState = {
    pageIndex: filters.pageIndex || DEFAULT_PAGE_INDEX,
    pageSize: filters.pageSize || DEFAULT_PAGE_SIZE,
  }
  const sortingState = sortByToState(filters.sortBy)
  const columns = useMemo(() => AdministrativeTableColumns, [])

  return (
    <>
      <DataTable
        data={administratives?.result ?? []}
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
          rowCount: administratives?.rowCount,
          pageCount: administratives?.totalPages,
        }}
      />
    </>
  )
}
