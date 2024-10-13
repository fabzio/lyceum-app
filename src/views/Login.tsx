import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ModeToggle } from '@/layouts/components/ModeToggle'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function LoginPage() {
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(formSchema),
  })
  const handleLogin = () => {
    navigate({
      to: '/',
    })
  }
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <ModeToggle />
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold">Lyceum</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Por favor ingresa con tu cuenta
            </p>
          </div>
          <Form {...form}>
            <form
              className="mt-8 space-y-2"
              onSubmit={form.handleSubmit(handleLogin)}
            >
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="remember-me"
                render={({ field }) => (
                  <div className="flex justify-between">
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          id="remember-me"
                          onCheckedChange={field.onChange}
                          checked={field.value}
                        />
                      </FormControl>
                      <FormLabel htmlFor="remember-me">Recuerdame</FormLabel>
                    </FormItem>

                    <div className="text-sm underline text-muted-foreground">
                      <Link href="#">¿Olvidó su contraseña?</Link>
                    </div>
                  </div>
                )}
              />

              <div>
                <Button type="submit" className="w-full">
                  Ingresar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:flex  w-full md:w-1/2 bg-gray-100">
        <div className="h-full w-full relative">
          <img
            src="https://files.pucp.education/puntoedu/wp-content/uploads/2021/03/31184656/campus-pucp-cia-letras-2020_03-1920x1080-1.jpg"
            alt="Login visual"
            className="h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
      </div>
    </div>
  )
}

const formSchema = z.object({
  email: z
    .string({
      required_error: 'Ingrese su correo',
    })
    .email('Ingrese un correo válido'),
  password: z
    .string({
      required_error: 'Ingrese su contraseña',
    })
    .min(1, 'Ingrese su contraseña'),
})
