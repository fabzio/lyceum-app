'use client'

import { Button } from '@frontend/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@frontend/components/ui/form'
import { Input } from '@frontend/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@frontend/components/ui/select'
import { ModeToggle } from '@frontend/layouts/components/ModeToggle'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSearch, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { useToast } from '@frontend/hooks/use-toast'
import { QueryKeys } from '@frontend/constants/queryKeys'
import SignInService from '../service/signInService'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'

export default function SignUpPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { email, googleId, name, firstSurname } = useSearch({
    from: '/sign-in',
  })

  const capitalizeWords = (input: string) => {
    if (!input) return ''
    return input
      .split('+')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  const [hasExecuted, setHasExecuted] = useState(false) // Track execution

  const requestData = {
    name: capitalizeWords(name) || undefined,
    firstSurname: capitalizeWords(firstSurname).split(' ')[0] || undefined,
    secondSurname: capitalizeWords(firstSurname).split(' ')[1] || undefined,
    email,
  }

  const { data: newAccount } = useQuery({
    queryKey: [QueryKeys.hiring.HIRINGS],
    queryFn: async () => {
      if (!hasExecuted) {
        setHasExecuted(true) // Mark as executed
        const response = await SignInService.postNewAccount(
          googleId,
          email,
          requestData.name,
          requestData.firstSurname,
          requestData.secondSurname
        )
        return response // Return only the nested `data` field
      }
      return null // Skip query if it has already executed
    },
    enabled: !hasExecuted,
  })

  const formSchema = z
    .object({
      nombres: z.string().min(1, 'Ingrese sus nombres'),
      primerApellido: z.string().min(1, 'Ingrese su primer apellido'),
      segundoApellido: z.string().optional(),
      tipoDoc: z.enum(['national', 'foreign']),
      numeroDoc: z.string().min(1, 'Ingrese número de documento'),
      telefonoCelular: z.string().min(1, 'Ingrese teléfono celular'),
      telefonoAdicional: z.string().optional(),
      email: z.string(),
      googleId: z.string(),
    })
    .superRefine((data, ctx) => {
      if (data.tipoDoc === 'national' && data.numeroDoc.length != 8) {
        ctx.addIssue({
          code: 'custom',
          message:
            'El número de documento debe contener máximo 8 dígitos numéricos.',
          path: ['numeroDoc'],
        })
      }
    })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombres: requestData.name,
      primerApellido: capitalizeWords(firstSurname).split(' ')[0] || '',
      segundoApellido: capitalizeWords(firstSurname).split(' ')[1] || '',
    },
  })

  const handleSignUp = () => {
    const data: z.infer<typeof formSchema> = {
      nombres: form.getValues('nombres'),
      primerApellido: form.getValues('primerApellido'),
      segundoApellido: form.getValues('segundoApellido') || undefined, // Ensure you get the current form value
      tipoDoc: form.getValues('tipoDoc'),
      numeroDoc: form.getValues('numeroDoc'),
      telefonoCelular: form.getValues('telefonoCelular'),
      telefonoAdicional: form.getValues('telefonoAdicional') || undefined,
      email: email,
      googleId: googleId,
    }
    createAccount.mutate(data)
  }

  const createAccount = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => {
      SignInService.postContactInfo(
        String(newAccount),
        data.nombres,
        data.primerApellido,
        String(data.telefonoCelular),
        data.tipoDoc,
        data.numeroDoc,
        String(data.telefonoAdicional),
        String(data.segundoApellido)
      )
      return Promise.resolve({ success: true })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.hiring.HIRINGS],
      })
      toast({
        title: 'Usuario registrado correctamente',
        description: 'El registro de cuenta ha culminado con éxito',
      })
      navigate({
        to: '/',
      })
    },
    onError: (error: Error) => {
      toast({
        title: 'Error de registro',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const handleGoBack = () => {
    navigate({
      to: '/login',
    })
  }

  useEffect(() => {
    if (!hasExecuted) {
      setHasExecuted(true)
    }
  }, [hasExecuted])

  return (
    <div>
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="w-full h-screen md:w-1/2 flex items-center justify-center p-8 relative overflow-hidden">
          <span className="absolute right-2 top-2">
            <ModeToggle />
          </span>
          <div className="w-full max-w-md space-y-8 overflow-y-auto h-full px-4 py-6">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-bold">
                Registro de postulante
              </h2>
            </div>
            <Form {...form}>
              <form
                className="mt-8 space-y-6"
                onSubmit={form.handleSubmit(handleSignUp)}
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Nombre de postulante
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="nombres"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre(s)*</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="primerApellido"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primer Apellido*</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="segundoApellido"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Segundo Apellido</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Identificación*</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="tipoDoc"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Doc. Identificación</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="national">DNI</SelectItem>
                              <SelectItem value="foreign">
                                Carné de Extranjería
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="numeroDoc"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Contacto</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="telefonoCelular"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono celular*</FormLabel>
                          <FormControl>
                            <Input {...field} type="tel" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="telefonoAdicional"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono adicional</FormLabel>
                          <FormControl>
                            <Input {...field} type="tel" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex gap-4 justify-end">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleGoBack}
                  >
                    Regresar
                  </Button>
                  <Button type="submit" onClick={handleSignUp}>
                    Registrarse
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>

        <div className="hidden md:flex w-full md:w-1/2 bg-gray-100">
          <div className="h-full w-full relative">
            <img
              src="https://files.pucp.education/puntoedu/wp-content/uploads/2021/03/31184656/campus-pucp-cia-letras-2020_03-1920x1080-1.jpg"
              alt="Registration visual"
              className="h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </div>
        </div>
      </div>
    </div>
  )
}
