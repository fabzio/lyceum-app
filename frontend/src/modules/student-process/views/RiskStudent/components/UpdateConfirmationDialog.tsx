import { Button } from '@frontend/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@frontend/components/ui/dialog'
import RiskStudentService from '@frontend/modules/student-process/services/riskStudent.service'
import { useToast } from '@frontend/hooks/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { useSessionStore } from '@frontend/store'
import { StudentProcessPermissionsDict } from '@frontend/interfaces/enums/permissions/StudentProcess'

export default function UpdateConfirmationDialog() {
  const queryCliente = useQueryClient()
  const { getRoleWithPermission } = useSessionStore()
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
          'Se ha enviado la solicitud de actualización de los reportes de los estudiantes en riesgo de su especialidad',
      })
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
  })
  const handleConfirm = () => {
    mutate({
      specialityId: getRoleWithPermission(
        StudentProcessPermissionsDict.REQUEST_RISK_STUDENT_REPORT
      )!.unitId,
    })
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">Solicitar todas las actualizaciones</Button>
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
