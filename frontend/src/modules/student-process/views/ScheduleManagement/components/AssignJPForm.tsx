import QuickSearchInput from '@frontend/components/QuickSearchInput.tsx/QuickSearchInput'
import { Button } from '@frontend/components/ui/button'
import { DialogFooter } from '@frontend/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@frontend/components/ui/form'
//import { QueryKeys } from '@frontend/constants/queryKeys'
import { useToast } from '@frontend/hooks/use-toast'
import AccountsService from '@frontend/service/Accounts.service'
import ScheduleService from '@frontend/service/Schedules.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation /*, useQueryClient */ } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface Props {
  handleClose: () => void
  scheduleId: number
}

const formSchema = z.object({
  userId: z
    .string({ required_error: 'El usuario es requerido' })
    .min(1, 'El usuario es requerido'),
})

export default function AssignJPForm({ handleClose, scheduleId }: Props) {
  //const queryClient = useQueryClient()
  const { toast } = useToast()

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { userId: string }) =>
      ScheduleService.assignJP(scheduleId, data.userId),
    onSuccess: () => {
      /*queryClient.invalidateQueries({
        queryKey: [QueryKeys.]
    })*/
      handleClose()
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
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate({ userId: data.userId })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="userId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuario</FormLabel>
              <FormControl>
                <QuickSearchInput
                  placeholder="Buscar usuario por código o nombre"
                  searchFn={(q) => AccountsService.getAccount({ q })}
                  handleSelect={(item) => field.onChange(item?.id)}
                  renderOption={(item) => (
                    <div className="hover:bg-muted">
                      {`${item.name} ${item.firstSurname} ${item.secondSurname} ${item.code}`}
                    </div>
                  )}
                  renderSelected={(item) => (
                    <article>
                      <h5 className="font-semibold">
                        {`${item.name} ${item.firstSurname} ${item.secondSurname}`}
                      </h5>
                      <p className="text-xs">{item.code}</p>
                    </article>
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter className="mt-2">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : 'Guardar'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
