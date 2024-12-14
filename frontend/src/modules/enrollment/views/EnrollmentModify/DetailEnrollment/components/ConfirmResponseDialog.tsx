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
import { Textarea } from '@frontend/components/ui/textarea'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { EnrollmentGeneral } from '@frontend/modules/enrollment/interfaces/EnrollmentGeneral'
import EnrollmentService from '@frontend/modules/enrollment/services/enrollment.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface Props {
  response: EnrollmentGeneral['state']
}
export default function ConfirmResponseDialog({ response }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { requestNumber } = useParams({
    from: '/_auth/matricula/modificacion-matricula/$requestNumber',
  })
  const { mutate, isPending } = useMutation({
    mutationFn: EnrollmentService.updateEnrollment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          QueryKeys.enrollment.ENROLLMENTS_MODIFY_DETAIL,
          requestNumber,
        ],
      })
      setIsOpen(false)
    },
  })
  const schema = z.object({
    observation: z
      .string()
      .max(255, 'La observación no puede exceder los 255 caracteres.')
      .optional(),
  })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const handleConfirm = (data: z.infer<typeof schema>) => {
    mutate({
      requestNumber: +requestNumber,
      state: response,
      observation: data.observation || '', // Añade la observación como parte de la mutación
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {response === 'approved' ? (
          <Button>Aprobar</Button>
        ) : (
          <Button variant="secondary">Rechazar</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {response === 'approved'
              ? 'Aprobar Solicitud'
              : 'Rechazar Solicitud'}
          </DialogTitle>
          <DialogDescription>
            {response === 'approved'
              ? '¿Estás seguro que deseas aprobar esta solicitud?'
              : '¿Estás seguro que deseas rechazar esta solicitud?'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleConfirm)}>
            <FormField
              control={form.control}
              name="observation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observación (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Escribe una observación de manera opcional"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button variant="destructive" disabled={isPending}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" /> : 'Confirmar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
