import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Course } from '@frontend/interfaces/models/Course'
import StudyPlanService from '@frontend/modules/study-plans/services/studyPlan.service'
import { QueryKeys } from '@frontend/constants/queryKeys'
import useQueryStore from '@frontend/hooks/useQueryStore'
import { useToast } from '@frontend/hooks/use-toast'
import { useParams } from '@tanstack/react-router'
import { DragEndEvent } from '@dnd-kit/core'

export const useStudyPlan = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { data, setQueryStore } = useQueryStore<
    { course: Course; level: number }[]
  >(QueryKeys.studyPlan.STUDY_PLAN_COURSES)
  const { planId } = useParams({
    from: '/_auth/plan-de-estudios/gestionar/$planId',
  })
  const [course, setCourse] = useState<Course | null>(null)

  const { mutate: createMutation } = useMutation({
    mutationFn: StudyPlanService.addCourseToStudyPlan,
    onMutate: ({ level }) => {
      const previousCourses = data
      setQueryStore((curr) => [...curr, { course: course!, level }])
      return { previousCourses }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.studyPlan.STUDY_PLAN_COURSES],
      }),
    onError: ({ message }, _, context) => {
      if (context?.previousCourses) setQueryStore(() => context.previousCourses)
      toast({ variant: 'destructive', title: 'Error', description: message })
    },
  })

  const { mutate: updateMutation } = useMutation({
    mutationFn: StudyPlanService.editCourseStudyPlan,
    onMutate: ({ level }) => {
      const previousCourses = data
      setQueryStore((curr) =>
        curr.map((item) =>
          item.course.code === course?.code ? { course: course!, level } : item
        )
      )
      return { previousCourses }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.studyPlan.STUDY_PLAN_COURSES],
      }),
  })

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    const [origin, courseId] = active?.id?.toString().split('.') || []
    const [overId, level] = over?.id?.toString().split('.') || []
    if (overId === 'study-plan-courses' && courseId && level) {
      if (origin === 'study-plan') {
        updateMutation({
          studyPlanId: Number(planId),
          courseId: Number(courseId),
          level: Number(level),
        })
      } else if (origin === 'courses') {
        createMutation({
          studyPlanId: Number(planId),
          courseId: Number(courseId),
          level: Number(level),
        })
      }
    }
  }

  return { course, setCourse, handleDragEnd }
}
