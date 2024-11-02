import { Button } from '@frontend/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@frontend/components/ui/dialog'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { FAQ } from '@frontend/modules/faq/interfaces/FAQ'
import FAQService from '@frontend/modules/faq/services/faq.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import { useState } from 'react'

interface Props {
  faqId: FAQ['id']
}
export default function DeleteFAQDialog({ faqId }: Props) {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const { mutate } = useMutation({
    mutationFn: () => FAQService.deleteFAQ(faqId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.faq.FAQS],
      })
      setIsOpen(false)
    },
  })
  const handleDelete = () => {
    mutate()
  }
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar pregunta frecuente</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar esta pregunta frecuente?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDelete}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
