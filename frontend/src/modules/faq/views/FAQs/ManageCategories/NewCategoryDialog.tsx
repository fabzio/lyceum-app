import { Button } from '@frontend/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@frontend/components/ui/dialog'
import FAQCategoriesManagement from './FAQCategoriesManagement'

export default function NewCategoryDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Gestionar categorías</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gestionar categorías</DialogTitle>
          <DialogDescription>
            Crea, edita o elimina categorías de preguntas frecuentes
          </DialogDescription>
        </DialogHeader>
        <FAQCategoriesManagement />
      </DialogContent>
    </Dialog>
  )
}
