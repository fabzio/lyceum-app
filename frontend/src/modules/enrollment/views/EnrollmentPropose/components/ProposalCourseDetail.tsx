import { Button } from '@frontend/components/ui/button.tsx'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@frontend/components/ui/form'
import { Input } from '@frontend/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const formSchema = z.object({
  vacancies: z.string().min(1, 'El número de vacantes es requerido'),
  visibleSchedules: z
    .string()
    .min(1, 'El número de horarios visibles es requerido'),
  hiddenSchedules: z.string().optional(),
})

interface Props {
  courseName?: string
  onClose?: () => void
  onSubmit?: (data: z.infer<typeof formSchema>) => void
  onDelete?: () => void
}

export default function ProposedCourseDetailForm({
  courseName,
  onSubmit,
  onDelete,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vacancies: '0',
      visibleSchedules: '0',
      hiddenSchedules: '0',
    },
  })

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit?.(data)
  }

  return (
    <>
      <div className="relative pb-2">
        <h2 className="text-xl font-bold">Gestionar curso</h2>
        <p className="text-sm text-muted-foreground">{courseName}</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="vacancies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vacantes</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      style={{
                        WebkitAppearance: 'none',
                        MozAppearance: 'textfield',
                        margin: 0,
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="visibleSchedules"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>#Horarios visibles</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      style={{
                        WebkitAppearance: 'none',
                        MozAppearance: 'textfield',
                        margin: 0,
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hiddenSchedules"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>#Horarios visibles</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      style={{
                        WebkitAppearance: 'none',
                        MozAppearance: 'textfield',
                        margin: 0,
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between gap-2 pt-8">
            <Button type="button" variant="destructive" onClick={onDelete}>
              Eliminar
            </Button>
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </Form>
    </>
  )
}
