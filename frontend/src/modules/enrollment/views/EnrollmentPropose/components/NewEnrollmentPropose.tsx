import { Button } from '@frontend/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@frontend/components/ui/dialog'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { toast } from '@frontend/hooks/use-toast'
import EnrollmentService from '@frontend/modules/enrollment/services/enrollment.service'
import { useSessionStore } from '@frontend/store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
export default function NewEnrollmentPropose() {
  const [isOpen, setIsOpen] = useState(false)
  const { session } = useSessionStore()
  const queryClient = useQueryClient()
  //TODO: como manejar el caso de que accountId sea null
  //TODO: le puse "GOG GOG GOG GOG" como valor por defecto, pero no se si es correcto
  const accountId = session?.id ?? 'GOG GOG GOG GOG'
  // TODO: Implementar servicio para obtener el facultyId dado el accountId
  // TODO: Implementar el servicio para obtener el termId
  const facultyId = 2
  const termId = 2

  const { mutate } = useMutation({
    mutationFn: EnrollmentService.newEnrollmentProposal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.enrollment.ENROLLMENT_PROPOSALS],
      }),
        toast({
          title: 'Solicitud enviada',
          description: 'Se inicio el proceso de propuesta de matricula',
          variant: 'default',
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
  const handleClick = () => {
    mutate({ facultyId, accountId, termId })
    setIsOpen(false)
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Solicitar propuesta</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Solicitar propuesta de matricula</DialogTitle>
          <DialogDescription>
            Inicia el proceso de propuesta de matricula para todas las
            especialidades. Se solicita confirmación para comenzar la solicitud
            propuesta de matricula.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleClick}>Solicitar propuesta</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
