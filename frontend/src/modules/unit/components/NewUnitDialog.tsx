import { Button } from '@frontend/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@frontend/components/ui/dialog'
import { UnitType } from '@frontend/interfaces/enums'
import { mapParentUnitType, mapUnitType } from '@frontend/lib/mapUnitType'
import UnitForm from './UnitForm'
import { useState } from 'react'

interface Props {
  unitType: UnitType
}
export default function NewUnitDialog({ unitType }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Agregar {mapUnitType[unitType].toLowerCase()}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Agregar {mapUnitType[unitType].toLowerCase()}
          </DialogTitle>
          <DialogDescription>
            Registre la nueva {mapUnitType[unitType].toLowerCase()} a su{' '}
            {mapUnitType[
              mapParentUnitType[unitType] ?? 'university'
            ].toLowerCase()}{' '}
            respectiva
          </DialogDescription>
        </DialogHeader>
        <UnitForm unitType={unitType} handleClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
