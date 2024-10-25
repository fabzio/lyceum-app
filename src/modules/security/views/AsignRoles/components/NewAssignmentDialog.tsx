import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import AssigmentForm from './AssigmentForm'
import { useState } from 'react'

export default function NewAssignmentDialog() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
        <AssigmentForm handleClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
