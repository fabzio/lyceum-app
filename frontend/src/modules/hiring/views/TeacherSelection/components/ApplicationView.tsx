import { Button } from '@frontend/components/ui/button.tsx'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@frontend/components/ui/form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@frontend/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { Textarea } from '@frontend/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useMutation } from '@tanstack/react-query'
import { QueryKeys } from '@frontend/constants/queryKeys'
// import { useToast } from '@frontend/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import HiringService from '@frontend/modules/hiring/Services/Hirings.service'
import { Eye } from 'lucide-react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

interface Props {
  application: {
    id: string
    name: string
    email: string
    jobRequestStatus: string
    courseName: string | undefined
    jobRequestId: number
  }
  handleClose: () => void
}

export default function ViewApplication({ application, handleClose }: Props) {
  // const {hiringId, courseId } = useParams(
  //   {from: '/_auth/contrataciones/seleccion-docentes/$hiringId/$courseId'})
  // const { toast } = useToast()
  // const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const approveMutation = useMutation({
    // mutationFn: (data: z.infer<typeof formSchema>) => {
    //   // Replace this with your actual API call
    //   return Promise.resolve({ success: true })
    // },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: [QueryKeys.hiring.HIRINGS],
    //   })
    //   toast({
    //     title: 'Aplicación aprobada',
    //     description: 'La aplicación del postulante sido aprobada correctamente',
    //   })
    //   handleClose()
    // },
    // onError: (error: Error) => {
    //   toast({
    //     title: 'Error',
    //     description: error.message,
    //     variant: 'destructive',
    //   })
    // },
  })

  const rejectMutation = useMutation({
    // mutationFn: (data: z.infer<typeof formSchema>) => {
    //   // Replace this with your actual API call
    //   return Promise.resolve({ success: true })
    // },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: [QueryKeys.hiring.HIRINGS],
    //   })
    //   toast({
    //     title: 'Aplicación rechazada',
    //     description:
    //       'La aplicación del postulante ha sido rechazada correctamente',
    //   })
    //   handleClose()
    // },
    // onError: (error: Error) => {
    //   toast({
    //     title: 'Error',
    //     description: error.message,
    //     variant: 'destructive',
    //   })
    // },
  })

  const onApprove = () => {
    // approveMutation.mutate(data)
  }

  const onReject = () => {
    // rejectMutation.mutate(data) <- data: z.infer<typeof formSchema>
  }

  const { data: motivation } = useQuery({
    queryKey: [QueryKeys.hiring.HIRINGS, application.jobRequestId],
    queryFn: () =>
      HiringService.getMotivation(String(application.jobRequestId)),
    placeholderData: keepPreviousData,
  })

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Revisar postulación
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">
              {(application.courseName || '').replace(/\+/g, ' ')}
            </h3>
            <p className="text-muted-foreground">{application.name}</p>
          </div>

          <Button
            variant="outline"
            className="justify-start gap-2 w-42"
            //   onClick={void}
          >
            <Eye className="h-4 w-4" />
            Ver documentos
          </Button>

          <div className="space-y-2">
            <h3 className="font-medium">Motivación</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {motivation}
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onApprove)} className="space-y-6">
              <FormField
                control={form.control}
                name="observation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observación</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Comentario" // Use placeholder instead of a default value
                        value={field.value || ''} // Keep the value empty initially or bind to the state
                        onFocus={(e) => {
                          if (e.target.value === 'Comentario') {
                            field.onChange('') // Clear the value when focused
                          }
                        }}
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={form.handleSubmit(onReject)}
                  disabled={
                    approveMutation.isPending || rejectMutation.isPending
                  }
                >
                  {rejectMutation.isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    'Rechazar'
                  )}
                </Button>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    approveMutation.isPending || rejectMutation.isPending
                  }
                >
                  {approveMutation.isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    'Aprobar'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const formSchema = z.object({
  name: z.coerce.string().optional(),
  hiddenSchedules: z.coerce.number(),
  observation: z.coerce.string().optional(),
})
