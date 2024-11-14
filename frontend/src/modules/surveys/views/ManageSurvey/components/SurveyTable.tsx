import DataTable from '@frontend/components/DataTable'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { useFilters } from '@frontend/hooks/useFilters'
import { SurveyPermissionsDict } from '@frontend/interfaces/enums/permissions/Survey'
import SurveyManagementService from '@frontend/modules/surveys/services/ManageSurvey.service'
import { useSessionStore } from '@frontend/store'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { surveyTableColums } from './columns'
import { sortByToState, stateToSortBy } from '@frontend/lib/table'
import { useNavigate } from '@tanstack/react-router'

const DEFAULT_PAGE_INDEX = 0
const DEFAULT_PAGE_SIZE = 10

export default function SurveyTable() {
  const navigate = useNavigate()
  const { getRoleWithPermission, havePermission } = useSessionStore()
  const { filters, setFilters } = useFilters('/_auth/encuestas/gestionar')
  const { data: surveyList } = useQuery({
    queryKey: [QueryKeys.survey.SURVEYS],
    queryFn: () =>
      SurveyManagementService.getSurveysOfSpeciality({
        unitId: getRoleWithPermission(SurveyPermissionsDict.CREATE_SURVEY)!
          .unitId,
      }),
    placeholderData: keepPreviousData,
  })
  const columns = useMemo(() => surveyTableColums, [])
  const paginationState = {
    pageIndex: filters.pageIndex || DEFAULT_PAGE_INDEX,
    pageSize: filters.pageSize || DEFAULT_PAGE_SIZE,
  }
  const sortingState = sortByToState(filters.sortBy)
  const handleRowClick = (surveyId: string) => {
    navigate({
      to: `/encuestas/gestionar/$surveyId`,
      params: { surveyId },
    })
  }
  return (
    <DataTable
      data={surveyList || []}
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
        rowCount: surveyList?.length || 0,
        pageCount: 1,
      }}
      onRowClick={
        havePermission(SurveyPermissionsDict.READ_SURVEY_RESULTS)
          ? (item) => handleRowClick(item.id.toString())
          : () => {}
      }
    />
  )
}
