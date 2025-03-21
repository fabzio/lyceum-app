import { useMemo } from 'react'
import { riskStudentColumns } from './columns'
import DataTable from '@frontend/components/DataTable'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { useFilters } from '@frontend/hooks/useFilters'
import RiskStudentService from '@frontend/modules/student-process/services/riskStudent.service'
import { sortByToState, stateToSortBy } from '@frontend/lib/table'
import { useNavigate } from '@tanstack/react-router'
import { RiskStudentGeneral } from '@frontend/modules/student-process/interfaces/RIskStudentGeneral'
import { useSessionStore } from '@frontend/store'
import { StudentProcessPermissionsDict } from '@frontend/interfaces/enums/permissions/StudentProcess'

const DEFAULT_PAGE_INDEX = 0
const DEFAULT_PAGE_SIZE = 5

export default function RiskStudentTable() {
  const navigate = useNavigate({
    from: '/procesos-de-estudiantes/alumnos-riesgo',
  })
  const { session, getRoleWithPermission } = useSessionStore()
  const role = getRoleWithPermission(
    StudentProcessPermissionsDict.LOAD_RISK_STUDENTS
  )
  const { filters, setFilters } = useFilters(
    '/_auth/procesos-de-estudiantes/alumnos-riesgo'
  )
  const { data } = useQuery({
    queryKey: [QueryKeys.courses.RISK_STUDENTS, filters],
    queryFn: role?.unitId
      ? () =>
          RiskStudentService.getRiskStudentsOfSpeciality({
            ...filters,
            specialityId: role.unitId,
          })
      : () =>
          RiskStudentService.getRiskStudentsOfProfessor({
            ...filters,
            professorId: session!.id,
          }),
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
          to: '/procesos-de-estudiantes/alumnos-riesgo/$code',
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
