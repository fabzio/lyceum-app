import { QueryKeys } from '@frontend/constants/queryKeys'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useMemo, useEffect, useState } from 'react'
import { sortByToState } from '@frontend/lib/table'
import { CandidatesColumns } from '../components/columnsCandidatesProcess'
import DataTable from '@frontend/components/DataTable'
import { useParams, useSearch } from '@tanstack/react-router'
import { HiringRequirement } from '@frontend/interfaces/models/HiringRequirement'
import HiringService from '@frontend/modules/hiring/Services/Hirings.service'
import { useSessionStore } from '@frontend/store'

export const DEFAULT_PAGE_INDEX = 0
export const DEFAULT_PAGE_SIZE = 10

type FirstFilterTableProps = {
  step: 'first' | 'second' | 'selected'
  courseName: string | undefined
}

export default function FirstFilterTable({ step }: FirstFilterTableProps) {
  const { hiringId } = useParams({
    from: '/_auth/contrataciones/seleccion-docentes/$hiringId',
  })
  const { courseId, courseName } = useSearch({
    from: '/_auth/contrataciones/seleccion-docentes/$hiringId',
  })

  const { havePermission } = useSessionStore()

  const [requirements, setRequirements] = useState<HiringRequirement[] | null>(
    null
  )

  useEffect(() => {
    async function fetchRequirements() {
      const fetchedRequirements = await HiringService.getRequirements(
        +hiringId,
        courseId
      )
      setRequirements(fetchedRequirements)
    }
    fetchRequirements()
  }, [hiringId, courseId])

  const { data: applicants } = useQuery({
    queryKey: [QueryKeys.hiring.HIRINGS, { hiringId, courseId }],
    queryFn: () => HiringService.getApplicants(hiringId, courseId, step),
    placeholderData: keepPreviousData,
  })

  const paginationState = {
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  }
  const sortingState = sortByToState(`${applicants}.asc`)

  const columns = useMemo(
    () => CandidatesColumns(step, courseName, requirements, havePermission),
    [step, courseName, requirements, havePermission]
  )
  return (
    <DataTable
      data={applicants ?? []}
      columns={columns}
      pagination={paginationState}
      sorting={sortingState}
      onSortingChange={() => {
        // const newSortingState =
        //   typeof updateOrValue === 'function'
        //     ? updateOrValue(sortingState)
        //     : updateOrValue
        // return setFilters({ sortBy: stateToSortBy(newSortingState) })
      }}
      paginationOptions={
        {
          // onPaginationChange: (pagination) => {
          //   setFilters(
          //     typeof pagination === 'function'
          //       ? pagination(paginationState)
          //       : pagination
          //   )
          // },
          // rowCount: proposalsList?.rowCount,
          // pageCount: proposalsList?.totalPages,
        }
      }
    />
  )
}
