import { QueryKeys } from '@/constants/queryKeys'
import { EnrollmentPermissionsDict } from '@/interfaces/enums/permissions/Enrollment'
import { haveSomePermission } from '@/lib/utils'
import EnrollmentService from '@/modules/enrollment/services/enrollment.service'
import EnrollmentModify from '@/modules/enrollment/views/EnrollmentModify'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/matricula/modificacion-matricula')(
  {
    beforeLoad: ({ context: { sessionStore } }) => {
      const { getAllPermissions } = sessionStore
      if (
        !haveSomePermission(getAllPermissions(), [
          EnrollmentPermissionsDict.REQUEST_ADITIONAL_ENROLLMENT,
          EnrollmentPermissionsDict.REVIEW_ADDITIONAL_ENROLLMENT,
        ])
      ) {
        throw redirect({
          to: '/',
        })
      }
    },
    loader: async ({ context: { queryClient } }) => {
      return queryClient.ensureQueryData({
        queryKey: [QueryKeys.enrollment.ENROLLMENTS_MODIFY],
        queryFn: () => EnrollmentService.getAllEnrollments(),
      })
    },
    component: () => <EnrollmentModify />,
  }
)
