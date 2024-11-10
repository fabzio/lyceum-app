import DataTable from '@frontend/components/DataTable'
import { useFilters } from '@frontend/hooks/useFilters'
import unitColumns from './columns'
import { useMemo } from 'react'
import { Unit } from '@frontend/interfaces/models/Unit'
import { sortByToState, stateToSortBy } from '@frontend/lib/table'

const DEFAULT_PAGE_INDEX = 0
const DEFAULT_PAGE_SIZE = 10

interface Props {
  unitList?: PaginatedData<Unit>
}
export default function UnitTable({ unitList }: Props) {
  const { filters, setFilters } = useFilters('/_auth/unidades')
  const paginationState = {
    pageIndex: filters.pageIndex || DEFAULT_PAGE_INDEX,
    pageSize: filters.pageSize || DEFAULT_PAGE_SIZE,
  }
  const sortingState = sortByToState(filters.sortBy)
  const columns = useMemo(() => unitColumns, [])
  return (
    <DataTable
      data={unitList?.result ?? []}
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
        rowCount: unitList?.rowCount || 0,
        pageCount: unitList?.totalPages || 0,
      }}
    />
  )
}
