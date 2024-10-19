import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { QueryKeys } from '@/constants/queryKeys'
import { useToast } from '@/hooks/use-toast'
import { Course } from '@/interfaces/models/Course'
import CourseService from '@/modules/study-plans/services/course.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface Props {
  handleClose: () => void
  mode: 'edit' | 'create'
  course?: Course
}

export default function CourseForm({ handleClose, mode, course }: Props) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: mode === 'edit' ? course : undefined,
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: Pick<Course, 'name' | 'code' | 'credits'>) =>
      mode === 'create'
        ? CourseService.addCourse([data])
        : CourseService.updateCourse({ code: course?.code!, course: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.studyPlan.COURSES],
      })
      handleClose()
    },
    onError: ({ message }) => {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: message,
      })
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="credits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Créditos</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button disabled={isPending}>
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : mode === 'create' ? (
              'Agregar'
            ) : (
              'Actualizar'
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

const formSchema = z.object({
  code: z
    .string({
      required_error: 'El código es requerido',
    })
    .length(6, 'El código debe tener 6 caracteres'),
  name: z
    .string({
      required_error: 'El nombre es requerido',
    })
    .min(1),
  credits: z.coerce
    .number({
      invalid_type_error: 'Los créditos deben ser un número',
    })
    .min(0, 'Los créditos deben ser mayor o igual a 0')
    .max(9.9, 'Los créditos deben ser menor a 10'),
})
