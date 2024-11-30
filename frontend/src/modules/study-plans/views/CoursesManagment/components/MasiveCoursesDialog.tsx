import DownloadTemplate from '@frontend/components/DownloadTemplate'
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
import { Course } from '@frontend/interfaces/models/Course'
import { getCsvData } from '@frontend/lib/utils'
import CourseService from '@frontend/modules/study-plans/services/course.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Info, Loader2, Upload } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function MasiveCoursesDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const { mutate, isPending } = useMutation({
    mutationFn: CourseService.addCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.studyPlan.COURSES],
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
    try {
      const csvData = await getCsvData<Course>(data.file)
      const parsedData = csvData.map((row) => csvSchema.parse(row))
      mutate(
        parsedData.map((row) => ({
          code: row['Código'],
          name: row['Nombre'],
          credits: row['Créditos'],
          unitName: row['Unidad'],
        }))
      )
    } catch (error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: (error as Error).message,
      })
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
          <DialogTitle>Importar cursos desde archivo</DialogTitle>
          <DialogDescription>
            Sube un archivo CSV con los cursos que desea importar
          </DialogDescription>
        </DialogHeader>
        <DownloadTemplate
          headers={['Código', 'Nombre', 'Créditos', 'Unidad']}
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              name="file"
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
                      Código, Nombre, Creditos, Unidad
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
              <DialogClose>
                <Button variant="secondary">Cancelar</Button>
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
  ['Código']: z.string().length(6),
  ['Nombre']: z.string(),
  ['Créditos']: z.number(),
  ['Unidad']: z.string(),
})

const formSchema = z.object({
  file: z.instanceof(File, { message: 'Debe seleccionar un archivo' }),
})
