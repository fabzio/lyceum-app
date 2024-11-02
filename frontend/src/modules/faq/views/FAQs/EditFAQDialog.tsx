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
import NewFAQForm from '../../components/FAQForm'
import { Pen } from 'lucide-react'
import { FAQ } from '@frontend/modules/faq/interfaces/FAQ'

interface Props {
  faq: FAQ
}
export default function EditFAQDialog({ faq }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Pen />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar pregunta frecuente</DialogTitle>
          <DialogDescription>
            Edita una nueva pregunta para la sección de preguntas frecuentes
          </DialogDescription>
        </DialogHeader>
        <NewFAQForm
          mode="edit"
          handleClose={() => setIsOpen(false)}
          faq={faq}
        />
      </DialogContent>
    </Dialog>
  )
}
