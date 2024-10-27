import { useMemo } from 'react'
import { riskStudentColumns } from './columns'
import DataTable from '@/components/DataTable'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@/constants/queryKeys'
import { useFilters } from '@/hooks/useFilters'
import RiskStudentService from '@/modules/courses/services/riskStudent.service'
import { sortByToState, stateToSortBy } from '@/lib/table'
import { useNavigate } from '@tanstack/react-router'
import { RiskStudentGeneral } from '@/modules/courses/interfaces/RIskStudentGeneral'

const DEFAULT_PAGE_INDEX = 0
const DEFAULT_PAGE_SIZE = 5

export default function RiskStudentTable() {
  const navigate = useNavigate({
    from: '/cursos/alumnos-riesgo',
  })
  const { filters, setFilters } = useFilters('/_auth/cursos/alumnos-riesgo')
  const { data } = useQuery({
    queryKey: [QueryKeys.courses.RISK_STUDENTS, filters],
    queryFn: () => RiskStudentService.getRiskStudents(filters),
    placeholderData: keepPreviousData,
  })
  const paginationState = {
    pageIndex: filters.pageIndex || DEFAULT_PAGE_INDEX,
    pageSize: filters.pageSize || DEFAULT_PAGE_SIZE,
  }
  const sortingState = sortByToState(filters.sortBy)

  const columns = useMemo(() => riskStudentColumns, [])
  return (
    <DataTable
      data={data?.result ?? []}
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
        rowCount: data?.result.length,
        pageCount: 1,
      }}
      onRowClick={(riskStudent: RiskStudentGeneral) =>
        navigate({
          to: '/cursos/alumnos-riesgo/$code',
          params: {
            code: riskStudent.student.code.toString(),
          },
          search: {
            scheduleId: riskStudent.schedule.id,
          },
        })
      }
    />
  )
}
