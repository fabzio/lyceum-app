import { QueryKeys } from '@frontend/constants/queryKeys'
import { useFilters } from '@frontend/hooks/useFilters'
import { StudentProcessPermissionsDict } from '@frontend/interfaces/enums/permissions/StudentProcess'
import PresentationCardService from '@frontend/modules/student-process/services/presentationCard.service'
import { useSessionStore } from '@frontend/store'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { CoverLetterColumns } from './columns'
import DataTable from '@frontend/components/DataTable'
import { sortByToState, stateToSortBy } from '@frontend/lib/table'
import { useNavigate } from '@tanstack/react-router'

const DEFAULT_PAGE_INDEX = 0
const DEFAULT_PAGE_SIZE = 10

export default function CoverLetterTable() {
  const { session, getRoleWithPermission, havePermission } = useSessionStore()
  const navigate = useNavigate({
    from: '/procesos-de-estudiantes/cartas-de-presentacion',
  })
  const accountId = session!.id
  console.log('accountId', accountId)
  const unitId = getRoleWithPermission(
    StudentProcessPermissionsDict.REVIEW_PRESENTATION_LETTER
  )?.unitId
  const { filters, setFilters } = useFilters(
    '/_auth/procesos-de-estudiantes/cartas-de-presentacion/'
  )
  const { data: presentationCardRequests } = useQuery({
    queryKey: [QueryKeys.presentationCards.PRESENTATION_LETTERS_REQUESTS],
    queryFn: unitId
      ? () =>
          PresentationCardService.getPresentationCardRequestsInUnit({
            unitId,
          })
      : () =>
          PresentationCardService.getPresentationCardRequests({
            accountId,
          }),
    placeholderData: keepPreviousData,
  })
  const paginationState = {
    pageIndex: filters.pageIndex || DEFAULT_PAGE_INDEX,
    pageSize: filters.pageSize || DEFAULT_PAGE_SIZE,
  }
  const sortingState = sortByToState(filters.sortBy)
  const columns = useMemo(() => CoverLetterColumns, [])
  const handleRowClick = (requestCode: string) => {
    navigate({
      to: '/procesos-de-estudiantes/cartas-de-presentacion/$requestCode',
      params: { requestCode },
    })
  }
  return (
    <DataTable
      data={presentationCardRequests || []}
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
        rowCount: presentationCardRequests?.length,
        pageCount: 1,
      }}
      onRowClick={
        havePermission(StudentProcessPermissionsDict.REVIEW_PRESENTATION_LETTER)
          ? (letter) => handleRowClick(letter.id.toString())
          : () => {}
      }
    />
  )
}
