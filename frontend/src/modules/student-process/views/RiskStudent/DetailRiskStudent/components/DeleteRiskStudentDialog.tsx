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

import { useState } from 'react'

interface DeleteRiskStudentDialogProps {
  studentCode: string
  scheduleId: string
  onDelete: (studentCode: string, scheduleId: string) => Promise<void>
}

export default function DeleteRiskStudentDialog({
  studentCode,
  scheduleId,
  onDelete,
}: DeleteRiskStudentDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const handleDelete = async () => {
    try {
      await onDelete(studentCode, scheduleId)
      setIsOpen(false) // Cerrar el diálogo tras la eliminación exitosa
    } catch (error) {
      console.error('Error deleting risk student:', error)
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Eliminar Riesgo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Alumno en riesgo</DialogTitle>
          <DialogDescription>
            Seguro que desea eliminar al alumno en riesgo
          </DialogDescription>
          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleDelete}>Eliminar</Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
