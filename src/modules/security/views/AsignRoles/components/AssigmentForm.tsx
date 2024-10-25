import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function AssigmentForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  return (
    <>
      <Form {...form}>
        <form>
          <FormField
            name="userId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuario</FormLabel>
                <FormControl>
                  <Input {...field} placeholder=''/>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="roleId"
            control={form.control}
            render={() => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                
              </FormItem>
            )}
          />
          <FormField
            name="unitId"
            control={form.control}
            render={() => (
              <FormItem>
                <FormLabel>Unidad</FormLabel>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <DialogFooter>
        <div className="flex w-full justify-between">
          <Button variant="outline">Cancelar</Button>
          <Button>Guardar</Button>
        </div>
      </DialogFooter>
    </>
  )
}

const formSchema = z.object({
  userId: z
    .string({ required_error: 'El usuario es requerido' })
    .min(1, 'El usuario es requerido'),
  roleId: z.number({ required_error: 'El rol es requerido' }),
  unitId: z.number({ required_error: 'La unidad es requerida' }),
})
