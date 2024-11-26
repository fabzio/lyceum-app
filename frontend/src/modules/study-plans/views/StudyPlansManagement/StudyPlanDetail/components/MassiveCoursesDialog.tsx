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
import { useToast } from '@frontend/hooks/use-toast'
import { getCsvData } from '@frontend/lib/utils'
import StudyPlanService from '@frontend/modules/study-plans/services/studyPlan.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { Info, Loader2, Upload } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function MassiveCoursesDialog() {
  const { planId } = useParams({
    from: '/_auth/plan-de-estudios/gestionar/$planId',
  })
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const { mutate, isPending } = useMutation({
    mutationFn: StudyPlanService.addCoursesToStudyPlan,
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const jsonData = await getCsvData<CSVRow>(data.file)
      const parseData = jsonData.map((course) => csvSchema.parse(course))
      mutate(
        parseData.map((course) => ({
          course: course['Código de curso'],
          level: course['Nivel'],
          studyPlanId: +planId,
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
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" /> Carga masiva de cursos
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Carga masiva de cursos</DialogTitle>
          <DialogDescription>
            Arrastra y suelta el archivo de cursos en formato CSV
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" /> : 'Cargar'}
              </Button>
            </DialogFooter>
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
                    <HoverCardContent>Código de curso | Nivel</HoverCardContent>
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
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const formSchema = z.object({
  file: z.instanceof(File),
})

const csvSchema = z.object({
  ['Código de curso']: z.string(),
  ['Nivel']: z.number().min(0).max(12),
})

type CSVRow = z.infer<typeof csvSchema>
