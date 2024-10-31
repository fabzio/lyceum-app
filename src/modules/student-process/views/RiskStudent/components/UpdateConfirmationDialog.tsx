import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import RiskStudentService from '@/modules/student-process/services/riskStudent.service'
import { useToast } from '@/hooks/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { QueryKeys } from '@/constants/queryKeys'

export default function UpdateConfirmationDialog() {
  const queryCliente = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()
  const { mutate, isPending } = useMutation({
    mutationFn: RiskStudentService.updateRiskStudentReport,
    onSuccess: () => {
      queryCliente.invalidateQueries({
        queryKey: [QueryKeys.courses.RISK_STUDENTS, {}],
      })
      setIsOpen(false)
      toast({
        title: 'Solicitud enviada',
        description:
          'Se ha enviado la solicitud de actualización a todos los docentes',
      })
    },
  })
  const handleConfirm = () => {
    mutate()
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Solicitar todas las actualizaciones</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Solicitar actualizacion de reporte a todos los docentes
          </DialogTitle>
          <DialogDescription>
            ¿Estás seguro que deseas solicitar la actualización de estado de
            todos los estudiantes en riesgo?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary">Cancelar</Button>
          <Button disabled={isPending} onClick={handleConfirm}>
            {isPending ? <Loader2 className="animate-spin" /> : 'Solicitar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
