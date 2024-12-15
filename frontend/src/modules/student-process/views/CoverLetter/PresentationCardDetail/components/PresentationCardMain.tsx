import { ScrollArea } from '@frontend/components/ui/scroll-area'
import { Separator } from '@frontend/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@frontend/components/ui/table'
import { QueryKeys } from '@frontend/constants/queryKeys'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { useNavigate, useParams } from '@tanstack/react-router'
import { Badge } from '@frontend/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@frontend/components/ui/card'
import PresentationCardService from '@frontend/modules/student-process/services/presentationCard.service'
import { mapCoverLetterStatus } from '../../components/columns'
import { Button } from '@frontend/components/ui/button'
import { useSessionStore } from '@frontend/store'
import { StudentProcessPermissionsDict } from '@frontend/interfaces/enums/permissions/StudentProcess'
import { toast } from '@frontend/hooks/use-toast'
import { Input } from '@frontend/components/ui/input'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@frontend/components/ui/form'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import DownloadDoc from './DownloadDoc'

export default function CoverLetterDetailMain() {
  const { requestCode } = useParams({
    from: '/_auth/procesos-de-estudiantes/cartas-de-presentacion/$requestCode',
  })
  const { data: presentationCardRequestDetail } = useSuspenseQuery({
    queryKey: [
      QueryKeys.presentationCards.PRESENTATION_LETTERS_REQUESTS,
      requestCode,
    ],
    queryFn: () =>
      PresentationCardService.getPresentationCardDetail(+requestCode),
  })

  const presentationCard = presentationCardRequestDetail
  const { havePermission } = useSessionStore()

  const [decision, setDecision] = useState<string | null>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const navigate = useNavigate({
    from: '/procesos-de-estudiantes/cartas-de-presentacion',
  })
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: {
      presentationCard: z.infer<typeof formSchema>
      id: string
      state: string
    }) => {
      if (data.presentationCard.documentFile) {
        await PresentationCardService.updatePresentationCard({
          presentationCard: data.presentationCard,
          id: data.id,
        })
      }
      await PresentationCardService.AproveOrDenegateCard(+data.id, data.state)
    },
    onSuccess: () => {
      toast({
        title: 'Operación exitosa',
        description: 'La operación se ha realizado exitosamente.',
      })
      queryClient.invalidateQueries({
        queryKey: [
          QueryKeys.presentationCards.PRESENTATION_LETTERS_REQUESTS,
          requestCode,
        ],
      })
      navigate({
        to: '/procesos-de-estudiantes/cartas-de-presentacion',
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Hubo un problema al subir el archivo.',
        variant: 'destructive',
      })
    },
  })
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (decision === 'accepted' && !data.documentFile) {
      toast({
        title: 'Error',
        description:
          'En el caso de aprobar la solicitud, debe seleccionar un archivo.',
        variant: 'destructive',
      })
      return // Detener la ejecución si no cumple con la validación
    }
    mutate({
      presentationCard: { documentFile: data.documentFile || undefined },
      id: requestCode,
      state: decision!,
    })
  }

  const { mutate: mutate2, isPending: isPending2 } = useMutation({
    mutationFn: async (data: {
      presentationCard: z.infer<typeof formSchema>
      id: string
      state: string
    }) => {
      if (data.presentationCard.documentFile) {
        await PresentationCardService.updatePresentationCard({
          presentationCard: data.presentationCard,
          id: data.id,
        })
      }
      await PresentationCardService.AproveOrDenegateCard(+data.id, data.state)
    },
    onSuccess: () => {
      toast({
        title: 'Operación exitosa',
        description: 'La operación se ha realizado exitosamente.',
      })
      queryClient.invalidateQueries({
        queryKey: [
          QueryKeys.presentationCards.PRESENTATION_LETTERS_REQUESTS,
          requestCode,
        ],
      })
      navigate({
        to: '/procesos-de-estudiantes/cartas-de-presentacion',
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Hubo un problema al subir el archivo.',
        variant: 'destructive',
      })
    },
  })
  const onSubmit2 = (data: z.infer<typeof formSchema>) => {
    if (!data.documentFile) {
      toast({
        title: 'Error',
        description: 'Debe seleccionar un archivo.',
        variant: 'destructive',
      })
      return // Detener la ejecución si no cumple con la validación
    }
    mutate2({
      presentationCard: { documentFile: data.documentFile || undefined },
      id: requestCode,
      state: decision!,
    })
  }

  return (
    <div className="flex h-full flex-col overflow-y-hidden">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">
          Solicitud Nro. {presentationCard.id}
        </h1>
        <Badge
          variant={
            presentationCard.status === 'accepted'
              ? 'default'
              : presentationCard.status === 'rejected'
                ? 'destructive'
                : 'secondary'
          }
        >
          {mapCoverLetterStatus[presentationCard.status]}
        </Badge>
      </div>
      <Separator />
      <ScrollArea className="flex-grow">
        <div className="p-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detalles de la solicitud</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-bold mb-2">Nombre de la Empresa</h3>
                <p>{presentationCard.companyName}</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Descripcion</h3>
                <p>{presentationCard.detail}</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Curso y Horario</h3>
                <p>
                  {presentationCard.scheduleCode} -{' '}
                  {presentationCard.courseName}
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Solicitante(s)</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Nombre</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {presentationCard.accounts?.map((account) => (
                      <TableRow key={account.id}>
                        <TableCell>{account.code}</TableCell>
                        <TableCell>{`${account.name} ${account.firstSurname} ${account.secondSurname}`}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
        {presentationCard.status === 'sent' &&
          havePermission(
            StudentProcessPermissionsDict.APPROVE_PRESENTATION_LETTER
          ) && (
            <>
              <div className="p-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Responder solicitud</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center y-4">
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:w-[600px]"
                        >
                          <FormField
                            control={form.control}
                            name="documentFile"
                            // eslint-disable-next-line
                            render={({
                              field: { value, onChange, ...filedProps },
                            }) => (
                              <FormItem className="col-span-1 md:col-span-2">
                                <FormLabel className="inline-block hover:underline w-auto">
                                  Archivo
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="w-full"
                                    {...filedProps}
                                    type="file"
                                    accept=".doc,.docx,.pdf"
                                    onChange={(e) =>
                                      onChange(
                                        e.target.files && e.target.files[0]
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex items-center justify-center gap-6 w-full">
                            <Button
                              type="submit"
                              variant="outline"
                              className="w-32"
                              disabled={isPending}
                              onClick={() => setDecision('rejected')}
                            >
                              {isPending ? (
                                <Loader2 className="animate-spin" />
                              ) : (
                                'Rechazar'
                              )}
                            </Button>
                            <Button
                              type="submit"
                              className="w-32"
                              disabled={isPending}
                              onClick={() => setDecision('accepted')}
                            >
                              {isPending ? (
                                <Loader2 className="animate-spin" />
                              ) : (
                                'Aprobar'
                              )}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        {presentationCard.documentId &&
          (havePermission(
            StudentProcessPermissionsDict.REVIEW_PRESENTATION_LETTER
          ) ||
            havePermission(
              StudentProcessPermissionsDict.APPROVE_PRESENTATION_LETTER
            )) &&
          presentationCard.status !== 'succeeded' && (
            <div className="p-4">
              <Card>
                <CardHeader>
                  <CardTitle>Documento adjunto</CardTitle>
                </CardHeader>
                <CardContent>
                  <DownloadDoc
                    docId={presentationCard.documentId} // Usamos la ID del documento asociado
                    docName="Carta de presentación" // Puede ser un nombre dinámico o estático
                    message="Descargar documento"
                  />
                  {havePermission(
                    StudentProcessPermissionsDict.REVIEW_PRESENTATION_LETTER
                  ) &&
                    presentationCard.status !== 'rejected' && (
                      <div className="mt-6">
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit2)}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:w-[600px]"
                          >
                            <FormField
                              control={form.control}
                              name="documentFile"
                              // eslint-disable-next-line
                              render={({
                                field: { value, onChange, ...filedProps },
                              }) => (
                                <FormItem className="col-span-1 md:col-span-2">
                                  <FormLabel className="inline-block hover:underline w-auto">
                                    Actualizar archivo
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      className="w-full"
                                      {...filedProps}
                                      type="file"
                                      accept=".doc,.docx,.pdf"
                                      onChange={(e) =>
                                        onChange(
                                          e.target.files && e.target.files[0]
                                        )
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button
                              type="submit"
                              className="w-full"
                              disabled={isPending2}
                              onClick={() => setDecision('succeeded')}
                            >
                              {isPending2 ? (
                                <Loader2 className="animate-spin" />
                              ) : (
                                'Actualizar documento'
                              )}
                            </Button>
                          </form>
                        </Form>
                      </div>
                    )}
                </CardContent>
              </Card>
            </div>
          )}
        {presentationCard.documentId &&
          presentationCard.status === 'succeeded' && (
            <div className="p-4">
              <Card>
                <CardHeader>
                  <CardTitle>Documento adjunto</CardTitle>
                </CardHeader>
                <CardContent>
                  <DownloadDoc
                    docId={presentationCard.documentId} // Usamos la ID del documento asociado
                    docName="Carta de presentación" // Puede ser un nombre dinámico o estático
                    message="Descargar documento"
                  />
                </CardContent>
              </Card>
            </div>
          )}
        {presentationCard.documentId &&
          presentationCard.status === 'rejected' &&
          !havePermission(
            StudentProcessPermissionsDict.REVIEW_PRESENTATION_LETTER
          ) &&
          !havePermission(
            StudentProcessPermissionsDict.APPROVE_PRESENTATION_LETTER
          ) && (
            <div className="p-4">
              <Card>
                <CardHeader>
                  <CardTitle>Documento adjunto</CardTitle>
                </CardHeader>
                <CardContent>
                  <DownloadDoc
                    docId={presentationCard.documentId} // Usamos la ID del documento asociado
                    docName="Carta de presentación" // Puede ser un nombre dinámico o estático
                    message="Descargar documento"
                  />
                </CardContent>
              </Card>
            </div>
          )}
      </ScrollArea>
    </div>
  )
}

export const formSchema = z.object({
  documentFile: z.instanceof(File).optional(),
})

export type PresentationCardFormDocumentValues = z.infer<typeof formSchema>
