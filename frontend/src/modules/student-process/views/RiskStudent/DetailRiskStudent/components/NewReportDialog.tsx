import { Button } from '@frontend/components/ui/button'
import {
  Dialog,
  DialogContent,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@frontend/components/ui/select'
import { Textarea } from '@frontend/components/ui/textarea'
import { QueryKeys } from '@frontend/constants/queryKeys'
import RiskStudentReportService from '@frontend/modules/student-process/services/riskStudentReport.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useSearch } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function NewReportDialog() {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const { code } = useParams({
    from: '/_auth/procesos-de-estudiantes/alumnos-riesgo/$code',
  })
  const { scheduleId } = useSearch({
    from: '/_auth/procesos-de-estudiantes/alumnos-riesgo/$code',
  }) as { scheduleId: string }

  const { mutate, isPending } = useMutation({
    mutationFn: RiskStudentReportService.insertRiskStudentReport,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.courses.RISK_STUDENT_REPORTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.courses.RISK_STUDENT_REPORT, code],
      })
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.courses.RISK_STUDENT, code],
      })
      form.reset()
      setIsOpen(false)
    },
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate({
      ...data,
      scheduleId: +scheduleId,
      studentCode: code,
    })
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Responder solicitud de reporte</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enviar nuevo reporte</DialogTitle>
          <DialogDescription>
            Asigne un puntaje al estudiante y comente sus observaciones.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="score"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Puntaje</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione rendimiento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Muy malo</SelectItem>
                      <SelectItem value="2">Malo</SelectItem>
                      <SelectItem value="3">Regular</SelectItem>
                      <SelectItem value="4">Bueno</SelectItem>
                      <SelectItem value="5">Excelente</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="observation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observación</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : 'Enviar'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const formSchema = z.object({
  score: z.preprocess(
    (val) => parseInt(val as string),
    z
      .number({
        invalid_type_error: 'El puntaje debe ser un número',
      })
      .min(1, 'El puntaje debe ser mayor or igual a 1')
      .max(5, 'El puntaje debe ser menor o igual a 5')
  ),
  observation: z
    .string({
      message: 'La observación es requerida',
    })
    .min(1, 'La observación es requerida'),
})
