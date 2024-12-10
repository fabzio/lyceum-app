import PageLayout from '@frontend/layouts/PageLayout'
import { useSearch } from '@tanstack/react-router'
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
import { useQuery, useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { QueryKeys } from '@frontend/constants/queryKeys'
import HiringService from '@frontend/modules/hiring/Services/Hirings.service'
import { FileUpload } from '../components/UploadDocuments'
import { useSessionStore } from '@frontend/store'

const formSchema = z.object({
  motivation: z
    .string()
    .max(1000, 'La motivación no debe exceder los 1000 caracteres')
    .optional(),
  documents: z
    .instanceof(File, {
      message: 'Debes subir un archivo ZIP con los documentos requeridos',
    })
    .refine(
      (file) => file.size <= 15 * 1024 * 1024,
      'El archivo no debe exceder los 15MB'
    ),
})

type FormValues = z.infer<typeof formSchema>

export default function ApplicationForm() {
  const { courseName, courseId, hiringId, hiringProcessId } = useSearch({
    from: '/_auth/contrataciones/seleccion-docentes/postulacion',
  })

  const { toast } = useToast()
  const { session } = useSessionStore()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      motivation: '',
      documents: undefined,
    },
  })

  const { data: requirements, isLoading: isLoadingRequirements } = useQuery({
    queryKey: [QueryKeys.hiring.HIRINGS, courseName],
    queryFn: () => HiringService.getRequirements(+hiringId, courseId),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormValues) =>
      HiringService.postApplication(hiringProcessId, String(session?.id), data),
    onSuccess: () => {
      toast({
        title: 'Aplicación enviada',
        description: 'Tu aplicación ha sido registrada correctamente',
      })
    },
    onError: ({ message }) => {
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      })
    },
  })

  const onSubmit = (data: FormValues) => {
    mutate(data)
  }

  return (
    <PageLayout name="Aplicación para Docente">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">
          Aplicación para {courseName}
        </h1>
        {isLoadingRequirements ? (
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subir archivo ZIP</FormLabel>
                  <FormControl>
                    <FileUpload
                      onChange={(file) => field.onChange(file)}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isPending || !form.formState.isValid}
            >
              {isPending ? 'Enviando...' : 'Enviar Aplicación'}
            </Button>
          </form>
        </Form>
      </div>
    </PageLayout>
  )
}
