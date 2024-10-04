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

export default function NewAssignment() {
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
        <section>
          <div>
            <Label htmlFor="name">Usuario</Label>
            <Autocomplete users={users} placeholder="🔎 Buscar usuario">
              <div>
                <h4></h4>
              </div>
            </Autocomplete>
          </div>
          <div>
            <Label>Roles</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Elige un rol" />
              </SelectTrigger>
            </Select>
          </div>
          <div>
            <Label>Unidad</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Elige una unidad" />
              </SelectTrigger>
            </Select>
          </div>
        </section>
        <DialogFooter>
          <div className="flex w-full justify-between">
            <Button variant="outline">Cancelar</Button>
            <Button>Guardar</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
