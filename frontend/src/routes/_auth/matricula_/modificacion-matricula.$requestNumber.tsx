import { QueryKeys } from '@/constants/queryKeys'
import { EnrollmentPermissionsDict } from '@/interfaces/enums/permissions/Enrollment'
import EnrollmentService from '@/modules/enrollment/services/enrollment.service'
import DetailEnrollment from '@/modules/enrollment/views/EnrollmentModify/DetailEnrollment'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/matricula/modificacion-matricula/$requestNumber'
)({
  beforeLoad: ({ context: { sessionStore } }) => {
    const { havePermission } = sessionStore
    if (
      !havePermission(EnrollmentPermissionsDict.REVIEW_ADDITIONAL_ENROLLMENT)
    ) {
      throw redirect({
        to: '/',
      })
    }
  },
  loader: async ({ params: { requestNumber }, context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.enrollment.ENROLLMENTS_MODIFY_DETAIL, requestNumber],
      queryFn: () =>
        EnrollmentService.getEnrollment({ requestId: +requestNumber }),
    })
  },
  component: () => <DetailEnrollment />,
})
