import { QueryKeys } from '@frontend/constants/queryKeys'
import { StudyPlanPermissionsDict } from '@frontend/interfaces/enums/permissions/StudyPlan'
import { haveSomePermission } from '@frontend/lib/utils'
import { CourseFilters } from '@frontend/modules/study-plans/interfaces/CourseFIlters'
import CourseService from '@frontend/modules/study-plans/services/course.service'
import CourseManagement from '@frontend/modules/study-plans/views/CoursesManagment'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/plan-de-estudios/cursos')({
  beforeLoad: ({ context: { sessionStore } }) => {
    const { getAllPermissions } = sessionStore
    if (
      !haveSomePermission(getAllPermissions(), [
        StudyPlanPermissionsDict.READ_COURSES,
        StudyPlanPermissionsDict.MANAGE_COURSES,
      ])
    ) {
      throw redirect({
        to: '/',
      })
    }
  },
  validateSearch: () => ({}) as CourseFilters,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.studyPlan.COURSES, {}],
      queryFn: () => CourseService.fetchCourses({}),
    })
  },
  component: () => <CourseManagement />,
})
