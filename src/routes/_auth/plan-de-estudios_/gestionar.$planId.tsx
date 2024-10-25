import { QueryKeys } from '@/constants/queryKeys'
import { CourseFilters } from '@/modules/study-plans/interfaces/CourseFIlters'
import StudyPlanService from '@/modules/study-plans/services/studyPlan.service'
import StudyPlanDetail from '@/modules/study-plans/views/StudyPlansManagement/StudyPlanDetail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/plan-de-estudios/gestionar/$planId'
)({
  validateSearch: () => ({}) as CourseFilters,
  loader: async ({ params: { planId }, context: { queryClient } }) =>
    queryClient.ensureQueryData({
      queryKey: [QueryKeys.studyPlan.STUDY_PLANS],
      queryFn: () => StudyPlanService.getStudyPlanDetail(+planId),
    }),
  component: () => <StudyPlanDetail />,
})
