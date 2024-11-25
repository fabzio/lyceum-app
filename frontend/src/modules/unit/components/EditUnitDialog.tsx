import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@frontend/components/ui/dialog'
import { Unit } from '@frontend/interfaces/models/Unit'
import EditUnitForm from './EditUnitForm'

interface Props {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  unit: Unit
}

export default function EditUnitDialog({ isOpen, setIsOpen, unit }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modificar Unidad</DialogTitle>
          <DialogDescription>
            Actualice los datos de la unidad seleccionada.
          </DialogDescription>
        </DialogHeader>
        <EditUnitForm
          unit={unit}
          unitType={unit.unitType}
          handleClose={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
