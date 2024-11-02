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
import { EnrollmentGeneral } from '@frontend/modules/enrollment/interfaces/EnrollmentGeneral'
import EnrollmentService from '@frontend/modules/enrollment/services/enrollment.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

interface Props {
  response: EnrollmentGeneral['state']
}
export default function ConfirmResponseDialog({ response }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { requestNumber } = useParams({
    from: '/_auth/matricula/modificacion-matricula/$requestNumber',
  })
  const { mutate, isPending } = useMutation({
    mutationFn: EnrollmentService.updateEnrollment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          QueryKeys.enrollment.ENROLLMENTS_MODIFY_DETAIL,
          requestNumber,
        ],
      })
      setIsOpen(false)
    },
  })
  const handleConfirm = async () => {
    mutate({
      requestNumber: +requestNumber,
      state: response,
    })
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {response === 'approved' ? (
          <Button>Aprobar</Button>
        ) : (
          <Button variant="secondary">Rechazar</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {response === 'approved'
              ? 'Aprobar Solicitud'
              : 'Rechazar Solicitud'}
          </DialogTitle>
          <DialogDescription>
            {response === 'approved'
              ? '¿Estás seguro que deseas aprobar esta solicitud?'
              : '¿Estás seguro que deseas rechazar esta solicitud?'}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant="destructive" disabled={isPending}>
              Cancelar
            </Button>
          </DialogClose>
          <Button onClick={handleConfirm} disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : 'Confirmar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
