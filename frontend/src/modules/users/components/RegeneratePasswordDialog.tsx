import { Button } from '@frontend/components/ui/button'
import {
  Dialog,
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
import { useToast } from '@frontend/hooks/use-toast'
import http from '@frontend/lib/http'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { useMutation } from '@tanstack/react-query'
import { Eye, EyeClosed, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface Props {
  code: string
}
export default function RegeneratePasswordDialog({ code }: Props) {
  const [open, setOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const togglePasswordConfirmationVisibility = () => {
    setShowPasswordConfirmation(!showPasswordConfirmation)
  }
  const { toast } = useToast()
  const { mutate, isPending } = useMutation({
    mutationFn: async (password: string) => {
      const res = await http.post('/auth/signup', {
        code,
        password,
      })
      const response = res.data as ResponseAPI
      return response
    },
    onSuccess: () => {
      toast({
        title: 'Contraseña restablecida',
        description: 'La contraseña se ha restablecido correctamente',
      })
      setOpen(false)
    },
    onError: ({ message }) => {
      toast({
        title: 'Error al restablecer contraseña',
        description: message,
        variant: 'destructive',
      })
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const onSubmit = form.handleSubmit(async (data) => {
    mutate(data.password)
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Reestablecer contraseña</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Restablecer contraseña</DialogTitle>
          <DialogDescription>
            Establece una nueva contraseña para el usuario.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Contraseña
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-1">
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <Eye /> : <EyeClosed />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Confirmar contraseña
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-1">
                      <Input
                        {...field}
                        type={showPasswordConfirmation ? 'text' : 'password'}
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={togglePasswordConfirmationVisibility}
                      >
                        {showPasswordConfirmation ? <Eye /> : <EyeClosed />}
                      </Button>
                    </div>
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
                  'Restablecer'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const formSchema = z
  .object({
    password: z
      .string({
        required_error: 'La contraseña es requerida',
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número'
      ),
    passwordConfirmation: z
      .string({
        required_error: 'La confirmación de contraseña es requerida',
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número'
      ),
  })
  .superRefine(({ password, passwordConfirmation }, ctx) => {
    if (password !== passwordConfirmation) {
      ctx.addIssue({
        code: 'custom',
        message: 'Las contraseñas no coinciden',
        path: ['passwordConfirmation'],
      })
    }
  })
