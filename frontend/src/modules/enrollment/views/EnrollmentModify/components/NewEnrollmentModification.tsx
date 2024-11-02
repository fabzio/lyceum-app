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
import { useToast } from '@frontend/hooks/use-toast'
import EnrollmentService from '@frontend/modules/enrollment/services/enrollment.service'
import CourseService from '@frontend/modules/study-plans/services/course.service'
import { useSessionStore } from '@frontend/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose, DialogTitle } from '@radix-ui/react-dialog'
import { useMutation } from '@tanstack/react-query'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'

export default function NewEnrollmentModification() {
  const { session } = useSessionStore()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const { courseId } = useWatch({
    control: form.control,
  })
  const { mutate } = useMutation({
    onMutate: EnrollmentService.createEnrollmentModification,
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
  })
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate({ ...data, studentId: session!.id })
  }
  return (
    <Dialog>
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
                        <SelectItem value="1">Horario 1</SelectItem>
                        <SelectItem value="2">Horario 2</SelectItem>
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
              <Button type="submit">Enviar solicitud</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const formSchema = z.object({
  scheduleId: z.number({
    required_error: 'Horario requerido',
  }),
  courseId: z.number().optional(),
  requestType: z.enum(['aditional', 'withdrawal'], {
    required_error: 'Tipo de solicitud requerido',
  }),
  reason: z.string({
    required_error: 'Justificación requerida',
  }),
})
