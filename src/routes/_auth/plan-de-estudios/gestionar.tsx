import { QueryKeys } from '@/constants/queryKeys'
import { Filters } from '@/interfaces/types'
import StudyPlanService from '@/modules/study-plans/services/studyPlan.service'
import StudyPlanManagement from '@/modules/study-plans/views/StudyPlansManagement'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/plan-de-estudios/gestionar')({
  validateSearch: () => ({}) as Filters,
  loader: async ({ context: { queryClient } }) =>
    queryClient.ensureQueryData({
      queryKey: [QueryKeys.studyPlan.STUDY_PLANS],
      queryFn: () => StudyPlanService.getStudyPlans(3),
    }),
  component: () => <StudyPlanManagement />,
})
