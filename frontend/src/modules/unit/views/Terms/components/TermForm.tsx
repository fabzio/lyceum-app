import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@frontend/components/ui/form'
import { Input } from '@frontend/components/ui/input'
import { Button } from '@frontend/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import UnitService from '../../../services/Unit.service'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { toast } from '@frontend/hooks/use-toast'

interface Props {
  handleClose: () => void
}

const formSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
})

export default function TermForm({ handleClose }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(formSchema),
  })
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: UnitService.createTerm,
    onSettled: () => handleClose(),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.unit.TERMS, {}],
      }),
    onError: ({ message }) => {
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      })
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Aquí iría la lógica para guardar el término, e.g., llamada al API
    mutate(values.name)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del semestre</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Ingrese el nombre del semestre"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-4 flex justify-end">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="submit" className="ml-2" disabled={isPending}>
            {isPending ? 'Cargando...' : 'Guardar'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
