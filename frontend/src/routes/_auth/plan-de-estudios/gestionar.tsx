import { QueryKeys } from '@frontend/constants/queryKeys'
import { StudyPlanPermissionsDict } from '@frontend/interfaces/enums/permissions/StudyPlan'
import { Filters } from '@frontend/interfaces/types'
import { haveSomePermission } from '@frontend/lib/utils'
import StudyPlanService from '@frontend/modules/study-plans/services/studyPlan.service'
import StudyPlanManagement from '@frontend/modules/study-plans/views/StudyPlansManagement'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/plan-de-estudios/gestionar')({
  beforeLoad: ({ context: { sessionStore } }) => {
    const { getAllPermissions } = sessionStore
    if (
      !haveSomePermission(getAllPermissions(), [
        StudyPlanPermissionsDict.MANAGE_STUDY_PLAN,
        StudyPlanPermissionsDict.READ_STUDY_PLAN,
      ])
    ) {
      throw redirect({
        to: '/',
      })
    }
  },
  validateSearch: () => ({}) as Filters,
  loader: async ({ context: { queryClient } }) =>
    queryClient.ensureQueryData({
      queryKey: [QueryKeys.studyPlan.STUDY_PLANS],
      queryFn: () => StudyPlanService.getStudyPlans(3),
    }),
  component: () => <StudyPlanManagement />,
})
