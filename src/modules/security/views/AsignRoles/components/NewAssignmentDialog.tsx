import Autocomplete from '@/components/Autocomplete'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select'
import AssigmentForm from './AssigmentForm'

const users = [
  {
    code: '20112345',
    name: 'Fabrizio Franco',
  },
  {
    code: '20112346',
    name: 'Ricardo Flores',
  },
  {
    code: '20112347',
    name: 'Juan Perez',
  },
]

export default function NewAssignmentDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Nueva asignación</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva asignación</DialogTitle>
          <DialogDescription>
            Asigna los roles a los usuarios del sistema
          </DialogDescription>
        </DialogHeader>
        <AssigmentForm />
      </DialogContent>
    </Dialog>
  )
}
