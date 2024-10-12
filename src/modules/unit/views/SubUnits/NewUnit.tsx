import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import UnitForm from '../../components/UnitForm'

export default function NewUnit() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Crear nueva unidad</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear nueva unidad</DialogTitle>
            <DialogDescription>
              Indique los datos de la nueva sub unidad
            </DialogDescription>
          </DialogHeader>
          <div>
            <UnitForm />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
