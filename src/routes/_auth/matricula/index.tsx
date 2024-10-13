import { QueryKeys } from '@/constants/queryKeys'
import EnrollmentService from '@/modules/enrollment/services/enrollment.service'
import EnrollmentModify from '@/modules/enrollment/views/EnrollmentModify'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/matricula/')({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.enrollment.ENROLLMENTS_MODIFY],
      queryFn: () => EnrollmentService.getAllEnrollments(),
    })
  },
  component: () => <EnrollmentModify />,
})
