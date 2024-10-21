import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import StudyPlanService from '@/modules/study-plans/services/studyPlan.service'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

export default function NewStudyPlan() {
  const { toast } = useToast()
  const navigate = useNavigate({
    from: '/plan-de-estudios/gestionar',
  })
  const { mutate } = useMutation({
    mutationFn: StudyPlanService.createStudyPlan,
    onSuccess: (studyPlanId) => {
      navigate({
        to: '/plan-de-estudios/gestionar/$planId',
        params: { planId: studyPlanId.toString() },
      })
    },
    onError: ({ message }) => {
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      })
    },
  })
  const handleCreate = () => {
    mutate(3)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Nuevo plan de estudio</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Crear nuevo plan de estudio</DialogTitle>
        <DialogDescription>
          Se creará un nuevo plan de estudio en modo de boceto, ¿Desea
          continuar?
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleCreate}>Continuar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
