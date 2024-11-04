import { QueryKeys } from '@frontend/constants/queryKeys'
import { EnrollmentPermissionsDict } from '@frontend/interfaces/enums/permissions/Enrollment'
import { haveSomePermission } from '@frontend/lib/utils'
import EnrollmentService from '@frontend/modules/enrollment/services/enrollment.service'
import EnrollmentModify from '@frontend/modules/enrollment/views/EnrollmentModify'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { EnrollmentFilters } from '@frontend/modules/enrollment/interfaces/EnrollmentFilters'
//import { useSessionStore } from '@frontend/store'

export const Route = createFileRoute('/_auth/matricula/modificacion-matricula')(
  {
    beforeLoad: ({ context: { sessionStore } }) => {
      const { getAllPermissions } = sessionStore
      if (
        !haveSomePermission(getAllPermissions(), [
          EnrollmentPermissionsDict.REQUEST_ADITIONAL_ENROLLMENT,
          EnrollmentPermissionsDict.REVIEW_ADDITIONAL_ENROLLMENT_ALL,
          EnrollmentPermissionsDict.REVIEW_ADDITIONAL_ENROLLMENT_MYSELF,
        ])
      ) {
        throw redirect({
          to: '/',
        })
      }
    },
    loader: async ({ context: { queryClient, sessionStore } }) => {
      const { havePermission, session } = sessionStore
      const canViewAll = havePermission(
        EnrollmentPermissionsDict.REVIEW_ADDITIONAL_ENROLLMENT_ALL
      )

      return queryClient.ensureQueryData({
        queryKey: [QueryKeys.enrollment.ENROLLMENTS_MODIFY, {}],
        queryFn: () => {
          return canViewAll
            ? EnrollmentService.getAllEnrollments({})
            : EnrollmentService.getEnrollmentsById({ userId: session!.id })
        },
      })
    },
    validateSearch: () => ({}) as EnrollmentFilters,
    component: () => <EnrollmentModify />,
  }
)
