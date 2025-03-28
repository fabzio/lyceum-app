import { Button } from '@frontend/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@frontend/components/ui/dialog'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { useToast } from '@frontend/hooks/use-toast'
import { Course } from '@frontend/interfaces/models/Course'
import CourseService from '@frontend/modules/study-plans/services/course.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

interface Props {
  code: Course['code']
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}
export default function DisableConfirmationDialog({
  code,
  isOpen,
  setIsOpen,
}: Props) {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { mutate, isPending } = useMutation({
    mutationFn: CourseService.deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.studyPlan.COURSES],
      })
      toast({
        title: 'Curso deshabilitado',
        description: 'El curso ha sido deshabilitado correctamente',
      })
      setIsOpen(false)
    },
    onError: ({ message }) => {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: message,
      })
    },
  })
  const handleSubmit = () => {
    mutate(code)
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deshabilitar curso</DialogTitle>
          <DialogDescription>
            Se deshabilitará el curso, ¿Desea continuar?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? <Loader2 className="animate-spin" /> : 'Deshabilitar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
