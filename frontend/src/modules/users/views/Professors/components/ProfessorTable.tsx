import { QueryKeys } from '@/constants/queryKeys'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { sortByToState, stateToSortBy } from '@/lib/table'
import { ProfessorTableColumns } from './columns'
import { useFilters } from '@/hooks/useFilters'
import ProfessorService from '@/modules/users/services/Professor.service'
import DataTable from '@/components/DataTable'
import { useNavigate } from '@tanstack/react-router'

export const DEFAULT_PAGE_INDEX = 0
export const DEFAULT_PAGE_SIZE = 10

export default function ProfessorTable() {
  const { filters, setFilters } = useFilters('/_auth/usuarios/docentes')
  const navigate = useNavigate({
    from: '/usuarios/docentes',
  })
  const { data: professors } = useQuery({
    queryKey: [QueryKeys.users.PROFESSORS, filters],
    queryFn: () => ProfessorService.fetchProfessors(filters),
    placeholderData: keepPreviousData,
  })
  const paginationState = {
    pageIndex: filters.pageIndex || DEFAULT_PAGE_INDEX,
    pageSize: filters.pageSize || DEFAULT_PAGE_SIZE,
  }
  const sortingState = sortByToState(filters.sortBy)
  const columns = useMemo(() => ProfessorTableColumns, [])

  return (
    <>
      <DataTable
        data={professors?.result ?? []}
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
          rowCount: professors?.rowCount,
          pageCount: professors?.totalPages,
        }}
        onRowClick={(professor) =>
          navigate({
            to: '/usuarios/docentes/$code',
            params: {
              code: professor.code,
            },
            search: {
              mode: 'view',
            },
          })
        }
      />
    </>
  )
}
