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
import { EnrollmentPermissionsDict } from '@frontend/interfaces/enums/permissions/Enrollment'
import EnrollmentProposalService from '@frontend/modules/enrollment/services/EnrollmentProposal.service'
import { useSessionStore } from '@frontend/store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

export default function NewEnrollmentPropose() {
  const [isOpen, setIsOpen] = useState(false)
  const { session, getRoleWithPermission } = useSessionStore()
  const queryClient = useQueryClient()
  const termId = 1

  const { mutate, isPending } = useMutation({
    mutationFn: EnrollmentProposalService.newEnrollmentProposal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.enrollment.ENROLLMENT_PROPOSALS],
      }),
        toast({
          title: 'Solicitud enviada',
          description: 'Se inicio el proceso de propuesta de matricula',
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
    mutate({
      facultyId: getRoleWithPermission(
        EnrollmentPermissionsDict.REQUEST_SCHEDULE_PROPOSAL
      )!.unitId,
      accountId: session!.id,
      termId,
    })
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Solicitar propuesta</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Solicitar propuesta de matricula prelimnar</DialogTitle>
          <DialogDescription>
            Inicia el proceso de propuesta de matricula para todas las
            especialidades de la facultad
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button disabled={isPending} onClick={handleClick}>
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              'Solicitar propuesta'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
