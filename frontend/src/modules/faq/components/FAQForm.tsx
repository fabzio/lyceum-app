import { Button } from '@frontend/components/ui/button'
import { DialogClose, DialogFooter } from '@frontend/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@frontend/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@frontend/components/ui/select'
import { Textarea } from '@frontend/components/ui/textarea'
import { QueryKeys } from '@frontend/constants/queryKeys'
import FAQService from '@frontend/modules/faq/services/faq.service'
import FAQCategoryService from '@frontend/modules/faq/services/faqCategory.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectValue } from '@radix-ui/react-select'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FAQ } from '../interfaces/FAQ'
import { useToast } from '@frontend/hooks/use-toast'

interface Props {
  mode: 'create' | 'edit'
  faq?: FAQ
  handleClose: () => void
}
export default function FAQForm({ handleClose, mode, faq }: Props) {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { data: categories } = useQuery({
    queryKey: [QueryKeys.faq.FAQ_CATEGORIES],
    queryFn: () => FAQCategoryService.getFAQCategories(),
  })
  const createMutation = useMutation({
    mutationFn: FAQService.createFAQ,
    onMutate: () => handleClose(),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.faq.FAQS],
      }),
    onError: ({ message }) => {
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      })
    },
  })
  const updateMutation = useMutation({
    mutationFn: FAQService.updateFAQ,
    onSettled: () => handleClose(),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.faq.FAQS],
      }),
    onError: ({ message }) => {
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      })
    },
  })

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      answer: faq?.answer || '',
      category: faq?.faqCategoryId.toString(),
      question: faq?.question || '',
    },
    resolver: zodResolver(schema),
  })
  const onSubmit = (data: z.infer<typeof schema>) => {
    if (mode === 'create')
      createMutation.mutate({ ...data, faqCategoryId: parseInt(data.category) })
    if (mode === 'edit')
      updateMutation.mutate({
        ...data,
        faqCategoryId: parseInt(data.category),
        id: faq!.id,
      })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pregunta</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Respuesta</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <div className="w-full py-2 flex justify-between">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button>Guardar</Button>
          </div>
        </DialogFooter>
      </form>
    </Form>
  )
}

const schema = z.object({
  question: z
    .string({
      required_error: 'La pregunta es requerida',
    })
    .min(1)
    .max(255),
  category: z.string({
    required_error: 'La categoría es requerida',
  }),
  answer: z
    .string({
      required_error: 'La respuesta es requerida',
    })
    .min(1)
    .max(255),
})
