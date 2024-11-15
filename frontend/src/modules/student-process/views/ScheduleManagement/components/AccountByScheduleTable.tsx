import { QueryKeys } from '@frontend/constants/queryKeys'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import DataTable from '@frontend/components/DataTable'
import { useMemo } from 'react'
import { sortByToState, stateToSortBy } from '@frontend/lib/table'
import AccountsService from '@frontend/service/Accounts.service'
import { AccountTableColumns } from './columns' // Definir columnas de la tabla para las cuentas
import { useFilters } from '@frontend/hooks/useFilters'
import NewAssignmentDialog from './NewAssignmentDialog'
import Need from '@frontend/components/Need'
import { StudentProcessPermissionsDict } from '@frontend/interfaces/enums/permissions/StudentProcess'

//import { useNavigate } from '@tanstack/react-router';

export const DEFAULT_PAGE_INDEX = 0
export const DEFAULT_PAGE_SIZE = 10

type AccountTableProps = {
  scheduleId: number
}

export default function AccountTable({ scheduleId }: AccountTableProps) {
  const { filters, setFilters } = useFilters('/_auth/cursos/horarios')

  const { data: accounts, isLoading } = useQuery({
    queryKey: [QueryKeys.users.GENERIC, scheduleId, filters],
    queryFn: () => AccountsService.fetchAccountsBySchedule(filters, scheduleId),
    placeholderData: keepPreviousData,
    enabled: !!scheduleId, // Solo ejecuta la query si hay un scheduleId válido
  })

  const paginationState = {
    pageIndex: filters.pageIndex || DEFAULT_PAGE_INDEX,
    pageSize: filters.pageSize || DEFAULT_PAGE_SIZE,
  }

  const sortingState = sortByToState(filters.sortBy)
  const columns = useMemo(() => AccountTableColumns, [])
  //const navigate = useNavigate({ from: '/usuarios' });

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Lista de Usuarios</h2>
        <Need permissions={StudentProcessPermissionsDict.MANAGE_JP}>
          <NewAssignmentDialog scheduleId={scheduleId} />
        </Need>
      </div>
      <DataTable
        data={accounts?.result ?? []}
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
          rowCount: accounts?.rowCount,
          pageCount: accounts?.totalPages,
        }}
        onRowClick={() => {}}
      />
      {isLoading && <p className="text-center">Cargando cuentas...</p>}
    </>
  )
}
