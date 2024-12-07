import { Button } from '@frontend/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@frontend/components/ui/dialog'
import { useState } from 'react'
import EditRolePermissionForm from './EditRolePermissionForm'
import { Edit } from 'lucide-react'
import { RolePermissionDTO } from '@frontend/interfaces/models/RolePermission'

interface Props {
  roleData: RolePermissionDTO
}

export default function EditRoleModal({ roleData }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mt-2" size="icon" variant="ghost">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Rol</DialogTitle>
        </DialogHeader>
        <EditRolePermissionForm roleData={roleData} setIsOpen={setIsOpen} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
