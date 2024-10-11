import { QueryKeys } from '@/constants/queryKeys'
import EnrollmentService from '@/enrollment/services/enrollment.service'
import DetailEnrollment from '@/enrollment/views/EnrollmentModify/DetailEnrollment'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/matricula/modificacion-matricula/$requestNumber'
)({
  loader: async ({ params: { requestNumber }, context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.enrollment.ENROLLMENTS_MODIFY_DETAIL, requestNumber],
      queryFn: () =>
        EnrollmentService.getEnrollment({ requestId: +requestNumber }),
    })
  },
  component: () => <DetailEnrollment />,
})
