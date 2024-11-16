import { toastNotAutorized } from '@frontend/constants/errorMessages'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { StudentProcessPermissionsDict } from '@frontend/interfaces/enums/permissions/StudentProcess'
import { Filters } from '@frontend/interfaces/types'
import { haveSomePermission } from '@frontend/lib/utils'
import PresentationCardService from '@frontend/modules/student-process/services/presentationCard.service'
import PresentationCardsOverview from '@frontend/modules/student-process/views/CoverLetter'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/procesos-de-estudiantes/cartas-de-presentacion/'
)({
  validateSearch: () => ({}) as Filters,
  beforeLoad: ({ context: { sessionStore, toaster } }) => {
    const { getAllPermissions } = sessionStore
    const { toast } = toaster
    if (
      !haveSomePermission(getAllPermissions(), [
        StudentProcessPermissionsDict.REVIEW_PRESENTATION_LETTER,
        StudentProcessPermissionsDict.READ_PRESENTATION_LETTER,
        StudentProcessPermissionsDict.CREATE_PRESENTATION_LETTER,
      ])
    ) {
      toast(toastNotAutorized)
      throw redirect({
        to: '/',
      })
    }
  },
  loader: async ({ context: { queryClient, sessionStore } }) => {
    const { session, getRoleWithPermission } = sessionStore
    const unitId = getRoleWithPermission(
      StudentProcessPermissionsDict.REVIEW_PRESENTATION_LETTER
    )?.unitId
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.presentationCards.PRESENTATION_LETTERS_REQUESTS],
      queryFn: unitId
        ? () =>
            PresentationCardService.getPresentationCardRequestsInUnit({
              unitId,
            })
        : () =>
            PresentationCardService.getPresentationCardRequests({
              accountCode: session!.code,
            }),
    })
  },
  component: () => <PresentationCardsOverview />,
})
