import { QueryKeys } from '@/constants/queryKeys'
import { CourseFilters } from '@/modules/study-plans/interfaces/CourseFilters'
import CourseService from '@/modules/study-plans/services/course.service'
import CourseManagement from '@/modules/study-plans/views/CoursesManagment'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/plan-de-estudios/')({
  validateSearch: () => ({}) as CourseFilters,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.studyPlan.COURSES],
      queryFn: CourseService.fetchCourses,
    })
  },
  component: () => <CourseManagement />,
})
