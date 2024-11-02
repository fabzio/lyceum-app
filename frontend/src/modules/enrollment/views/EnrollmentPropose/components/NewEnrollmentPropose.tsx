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
export default function NewEnrollmentPropose() {
  const handleClick = () => {
    
  }
  return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Solicitar propuesta</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Solicitar propuesta de matricula</DialogTitle>
            <DialogDescription>
              Inicia el proceso de propuesta de matricula para todas las especialidades. Se solicita confirmación para comenzar la solicitud propuesta de matricula.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="flex w-full justify-between">
              <Button variant="outline">Cancelar</Button>
              <Button onClick={handleClick}>Solicitar propuesta</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}
  