import { Button } from '@frontend/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@frontend/components/ui/dialog'
import AssignJPForm from './AssignJPForm'
import { useState } from 'react'

interface NewAssignmentDialogProps {
  scheduleId: number
}

export default function NewAssignmentDialog({
  scheduleId,
}: NewAssignmentDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Añadir JP</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Asignar Jefe de Práctica</DialogTitle>
          <DialogDescription>
            Selecciona el usuario que deseas asignar como Jefe de Práctica.
          </DialogDescription>
        </DialogHeader>
        <AssignJPForm
          handleClose={() => setIsOpen(false)}
          scheduleId={scheduleId}
        />
      </DialogContent>
    </Dialog>
  )
}
