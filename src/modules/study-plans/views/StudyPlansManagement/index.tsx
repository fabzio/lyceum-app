import StudyPlanTable from '@/modules/study-plans/components/StudyPlanTable'
import StudyPlanService from '@/modules/study-plans/services/studyPlan.service'
import { useSuspenseQuery } from '@tanstack/react-query'
import { QueryKeys } from '@/constants/queryKeys'

//TODO Sería mejor cargar el plan de estudios vigente por defecto
export default function StudyPlanManagement() {
  const { data: studyPlans } = useSuspenseQuery({
    queryKey: [QueryKeys.studyPlan.STUDY_PLANS],
    queryFn: StudyPlanService.fetchStudyPlans,
  })

  return (
    <div className="p-6">
      <StudyPlanTable studyPlans={studyPlans} />
    </div>
  )
}
