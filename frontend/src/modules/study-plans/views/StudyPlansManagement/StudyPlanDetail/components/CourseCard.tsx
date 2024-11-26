import ElemCard from '@frontend/components/ElemCard'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@frontend/components/ui/context-menu'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { useToast } from '@frontend/hooks/use-toast'
import { Course } from '@frontend/interfaces/models/Course'
import StudyPlanService from '@frontend/modules/study-plans/services/studyPlan.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'

type Props = Pick<Course, 'id' | 'code' | 'name' | 'credits'>

export default function CourseCard({ id, code, name, credits }: Props) {
  const { planId } = useParams({
    from: '/_auth/plan-de-estudios/gestionar/$planId',
  })
  const { toast } = useToast()
  const querycliente = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: StudyPlanService.deleteCourseFromStudyPlan,
    onSuccess: () => {
      querycliente.invalidateQueries({
        queryKey: [QueryKeys.studyPlan.STUDY_PLAN_DETAIL, planId],
      })
    },
    onError: ({ message }) => {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: message,
      })
    },
  })

  const handleDelete = () => {
    mutate({
      courseId: id,
      studyPlanId: +planId,
    })
  }
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <ElemCard
          title={name}
          badge={code}
          description={credits.toFixed(2) + ' créditos'}
        />
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset onClick={handleDelete}>
          Eliminar
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
