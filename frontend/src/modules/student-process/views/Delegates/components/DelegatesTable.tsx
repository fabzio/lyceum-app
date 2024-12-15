import { QueryKeys } from '@frontend/constants/queryKeys'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import DataTable from '@frontend/components/DataTable'
import { useMemo } from 'react'
import { sortByToState, stateToSortBy } from '@frontend/lib/table'
import { StudentTableColumns } from './columns'
import { useFilters } from '@frontend/hooks/useFilters'
import DelegatesService from '@frontend/modules/student-process/services/delegates.service'

export const DEFAULT_PAGE_INDEX = 0
export const DEFAULT_PAGE_SIZE = 10

export default function DelegatesTable({
  specialityId,
  idTerm,
}: {
  specialityId: string
  idTerm: string
}) {
  const { filters, setFilters } = useFilters(
    '/_auth/procesos-de-estudiantes/delegados'
  )
  const { data: delegates } = useQuery({
    queryKey: [QueryKeys.delegates.DELEGATES_LIST, filters],
    queryFn: () =>
      DelegatesService.fetchDelegates(filters, specialityId, idTerm),
    placeholderData: keepPreviousData,
  })
  const paginationState = {
    pageIndex: filters.pageIndex || DEFAULT_PAGE_INDEX,
    pageSize: filters.pageSize || DEFAULT_PAGE_SIZE,
  }
  const sortingState = sortByToState(filters.sortBy)
  const columns = useMemo(() => StudentTableColumns, [])
  return (
    <>
      <DataTable
        data={delegates?.result ?? []}
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
          rowCount: delegates?.rowCount,
          pageCount: delegates?.totalPages,
        }}
      />
    </>
  )
}
