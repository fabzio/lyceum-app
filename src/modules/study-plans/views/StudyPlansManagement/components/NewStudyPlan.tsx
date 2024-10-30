import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { StudyPlanPermissionsDict } from '@/interfaces/enums/permissions/StudyPlan'
import StudyPlanService from '@/modules/study-plans/services/studyPlan.service'
import { useSessionStore } from '@/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function NewStudyPlan() {
  const { toast } = useToast()
  const { getRoleWithPermission } = useSessionStore()
  const navigate = useNavigate({
    from: '/plan-de-estudios/gestionar',
  })
  const { mutate } = useMutation({
    mutationFn: StudyPlanService.createStudyPlan,
    onSuccess: (studyPlanId) => {
      navigate({
        to: '/plan-de-estudios/gestionar/$planId',
        params: { planId: studyPlanId.toString() },
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
    defaultValues: { startLevel: 5, levelsCount: 6 },
  })
  const handleCreate = (data: z.infer<typeof formSchema>) => {
    mutate({
      specialityId: getRoleWithPermission(
        StudyPlanPermissionsDict.MANAGE_STUDY_PLAN
      )!.unitId,
      ...data,
    })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Nuevo plan de estudio</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)}>
            <DialogTitle>Crear nuevo plan de estudio</DialogTitle>
            <DialogDescription>
              Se creará un nuevo plan de estudio en modo de boceto, ¿Desea
              continuar?
            </DialogDescription>
            <section>
              <FormField
                name="startLevel"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nivel de inicio</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="levelsCount"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad de niveles</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
            <DialogFooter className="mt-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancelar
                </Button>
              </DialogClose>
              <Button>Continuar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const formSchema = z.object({
  startLevel: z
    .number({
      required_error: 'El nivel de inicio es requerido',
    })
    .int('El nivel de inicio debe ser un número entero')
    .min(1, 'El nivel de inicio debe ser mayor a 0'),
  levelsCount: z
    .number({ required_error: 'La cantidad de niveles es requerida' })
    .int('La cantidad de niveles debe ser un número entero')
    .min(6, 'El plan de estudio debe tener entre 6 y 8 niveles')
    .max(8, 'El plan de estudio debe tener entre 6 y 8 niveles'),
})
