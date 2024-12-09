import { QueryKeys } from '@frontend/constants/queryKeys'
import StudyPlanService from '@frontend/modules/study-plans/services/studyPlan.service'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import DroppableLevel from './components/DroppableLevel'
import { Loader2 } from 'lucide-react'
import groupBy from 'just-group-by'

export default function StudyPlanCourses() {
  const { planId } = useParams({
    from: '/_auth/plan-de-estudios/gestionar/$planId',
  })
  const { data: studyPlan } = useSuspenseQuery({
    queryKey: [QueryKeys.studyPlan.STUDY_PLAN_DETAIL, planId],
    queryFn: () => StudyPlanService.getStudyPlanDetail(+planId),
  })
  const { data: studyPlanCourses, isLoading } = useQuery({
    queryKey: [QueryKeys.studyPlan.STUDY_PLAN_COURSES],
    queryFn: () => StudyPlanService.getStudyPlanCourses(+planId),
  })

  if (isLoading) {
    return (
      <div className="w-full flex justify-center">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  const gropedCoursesByLevel = groupBy(
    studyPlanCourses!,
    (course) => course.level
  )

  return (
    <div>
      {Array.from({ length: studyPlan.levelsCount }).map((_, i) => (
        <DroppableLevel
          key={i}
          courses={gropedCoursesByLevel[i + studyPlan.startLevel]?.map(
            (studyPlanCourse) => studyPlanCourse.course
          )}
          level={i + studyPlan.startLevel}
        />
      ))}
      <DroppableLevel
        key={-1}
        courses={gropedCoursesByLevel[-1]?.map(
          (studyPlanCourse) => studyPlanCourse.course
        )}
        level={-1}
      />
    </div>
  )
}
