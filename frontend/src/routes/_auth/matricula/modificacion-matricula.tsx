import { QueryKeys } from '@frontend/constants/queryKeys'
import { EnrollmentPermissionsDict } from '@frontend/interfaces/enums/permissions/Enrollment'
import { haveSomePermission } from '@frontend/lib/utils'
import EnrollmentService from '@frontend/modules/enrollment/services/enrollment.service'
import EnrollmentModify from '@frontend/modules/enrollment/views/EnrollmentModify'
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
