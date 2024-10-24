import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { QueryKeys } from '@/constants/queryKeys'
import StudyPlanService from '@/modules/study-plans/services/studyPlan.service'
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
    queryKey: [QueryKeys.studyPlan.STUDY_PLAN_DETAIL],
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
      <Tabs defaultValue="1">
        <TabsList className="mb-4">
          <TabsTrigger value="1">Obligatorios</TabsTrigger>
          <TabsTrigger value="0">Electivos</TabsTrigger>
        </TabsList>
        <TabsContent value="1">
          {Array.from({ length: studyPlan.levelsCount }).map((_, i) => (
            <DroppableLevel
              key={i}
              courses={
                gropedCoursesByLevel[i + studyPlan.startLevel]?.map(
                  (studyPlanCourse) => studyPlanCourse.course
                ) 
              }
              level={i + studyPlan.startLevel}
            />
          ))}
        </TabsContent>
        <TabsContent value="0">
          <div className="border rounded-lg p-4">
            <div className="flex items-center p-2 gap-2">
              <h3 className="text-lg font-semibold mb-4">Cursos Electivos</h3>
              <br></br>
              <Button variant="default" className="mb-3">
                Agregar Curso
              </Button>
            </div>
            <div className="overflow-y-auto max-h-[600px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"></div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
