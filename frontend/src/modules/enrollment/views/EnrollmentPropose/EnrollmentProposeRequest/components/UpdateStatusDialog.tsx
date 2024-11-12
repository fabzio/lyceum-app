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
import { useToast } from '@frontend/hooks/use-toast'
import { EnrollmentPermissionsDict } from '@frontend/interfaces/enums/permissions/Enrollment'
import EnrollmentProposalService from '@frontend/modules/enrollment/services/EnrollmentProposal.service'
import { useSessionStore } from '@frontend/store'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { Loader2, Send } from 'lucide-react'
import { useState } from 'react'

export default function UpdateStatusDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const { requestNumber } = useParams({
    from: '/_auth/matricula/propuesta-horarios/$requestNumber',
  })
  const {
    data: proposalData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [QueryKeys.enrollment.ENROLLMENT_PROPOSALS, +requestNumber],
    queryFn: () =>
      EnrollmentProposalService.getEnrollmentProposalById(+requestNumber),
  })
  const { havePermission } = useSessionStore()
  const { toast } = useToast()
  const { mutate, isPending } = useMutation({
    mutationFn: EnrollmentProposalService.updateScheduleProposalStatus,
    onSuccess: () => {
      toast({
        title: 'Propuesta actualizada',
        description: 'La propuesta se actualizó correctamente',
      })
      refetch()
      setIsOpen(false)
    },
    onError: ({ message }) => {
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      })
    },
  })
  const handleConfirm = () => {
    mutate({
      newStatus: mapNewStatus[
        proposalData?.state as keyof typeof mapNewStatus
      ] as any,
      requestId: +requestNumber,
    })
  }
  if (
    proposalData?.state === 'requested' &&
    !havePermission(EnrollmentPermissionsDict.MANAGE_SCHEDULE_PROPOSAL)
  )
    return null
  if (
    proposalData?.state === 'sended' &&
    !havePermission(EnrollmentPermissionsDict.REQUEST_SCHEDULE_PROPOSAL)
  )
    return null
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild disabled={proposalData?.state === 'aproved'}>
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Button variant="outline" className="w-full">
            <Send className="h-4" />
            {
              mapStateToLabel[
                proposalData?.state as keyof typeof mapStateToLabel
              ]
            }
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {
              mapStateToLabel[
                proposalData?.state as keyof typeof mapStateToLabel
              ]
            }
          </DialogTitle>
          <DialogDescription>
            {mapDescription[proposalData?.state as keyof typeof mapDescription]}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button disabled={isPending} onClick={handleConfirm}>
            {isPending ? <Loader2 className="animate-spin" /> : 'Aceptar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const mapStateToLabel = {
  requested: 'Enviar propuesta',
  sended: 'Aprobar propuesta',
  aproved: 'Aprobado',
}
const mapNewStatus = {
  requested: 'sended',
  sended: 'aproved',
}

const mapDescription = {
  requested:
    'Se enviará la propuesta de horarios al secretario académico para su revisión. ¿Desea continuar?',
  sended: 'Se aprobará la propuesta de horarios. ¿Desea continuar?',
}
