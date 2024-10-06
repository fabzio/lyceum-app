import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { useState } from 'react'
import NewFAQForm from './NewFAQForm'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@/constants/queryKeys'
import FAQCategoryService from '@/faq/services/faqCategory.service'

export default function NewFAQDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const {} = useQuery({
    queryKey: [QueryKeys.faq.FAQ_CATEGORIES],
    queryFn: () => FAQCategoryService.getFAQCategories(),
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Nueva pregunta</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva pregunta</DialogTitle>
          <DialogDescription>
            Crea una nueva pregunta para la sección de preguntas frecuentes
          </DialogDescription>
        </DialogHeader>
        <NewFAQForm />
      </DialogContent>
    </Dialog>
  )
}
