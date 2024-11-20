import { QueryKeys } from '@frontend/constants/queryKeys'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import DataTable from '@frontend/components/DataTable'
import { useMemo } from 'react'
import { sortByToState, stateToSortBy } from '@frontend/lib/table'
import TermTableColumns from './columns'
import { useFilters } from '@frontend/hooks/useFilters'
import UnitService from '@frontend/modules/unit/services/Unit.service'

export const DEFAULT_PAGE_INDEX = 0
export const DEFAULT_PAGE_SIZE = 10

export default function TermTable() {
  const { filters, setFilters } = useFilters('/_auth/unidades')
  const { data: terms } = useQuery({
    queryKey: [QueryKeys.unit.TERMS, filters],
    queryFn: () => UnitService.fetchTerms(filters),
    placeholderData: keepPreviousData,
  })

  const paginationState = {
    pageIndex: filters.pageIndex || DEFAULT_PAGE_INDEX,
    pageSize: filters.pageSize || DEFAULT_PAGE_SIZE,
  }
  const sortingState = sortByToState(filters.sortBy)
  const columns = useMemo(() => TermTableColumns, [])

  return (
    <DataTable
      data={terms?.result ?? []}
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
        rowCount: terms?.rowCount || 0,
        pageCount: terms?.totalPages || 0,
      }}
    />
  )
}
