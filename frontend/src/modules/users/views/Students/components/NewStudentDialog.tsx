import { Combobox } from '@frontend/components/Combobox'
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
import { Input } from '@frontend/components/ui/input'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { useToast } from '@frontend/hooks/use-toast'
import { UnitType } from '@frontend/interfaces/enums'
import UnitService from '@frontend/modules/unit/services/Unit.service'
import StudentService from '@frontend/modules/users/services/Student.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function NewStudentDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const { data } = useQuery({
    queryKey: [QueryKeys.unit.UNITS],
    queryFn: () => UnitService.getUnitsByType(UnitType.SPECIALTY),
  })
  const { mutate, isPending } = useMutation({
    mutationFn: StudentService.addStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.users.STUDENTS],
      })
      toast({
        title: 'Estudiante agregado',
        description: 'El estudiante ha sido agregado correctamente',
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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate([data])
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Agregar estudiante</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo estudiante</DialogTitle>
          <DialogDescription>
            Registra un nuevo estudiante en el sistema
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstSurname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido paterno</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secondSurname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido materno</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="speciality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Especialidad</FormLabel>
                  <FormControl>
                    <Combobox
                      className="w-full"
                      onChange={field.onChange}
                      value={field.value}
                      options={
                        data?.map((unit) => ({
                          label: unit.name,
                          value: unit.name,
                        })) || []
                      }
                      placeholder="Selecciona una especialidad"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo institucional</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
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
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  'Agregar estudiante'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const formSchema = z.object({
  name: z
    .string({
      required_error: 'El nombre es requerido',
    })
    .min(1, { message: 'El nombre es requerido' }),
  firstSurname: z
    .string({
      required_error: 'El apellido paterno es requerido',
    })
    .min(1, { message: 'El apellido paterno es requerido' }),
  secondSurname: z.string({
    required_error: 'El apellido materno es requerido',
  }),
  email: z
    .string({
      required_error: 'El email es requerido',
    })
    .email({ message: 'El email no es válido' })
    .refine((value) => value.endsWith('@pucp.edu.pe'), {
      message: 'El email debe ser institucional',
    }),
  code: z
    .string({
      required_error: 'El código es requerido',
    })
    .length(8, { message: 'El código debe tener 8 caracteres' }),
  speciality: z.string({
    required_error: 'La especialidad es requerida',
  }),
})
