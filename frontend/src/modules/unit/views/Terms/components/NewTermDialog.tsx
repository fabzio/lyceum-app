import { Button } from '@frontend/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@frontend/components/ui/dialog'
import { useState } from 'react'
import TermForm from './TermForm'

export default function NewTermDialog() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Agregar semestre</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar semestre</DialogTitle>
          <DialogDescription>
            Registre un nuevo semestre en el sistema
          </DialogDescription>
        </DialogHeader>
        <TermForm handleClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
