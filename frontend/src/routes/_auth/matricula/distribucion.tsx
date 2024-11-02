import { QueryKeys } from '@frontend/constants/queryKeys'
import EnrollmentDistribution from '@frontend/modules/enrollment/views/EnrollmentDistribution'
import { CourseProposalFilters } from '@frontend/modules/enrollment/views/EnrollmentDistribution/interfaces/CourseProposalFilters'
import CourseProposalService from '@frontend/modules/enrollment/views/EnrollmentDistribution/services/CourseProposal.service'
import { createFileRoute } from '@tanstack/react-router'
// import { StudentsFilters } from '@frontend/modules/users/views/Students/interfaces/CourseFIlters'
// import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/matricula/distribucion')({
  // TODO: Implementar permisos
  // beforeLoad: ({ context: { sessionStore } }) => {
  //   // const { getAllPermissions } = sessionStore
  //   // if (
  //   //   !haveSomePermission(getAllPermissions(), [
  //   //     UserPermissionsDict.READ_STUDENTS,
  //   //     UserPermissionsDict.WRITE_STUDENTS,
  //   //   ])
  //   // ) {
  //   //   throw redirect({
  //   //     to: '/',
  //   //   })
  //   // }
  // },
  validateSearch: () => ({}) as CourseProposalFilters,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.enrollment.COURSE_PROPOSALS, {}],
      queryFn: () => CourseProposalService.fetchCourseProposals({}),
    })
  },
  component: () => <EnrollmentDistribution />,
})
