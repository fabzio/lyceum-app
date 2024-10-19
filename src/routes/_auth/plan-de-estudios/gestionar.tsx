import { QueryKeys } from '@/constants/queryKeys'
import StudyPlanService from '@/modules/study-plans/services/studyPlan.service'
import StudyPlanManagement from '@/modules/study-plans/views/StudyPlansManagement'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/plan-de-estudios/gestionar')({
  loader: async ({ context: { queryClient } }) =>
    queryClient.ensureQueryData({
      queryKey: [QueryKeys.studyPlan.STUDY_PLANS],
      queryFn: StudyPlanService.fetchStudyPlans,
    }),
  component: () => <StudyPlanManagement />,
})
