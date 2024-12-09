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
import Need from '@frontend/components/Need'
import UploadCSVDialog from './UploadCSVDialog'
import { StudentProcessPermissionsDict } from '@frontend/interfaces/enums/permissions/StudentProcess'

export default function NewRiskStudentDialog() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Cargar Alumno</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cargar Alumno en Riesgo</DialogTitle>
          <DialogDescription>
            Selecciona al Alumno a incluir en riesgo.
          </DialogDescription>
        </DialogHeader>
        <Need permissions={StudentProcessPermissionsDict.LOAD_RISK_STUDENTS}>
          <UploadCSVDialog />
        </Need>
        <RiskStudentForm handleClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
