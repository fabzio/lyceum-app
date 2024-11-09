import { useState } from 'react'
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
import { Input } from '@frontend/components/ui/input'
import { getCsvData } from '@frontend/lib/utils'
import { z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Info, Loader2, Upload } from 'lucide-react'
import RiskStudentService from '@frontend/modules/student-process/services/riskStudent.service'
import { QueryKeys } from '@frontend/constants/queryKeys'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@frontend/components/ui/hover-card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@frontend/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@frontend/hooks/use-toast'

export default function UploadCSVDialog() {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const { mutate, isPending } = useMutation({
    mutationFn: RiskStudentService.insertRiskStudentReport,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.courses.RISK_STUDENTS],
      })
      toast({
        title: 'Carga correcta',
        description: 'Estudiantes en riesgo importados correctamente',
      })
      setIsOpen(false)
    },
    onError: ({ message }) => {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: message,
      })
    },
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    let dataJson: CSVRow[]
    try {
      dataJson = await getCsvData<CSVRow>(data.file)
    } catch (error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: (error as Error).message,
      })
      return
    }
    let preparedData = dataJson.map((register) => {
      if (csvSchema.safeParse(register).success) {
        return csvSchema.parse(register)
      } else {
        toast({
          title: 'Error',
          variant: 'destructive',
          description: `Error en la fila ${register['Código de alumno']}: ${csvSchema.safeParse(register).error?.message}`,
        })
        return
      }
    })
    mutate(
      preparedData.map((register) => ({
        courseCode: register!['Código de curso'],
        studentCode: register!['Código de alumno'],
        scheduleCode: register!['Horario'],
        reasonId: register!['Motivo'],
      }))
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Carga masiva
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cargar estudiantes en riesgo</DialogTitle>
          <DialogDescription>
            Selecciona un archivo CSV para cargar el listado de estudiantes en
            riesgo.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              name="file"
              // eslint-disable-next-line
              render={({ field: { value, onChange, ...filedProps } }) => (
                <FormItem>
                  <HoverCard openDelay={100}>
                    <HoverCardTrigger>
                      <FormLabel className="inline-block hover:underline w-auto">
                        <div className="flex">
                          Archivo <Info className="h-4" />
                        </div>
                      </FormLabel>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      Código de curso | Código de alumno | Horario | Motivo
                    </HoverCardContent>
                  </HoverCard>
                  <FormControl>
                    <Input
                      {...filedProps}
                      type="file"
                      accept=".csv"
                      onChange={(e) =>
                        onChange(e.target.files && e.target.files[0])
                      }
                    />
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
                {isPending ? <Loader2 className="animate-spin" /> : 'Importar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const csvSchema = z.object({
  ['Código de alumno']: z.coerce.string({
    required_error: 'El código de alumno es requerido',
  }),
  ['Código de curso']: z
    .string({
      required_error: 'El código de curso es requerido',
    })
    .trim(),
  ['Horario']: z.coerce.string({
    required_error: 'El código de horario es requerido',
  }),
  ['Motivo']: z.number({
    required_error: 'El motivo es requerido',
  }),
})
const formSchema = z.object({
  file: z.instanceof(File, { message: 'Debe seleccionar un archivo' }),
})

type CSVRow = z.infer<typeof csvSchema>
