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
export default function NewEnrollmentPropose() {
  const handleClick = () => {}
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Solicitar propuesta</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Solicitar propuesta de matricula</DialogTitle>
          <DialogDescription>
            Inicia el proceso de propuesta de matricula para todas las
            especialidades. Se solicita confirmación para comenzar la solicitud
            propuesta de matricula.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleClick}>Solicitar propuesta</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
