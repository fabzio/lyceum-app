import { QueryKeys } from '@/constants/queryKeys'
import EnrollmentService from '@/enrollment/services/enrollment.service'
import EnrollmentModify from '@/enrollment/views/EnrollmentModify'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/matricula/')({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.enrollment.ENROLLMENTS_MODIFY],
      queryFn: () => EnrollmentService.getAllEnrollments(),
    })
  },
  component: () => <EnrollmentModify />,
})
