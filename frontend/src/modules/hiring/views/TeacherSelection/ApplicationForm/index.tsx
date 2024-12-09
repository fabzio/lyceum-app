import PageLayout from '@frontend/layouts/PageLayout'
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from '@frontend/components/ui/tabs'
import { useSearch } from '@tanstack/react-router'
// import { useSessionStore } from '@frontend/store'
// import { HiringPermissionsDict } from '@frontend/interfaces/enums/permissions/Hiring'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@frontend/components/ui/form'
import { Textarea } from '@frontend/components/ui/textarea'
import { Button } from '@frontend/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useToast } from '@frontend/hooks/use-toast'
import { useQuery } from '@tanstack/react-query'
import { Loader2, Upload } from 'lucide-react'
import { QueryKeys } from '@frontend/constants/queryKeys'
import HiringService from '@frontend/modules/hiring/Services/Hirings.service'

export default function ApplicationForm() {
  const { courseName, courseId, hiringId } = useSearch({
    from: '/_auth/contrataciones/seleccion-docentes/$hiringProcessId/postulacion',
  })

  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const { data: requirements /*isLoading: isLoadingRequirements */ } = useQuery(
    {
      queryKey: [QueryKeys.hiring.HIRINGS, courseName],
      queryFn: () => HiringService.getRequirements(+hiringId, courseId),
    }
  )

  // const { mutate, isPending } = useMutation({
  //   mutationFn: HiringService.,
  //   onSuccess: () => {
  //     toast({
  //       title: 'Aplicación enviada',
  //       description: 'Tu aplicación ha sido registrada correctamente',
  //     })
  //   },
  //   onError: ({ message }) => {
  //     toast({
  //       title: 'Error',
  //       description: message,
  //       variant: 'destructive',
  //     })
  //   },
  // })

  // const onSubmit = (data: z.infer<typeof formSchema>) => {
  //   mutate({
  //     ...data,
  //     // courseName,
  //   })
  // }

  return (
    <PageLayout name="Aplicación para Docente">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">
          Aplicación para {courseName}
        </h1>
        {0 ? (
          <Loader2 className="animate-spin" />
        ) : (
          <div className="p-4 rounded-lg">
            <h2 className="font-semibold mb-2">Requisitos:</h2>
            <ul className="list-disc list-inside">
              {requirements?.map((req, index) => (
                <li key={index}>{req.detail}</li>
              ))}
            </ul>
          </div>
        )}
        <Form {...form}>
          {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"> */}
          <FormField
            control={form.control}
            name="motivation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Motivación</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Escribe tu motivación para aplicar a este puesto"
                    className="h-40"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="documents"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel>Documentos requeridos</FormLabel>
                <FormControl>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 mb-3" />
                        <p className="mb-2 text-sm">
                          <span className="font-semibold">
                            Click para subir
                          </span>{' '}
                          o arrastra y suelta
                        </p>
                        <p className="text-xs">ZIP (MAX. 10MB)</p>
                      </div>
                      <input
                        {...rest}
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept=".zip"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file && file.type === 'application/zip') {
                            onChange(file)
                          } else {
                            toast({
                              title: 'Error',
                              description:
                                'Por favor, sube un archivo ZIP válido.',
                              variant: 'destructive',
                            })
                          }
                        }}
                      />
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            // disabled={isPending}
          >
            Enviar
            {/* {isPending ? <Loader2 className="animate-spin" /> : 'Enviar aplicación'} */}
          </Button>
        </Form>
      </div>
    </PageLayout>
  )
}

const formSchema = z.object({
  motivation: z
    .string()
    .max(1000, 'La motivación no debe exceder los 1000 caracteres'),
  documents: z
    .instanceof(File, {
      message: 'Debes subir un archivo ZIP con los documentos requeridos',
    })
    .refine(
      (file) => file.size <= 10 * 1024 * 1024,
      'El archivo no debe exceder los 10MB'
    ),
})
