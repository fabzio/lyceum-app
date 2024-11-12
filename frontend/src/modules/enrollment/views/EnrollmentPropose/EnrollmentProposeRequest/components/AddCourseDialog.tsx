import QuickSearchInput from '@frontend/components/QuickSearchInput.tsx/QuickSearchInput'
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@frontend/components/ui/form'
import { Input } from '@frontend/components/ui/input'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { useToast } from '@frontend/hooks/use-toast'
import EnrollmentProposalService from '@frontend/modules/enrollment/services/EnrollmentProposal.service'
import CourseService from '@frontend/modules/study-plans/services/course.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function AddCourseDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { requestNumber } = useParams({
    from: '/_auth/matricula/propuesta-horarios/$requestNumber',
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const { mutate, isPending } = useMutation({
    mutationFn: EnrollmentProposalService.insertCourseToScheduleProposal,
    onError: ({ message }) => {
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.enrollment.COURSE_PROPOSALS, +requestNumber],
      })
      toast({
        title: 'Curso agregado',
        description: 'El curso fue agregado a la propuesta',
      })
      setIsOpen(false)
    },
  })
  const handleAdd = (data: z.infer<typeof formSchema>) => {
    mutate({
      requestId: +requestNumber,
      coursesList: [data],
    })
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Agregar curso</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar curso a propuesta</DialogTitle>
          <DialogDescription>
            Agregar un curso a para asignarle horarios
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAdd)}>
            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Curso</FormLabel>
                  <FormControl>
                    <QuickSearchInput
                      searchFn={(q) => CourseService.searchCourse(q)}
                      renderOption={(course) => (
                        <p className="hover:bg-muted"> {course.name}</p>
                      )}
                      renderSelected={(course) => (
                        <article>
                          <h3>{course.name}</h3>
                          <p>{course.code}</p>
                        </article>
                      )}
                      placeholder="Buscar curso por nombre o código"
                      handleSelect={(course) => field.onChange(course?.id)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vacanciesPerSchema"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cupos por horario</FormLabel>
                  <FormControl>
                    <Input inputMode="numeric" min="1" {...field} />
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
                    <Input inputMode="numeric" min="1" {...field} />
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
                    <Input inputMode="numeric" min="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" /> : 'Agregar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
const formSchema = z.object({
  courseId: z.coerce
    .number({
      required_error: 'El curso es requerido',
    })
    .min(1),
  vacanciesPerSchema: z.coerce
    .number({
      required_error: 'Los cupos por horario son requeridos',
    })
    .max(80)
    .min(1),
  visibleSchedules: z.coerce
    .number({
      required_error: 'Los cupos por horario son requeridos',
    })
    .max(10)
    .min(1),
  hiddenSchedules: z.coerce
    .number({
      required_error: 'Los cupos por horario son requeridos',
    })
    .max(10)
    .min(1),
})
