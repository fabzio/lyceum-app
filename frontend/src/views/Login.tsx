import { Button } from '@frontend/components/ui/button'
import { Checkbox } from '@frontend/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@frontend/components/ui/form'
import { Input } from '@frontend/components/ui/input'
import { ModeToggle } from '@frontend/layouts/components/ModeToggle'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import moment from 'moment'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import GoogleButton from './components/GoogleButton'
import { useMutation } from '@tanstack/react-query'
import http from '@frontend/lib/http'
import { useToast } from '@frontend/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import { Session } from '@frontend/store'
import axios from 'axios'

export default function LoginPage() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { code: string; password: string }) => {
      try {
        const res = await http.post('/auth/signin', data)
        const respose = res.data as ResponseAPI<NonNullable<Session>>
        if (!respose.success) throw new Error(respose.message)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data.message || error.message)
        }
        throw error
      }
    },
    onSuccess: () => {
      window.location.href = '/'
    },
    onError: ({ message }) => {
      toast({
        title: 'Error al iniciar sesión',
        description: message,
        variant: 'destructive',
      })
    },
  })
  const handleLogin = (data: z.infer<typeof formSchema>) => {
    mutate(data)
  }
  return (
    <div>
      <div className="min-h-screen flex flex-col md:flex-row ">
        <div className="w-full h-screen md:w-1/2 flex items-center justify-center p-8 relative">
          <span className="absolute right-2 top-2">
            <ModeToggle />
          </span>
          <div className="absolute bottom-2 w-full flex justify-center text-muted-foreground font-semibold hover:underline">
            <a href="https://github.com/BugBusters2024" target="_blank">
              🚫🐞 BugBusters {moment().year()}
            </a>
          </div>
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <span className="text-8xl">🏛️</span>
              <h2 className="mt-6 text-3xl font-bold">Lyceum</h2>
              <p className="mt-2 text-sm text-muted-foreground text-balance">
                Bienvenid@ al sistema de gestión académica y administrativa de
                la PUCP
              </p>
            </div>
            <Form {...form}>
              <form
                className="mt-8 space-y-2"
                onSubmit={form.handleSubmit(handleLogin)}
              >
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usuario</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Ingrese su correo o código"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
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
                <div className="flex flex-col gap-1">
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      'Iniciar sesión'
                    )}
                  </Button>
                  <GoogleButton />
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
    </div>
  )
}

const formSchema = z.object({
  code: z.string({
    required_error: 'Ingrese su código o correo',
  }),
  password: z
    .string({
      required_error: 'Ingrese su contraseña',
    })
    .min(1, 'Ingrese su contraseña'),
})
