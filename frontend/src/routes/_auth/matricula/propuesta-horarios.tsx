import { QueryKeys } from '@frontend/constants/queryKeys'
import EnrollmentService from '@frontend/modules/enrollment/services/enrollment.service'
import EnrollmentPropose from '@frontend/modules/enrollment/views/EnrollmentPropose'
import { EnrollmentProposalFilters } from '@frontend/modules/enrollment/views/EnrollmentPropose/interfaces/EnrollmentProposalFIlters'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/matricula/propuesta-horarios')({
  // TODO: Implementar persmisos para la propuesta de horarios
  // beforeLoad: ({ context: { sessionStore } }) => {
  //   const { getAllPermissions } = sessionStore
  //   if (
  //     !haveSomePermission(getAllPermissions(), [
  //       EnrollmentPermissionsDict.REQUEST_ADITIONAL_ENROLLMENT,
  //       EnrollmentPermissionsDict.REVIEW_ADDITIONAL_ENROLLMENT,
  //     ])
  //   ) {
  //     throw redirect({
  //       to: '/',
  //     })
  //   }
  // },
  validateSearch: () => ({}) as EnrollmentProposalFilters,
  loader: async ({ context: { queryClient } }) => {
    // TODO: Falta agarrar el faculty id de la sesion
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.enrollment.ENROLLMENT_PROPOSALS],
      //TODO: Arreglar el filtro
      queryFn: () => EnrollmentService.getEnrollmentProposals({ facultyId: 0, filters: {}}),
    })
  },
  component: () => <EnrollmentPropose />,
})
