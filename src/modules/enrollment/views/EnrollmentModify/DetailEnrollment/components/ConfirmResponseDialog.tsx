import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { QueryKeys } from '@/constants/queryKeys'
import { EnrollmentGeneral } from '@/modules/enrollment/interfaces/EnrollmentGeneral'
import EnrollmentService from '@/modules/enrollment/services/enrollment.service'
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
    from: '/matricula/modificacion-matricula/$requestNumber',
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
          <Button>Aprovar</Button>
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
