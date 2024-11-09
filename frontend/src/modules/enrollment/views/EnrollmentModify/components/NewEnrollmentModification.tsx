import QuickSearchInput from '@frontend/components/QuickSearchInput.tsx/QuickSearchInput'
import { Button } from '@frontend/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@frontend/components/ui/select'
import { Textarea } from '@frontend/components/ui/textarea'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { useToast } from '@frontend/hooks/use-toast'
import EnrollmentService from '@frontend/modules/enrollment/services/enrollment.service'
import CourseService from '@frontend/modules/study-plans/services/course.service'
import ScheduleService from '@frontend/service/Schedules.service'
import { useSessionStore } from '@frontend/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose, DialogTitle } from '@radix-ui/react-dialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'

export default function NewEnrollmentModification() {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const { session } = useSessionStore()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseId: undefined,
      scheduleId: '0',
      requestType: undefined,
      reason: '',
    },
  })

  const { courseId } = useWatch({
    control: form.control,
  })
  const { data: schedules, isLoading } = useQuery({
    queryKey: ['schedules', courseId],
    queryFn: async () => await ScheduleService.getSchedulesByCourse(courseId!),
    enabled: !!courseId,
  })
  const { mutate, isPending } = useMutation({
    mutationFn: EnrollmentService.createEnrollmentModification,
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.enrollment.ENROLLMENTS_MODIFY],
      })
      toast({
        title: 'Solicitud enviada',
        description: 'Tu solicitud ha sido enviada correctamente',
      })
      form.reset()
      setIsOpen(false)
    },
  })
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!data.scheduleId || data.scheduleId === '0') {
      toast({
        title: 'Error',
        description: 'Debe seleccionar un horario',
        variant: 'destructive',
      })
      return
    }
    mutate({ ...data, scheduleId: +data.scheduleId, studentId: session!.id })
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Nueva solicitud</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modificación de matricula</DialogTitle>
          <DialogDescription>
            Solicita un cambio excepcional en tu matricula.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="requestType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de solicitud</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Elija el tipo de solicitud" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="aditional">
                        Matrícula adicional
                      </SelectItem>
                      <SelectItem value="withdrawal">
                        Retiro de matrícula
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Curso</FormLabel>
                  <FormControl>
                    <QuickSearchInput
                      searchFn={async (q) =>
                        await CourseService.fetchCourses({ q }).then(
                          (res) => res.result
                        )
                      }
                      handleSelect={(item) => field.onChange(item?.id)}
                      renderOption={(item) => (
                        <div className="hover:bg-muted">{item.name}</div>
                      )}
                      renderSelected={(item) => <article>{item.name}</article>}
                      placeholder="Buscar curso por nombre o código"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="scheduleId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horario</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger disabled={!courseId}>
                          <SelectValue placeholder="Elija el horario" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoading ? (
                          <SelectItem value="0" disabled>
                            Cargando...
                          </SelectItem>
                        ) : (
                          schedules?.map((schedule) => (
                            <SelectItem
                              key={schedule.id}
                              value={schedule.id.toString()}
                            >
                              {schedule.code}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="reason"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Justificación</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
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
              <Button type="submit">
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  'Enviar solicitud'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const formSchema = z.object({
  scheduleId: z
    .string({
      required_error: 'Horario requerido',
    })
    .min(1, 'Horario requerido'),
  courseId: z.number().optional(),
  requestType: z.enum(['aditional', 'withdrawal'], {
    required_error: 'Tipo de solicitud requerido',
  }),
  reason: z
    .string({
      required_error: 'Justificación requerida',
    })
    .min(1, 'Justificación requerida'),
})
