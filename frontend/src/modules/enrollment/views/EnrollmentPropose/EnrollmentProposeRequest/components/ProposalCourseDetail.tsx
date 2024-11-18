import { Button } from '@frontend/components/ui/button.tsx'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@frontend/components/ui/form'
import { Input } from '@frontend/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { CourseProposition } from '@frontend/modules/enrollment/interfaces/CourseProposition'
import { useParams } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import EnrollmentProposalService from '@frontend/modules/enrollment/services/EnrollmentProposal.service'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { useToast } from '@frontend/hooks/use-toast'
import { Loader2 } from 'lucide-react'

interface Props {
  course: CourseProposition
  handleClose: () => void
}

export default function ProposedCourseDetailForm({
  course,
  handleClose,
}: Props) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { requestNumber } = useParams({
    from: '/_auth/matricula/propuesta-horarios/$requestNumber',
  })
  const updateMutation = useMutation({
    mutationFn: EnrollmentProposalService.updateCourseInScheduleProposal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.enrollment.COURSE_PROPOSALS, +requestNumber],
      })
      toast({
        title: 'Curso actualizado',
        description: 'El curso se ha actualizado correctamente',
      })
      handleClose()
    },
    onError: ({ message }) => {
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      })
    },
  })
  const deleteMutation = useMutation({
    mutationFn: EnrollmentProposalService.deleteCourseFromScheduleProposal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.enrollment.COURSE_PROPOSALS, +requestNumber],
      })
      toast({
        title: 'Curso eliminado',
        description: 'El curso se ha eliminado correctamente',
      })
      handleClose()
    },
    onError: ({ message }) => {
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      })
    },
  })

  const handleDelete = () => {
    deleteMutation.mutate({
      requestId: +requestNumber,
      coursesList: [course.courseId],
    })
    handleClose()
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hiddenSchedules: course.numberHidden,
      vacancies: course.vacants,
      visibleSchedules: course.numberVisible,
    },
  })
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    updateMutation.mutate({
      requestId: +requestNumber,
      coursesList: [
        {
          courseId: course.courseId,
          vacanciesPerSchema: data.vacancies,
          hiddenSchedules: data.hiddenSchedules,
          visibleSchedules: data.visibleSchedules,
        },
      ],
    })
  }
  const onDelete = () => {
    handleDelete()
  }

  return (
    <>
      <div className="relative pb-2">
        <h2 className="text-xl font-bold">Gestionar curso</h2>
        <p className="text-sm text-muted-foreground">{course.courseName}</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="vacancies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vacantes</FormLabel>
                  <FormControl>
                    <Input {...field} min={0} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="visibleSchedules"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horarios visibles</FormLabel>
                  <FormControl>
                    <Input {...field} min={0} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hiddenSchedules"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horarios ocultos</FormLabel>
                  <FormControl>
                    <Input {...field} min={0} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between gap-2 pt-8">
            <Button
              type="button"
              variant="destructive"
              onClick={onDelete}
              disabled={deleteMutation.isPending || updateMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Eliminar'
              )}
            </Button>
            <Button
              type="submit"
              disabled={deleteMutation.isPending || updateMutation.isPending}
            >
              {updateMutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Guardar'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

const formSchema = z.object({
  vacancies: z.coerce
    .number()
    .min(1, 'El número de vacantes es requerido')
    .int('El número de vacantes debe ser un número entero'),
  visibleSchedules: z.coerce
    .number()
    .int('El número de horarios visibles debe ser un número entero')
    .min(1, 'El número de horarios visibles es requerido'),
  hiddenSchedules: z.coerce
    .number()
    .int('El número de horarios ocultos es requerido'),
})
