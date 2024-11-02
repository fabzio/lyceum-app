import { Button } from '@frontend/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@frontend/components/ui/dialog'
import RolePermissionForm from './RolePermissionForm'
import { useState } from 'react'

export default function NewRole() {
  const [isOpen, setIsOpen] = useState(false)
  const handleClose = () => setIsOpen(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Nuevo rol</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo rol</DialogTitle>
          <DialogDescription>
            Crea roles para los usuarios del sistema
          </DialogDescription>
        </DialogHeader>
        <RolePermissionForm handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  )
}
