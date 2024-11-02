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
import FAQForm from '../../components/FAQForm'

export default function NewFAQDialog() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Nueva pregunta </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva pregunta frecuente</DialogTitle>
          <DialogDescription>
            Crea una nueva pregunta para la sección de preguntas frecuentes
          </DialogDescription>
        </DialogHeader>
        <FAQForm mode="create" handleClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
