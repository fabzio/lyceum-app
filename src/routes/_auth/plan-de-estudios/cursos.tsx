import { QueryKeys } from '@/constants/queryKeys'
import { StudyPlanPermissionsDict } from '@/interfaces/enums/permissions/StudyPlan'
import { haveSomePermission } from '@/lib/utils'
import { CourseFilters } from '@/modules/study-plans/interfaces/CourseFIlters'
import CourseService from '@/modules/study-plans/services/course.service'
import CourseManagement from '@/modules/study-plans/views/CoursesManagment'
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
