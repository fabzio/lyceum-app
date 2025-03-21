import { QueryKeys } from '@frontend/constants/queryKeys'
import { useFilters } from '@frontend/hooks/useFilters'
import CourseService from '@frontend/modules/study-plans/services/course.service'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { courseTableColumns } from './columns'
import DataTable from '@frontend/components/DataTable'
import { useMemo } from 'react'
import { sortByToState, stateToSortBy } from '@frontend/lib/table'
import { useSessionStore } from '@frontend/store'
import { StudyPlanPermissionsDict } from '@frontend/interfaces/enums/permissions/StudyPlan'

export const DEFAULT_PAGE_INDEX = 0
export const DEFAULT_PAGE_SIZE = 10

export default function CourseTable() {
  const { filters, setFilters } = useFilters('/_auth/plan-de-estudios/cursos')
  const { havePermission } = useSessionStore()
  const { data: courses } = useQuery({
    queryKey: [QueryKeys.studyPlan.COURSES, filters],
    queryFn: () => CourseService.fetchCourses(filters),
    placeholderData: keepPreviousData,
  })
  const paginationState = {
    pageIndex: filters.pageIndex || DEFAULT_PAGE_INDEX,
    pageSize: filters.pageSize || DEFAULT_PAGE_SIZE,
  }
  const sortingState = sortByToState(filters.sortBy)
  const columns = useMemo(
    () =>
      courseTableColumns.filter((_, idx) =>
        idx === courseTableColumns.length - 1
          ? havePermission(StudyPlanPermissionsDict.MANAGE_COURSES)
          : true
      ),
    [havePermission]
  )
  return (
    <>
      <DataTable
        data={courses?.result ?? []}
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
          rowCount: courses?.rowCount,
          pageCount: courses?.totalPages,
        }}
      />
    </>
  )
}
