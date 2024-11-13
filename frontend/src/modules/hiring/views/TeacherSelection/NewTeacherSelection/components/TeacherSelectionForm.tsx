import { Button } from '@frontend/components/ui/button'
import GeneralInfo from './GeneralInfo'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import HiringService from '@frontend/modules/hiring/Services/Hirings.service'
import { Loader2 } from 'lucide-react'
import { useToast } from '@frontend/hooks/use-toast'
import CoursesSelection from './CoursesSelection'

export default function TeacherSelectionForm() {
  const { toast } = useToast()
  const { mutate, isPending } = useMutation({
    mutationFn: HiringService.createTeacherSelection,
    onSuccess: () => {
      toast({
        title: 'Convocatoria creada',
        description: 'La convocatoria ha sido creada exitosamente',
      })
    },
    onError: ({ message }) => {
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      })
    },
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data)
  }
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex">
          <div className="w-1/2">
            <GeneralInfo />
            <div className="mt-2 w-full flex justify-center">
              <Button type="submit" disabled={isPending}>
                {isPending ? <Loader2 /> : 'Crear convocatoria'}
              </Button>
            </div>
          </div>
          <CoursesSelection />
        </div>
      </form>
    </FormProvider>
  )
}

export const formSchema = z.object({
  description: z
    .string({
      required_error: 'Campo requerido',
    })
    .min(1, 'Campo requerido'),
  startDate: z.date({
    required_error: 'Campo requerido',
  }),
  endReceivingDate: z.date({
    required_error: 'Campo requerido',
  }),
  resultsPublicationDate: z.date({
    required_error: 'Campo requerido',
  }),
  endDate: z.date({
    required_error: 'Campo requerido',
  }),
  courses: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        code: z.string(),
        requirements: z
          .array(
            z.object({
              detail: z
                .string({ required_error: 'Campo requerido' })
                .min(1, 'Campo requerido'),
            })
          )
          .nonempty('Debe agregar al menos un requerimiento'),
      })
    )
    .nonempty('Debe agregar al menos un curso'),
})

export type CreateTeacherSelectionForm = z.infer<typeof formSchema>
