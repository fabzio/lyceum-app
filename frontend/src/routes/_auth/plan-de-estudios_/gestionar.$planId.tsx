import { QueryKeys } from '@frontend/constants/queryKeys'
import { StudyPlanPermissionsDict } from '@frontend/interfaces/enums/permissions/StudyPlan'
import { haveSomePermission } from '@frontend/lib/utils'
import { CourseFilters } from '@frontend/modules/study-plans/interfaces/CourseFIlters'
import StudyPlanService from '@frontend/modules/study-plans/services/studyPlan.service'
import StudyPlanDetail from '@frontend/modules/study-plans/views/StudyPlansManagement/StudyPlanDetail'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/plan-de-estudios/gestionar/$planId'
)({
  beforeLoad: ({ context: { sessionStore } }) => {
    const { getAllPermissions } = sessionStore
    if (
      !haveSomePermission(getAllPermissions(), [
        StudyPlanPermissionsDict.MANAGE_STUDY_PLAN,
      ])
    ) {
      throw redirect({
        to: '/',
      })
    }
  },
  validateSearch: () => ({}) as CourseFilters,
  loader: async ({ params: { planId }, context: { queryClient } }) =>
    queryClient.ensureQueryData({
      queryKey: [QueryKeys.studyPlan.STUDY_PLANS, planId],
      queryFn: () => StudyPlanService.getStudyPlanDetail(+planId),
    }),
  component: () => <StudyPlanDetail />,
})
