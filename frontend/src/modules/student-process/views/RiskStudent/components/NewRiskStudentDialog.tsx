import { Button } from '@frontend/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@frontend/components/ui/dialog'

import { useState } from 'react'
import RiskStudentForm from './NewRiskStudentForm'

export default function NewRiskStudentDialog() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Nuevo Alumno</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva Alumno en Riesgo</DialogTitle>
          <DialogDescription>
            Selecciona al Alumno a incluir en riesgo.
          </DialogDescription>
        </DialogHeader>
        <RiskStudentForm handleClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
