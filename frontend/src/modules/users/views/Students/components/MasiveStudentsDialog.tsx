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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@frontend/components/ui/hover-card'
import { Input } from '@frontend/components/ui/input'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { useToast } from '@frontend/hooks/use-toast'
import { getCsvData } from '@frontend/lib/utils'
import StudentService from '@frontend/modules/users/services/Student.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Download, Info, Loader2, Upload } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function MasiveStudentsDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const { mutate, isPending } = useMutation({
    mutationFn: StudentService.addStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.users.STUDENTS],
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
  const downloadTemplate = () => {
    const csvContent = `Código,Nombre,Primer apellido,Segundo apellido,Correo institucional,Especialidad\n` // Encabezados del CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'plantilla_estudiantes.csv'
    link.click()
  }
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const jsonData = await getCsvData<CSVRow>(data.file)
      const parseData = jsonData.map((unit) => csvSchema.parse(unit))
      mutate(
        parseData.map((unit) => ({
          name: unit['Nombre'],
          code: unit['Código'],
          email: unit['Correo institucional'],
          firstSurname: unit['Primer apellido'],
          secondSurname: unit['Segundo apellido'],
          speciality: unit['Especialidad'],
        }))
      )
    } catch (error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: (error as Error).message,
      })
      return
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Upload className="mr-2 h-4 w-4" /> Carga masiva
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Importar estudiantes desde archivo</DialogTitle>
          <DialogDescription>
            Sube un archivo CSV con los estudiantes que desea importar
          </DialogDescription>
        </DialogHeader>
        <Button variant="outline" onClick={downloadTemplate}>
          <Download className="mr-2 h-4 w-4" /> Descargar plantilla
        </Button>
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
                      Código | Nombre | Primer apellido | Segundo apellido |
                      Correo institucional | Especialidad
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

const formSchema = z.object({
  file: z.instanceof(File, { message: 'Debe seleccionar un archivo' }),
})

const csvSchema = z.object({
  Código: z.coerce.string().length(8),
  Nombre: z.string(),
  ['Primer apellido']: z.string(),
  ['Segundo apellido']: z.string(),
  ['Correo institucional']: z.string().email(),
  Especialidad: z.string(),
})

type CSVRow = z.infer<typeof csvSchema>
