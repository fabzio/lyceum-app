import { QueryKeys } from '@/constants/queryKeys'
import { StudyPlanPermissionsDict } from '@/interfaces/enums/permissions/StudyPlan'
import { haveSomePermission } from '@/lib/utils'
import { CourseFilters } from '@/modules/study-plans/interfaces/CourseFIlters'
import StudyPlanService from '@/modules/study-plans/services/studyPlan.service'
import StudyPlanDetail from '@/modules/study-plans/views/StudyPlansManagement/StudyPlanDetail'
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
      queryKey: [QueryKeys.studyPlan.STUDY_PLANS],
      queryFn: () => StudyPlanService.getStudyPlanDetail(+planId),
    }),
  component: () => <StudyPlanDetail />,
})
