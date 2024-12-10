import { Button } from '@frontend/components/ui/button.tsx'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@frontend/components/ui/form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@frontend/components/ui/dialog'
import { useForm, useFieldArray } from 'react-hook-form'
import { Textarea } from '@frontend/components/ui/textarea'
import { Slider } from '@frontend/components/ui/slider'
import { Input } from '@frontend/components/ui/input'
import { Card, CardContent } from '@frontend/components/ui/card'
import { Progress } from '@frontend/components/ui/progress'
import { ScrollArea } from '@frontend/components/ui/scroll-area'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { useToast } from '@frontend/hooks/use-toast'
import { Download, Loader2 } from 'lucide-react'
import HiringService from '@frontend/modules/hiring/Services/Hirings.service'
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query'
import { HiringRequirement } from '@frontend/interfaces/models/HiringRequirement'
import { PermissionCode } from '@frontend/interfaces/enums/permissions'
import { HiringPermissionsDict } from '@frontend/interfaces/enums/permissions/Hiring'

interface Props {
  application: {
    id: string
    name: string
    email: string
    jobRequestStatus: string
    courseName: string | undefined
    jobRequestId: number
    requirements: HiringRequirement[] | null
    havePermission?: (permission: PermissionCode) => boolean
  }
  handleClose: () => void
}

export function ViewApplication({ application, handleClose }: Props) {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      jobRequestId: application.jobRequestId,
    },
    resolver: zodResolver(formSchema),
  })

  const approveMutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => {
      queryKey: [QueryKeys.hiring.HIRINGS, application.jobRequestId]
      HiringService.updateApplication(data, 'to_evaluate')
      return Promise.resolve({ success: true })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.hiring.HIRINGS],
      })
      toast({
        title: 'Aplicación aprobada',
        description: 'La aplicación del postulante sido aprobada correctamente',
      })
      handleClose()
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const rejectMutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => {
      queryKey: [QueryKeys.hiring.HIRINGS, application.jobRequestId]
      HiringService.updateApplication(data, 'rejected')
      return Promise.resolve({ success: true })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.hiring.HIRINGS],
      })
      toast({
        title: 'Aplicación rechazada',
        description:
          'La aplicación del postulante ha sido rechazada correctamente',
      })
      handleClose()
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const onApprove = () => {
    const data: z.infer<typeof formSchema> = {
      observation: form.getValues('observation') || '',
      jobRequestId: application.jobRequestId, // Ensure you get the current form value
    }
    approveMutation.mutate(data)
  }

  const onReject = () => {
    const data: z.infer<typeof formSchema> = {
      observation: form.getValues('observation') || '',
      jobRequestId: application.jobRequestId, // Ensure you get the current form value
    }
    rejectMutation.mutate(data)
  }

  const { data: aboutApplicant } = useQuery({
    queryKey: [QueryKeys.hiring.HIRINGS, application.jobRequestId],
    queryFn: () =>
      HiringService.getMotivation(String(application.jobRequestId)),
    placeholderData: keepPreviousData,
  })

  const onDonwnload = () => {
    downloadMutation.mutate()
  }

  const downloadMutation = useMutation({
    mutationFn: () => {
      queryKey: [QueryKeys.hiring.HIRINGS, application.name]
      HiringService.getRequieredDocuments(String(aboutApplicant?.documentId))
      return Promise.resolve({ success: true })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.hiring.HIRINGS],
      })
      toast({
        title: 'Documentos descargados',
        description: 'Se descargó la documentación anexada',
      })
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Revisar postulación
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium">
                {(application.courseName || '').replace(/\+/g, ' ')}
              </h3>
              <p className="text-muted-foreground">{application.name}</p>
              <Button
                variant="outline"
                className="justify-start gap-2 w-42 mt-2"
                onClick={form.handleSubmit(onDonwnload)}
              >
                <Download className="h-4 w-4" />
                Descargar documentos
              </Button>
            </div>
            <div>
              {application.requirements &&
                application.requirements.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Requisitos:</h4>
                    <ul className="list-disc pl-5 text-sm">
                      {application.requirements.map((req, index) => (
                        <li key={index}>{req.detail}</li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Motivación</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {aboutApplicant?.motivation}
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onApprove)} className="space-y-6">
              <FormField
                control={form.control}
                name="observation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observación</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Comentario" // Always show 'Comentario' as the placeholder
                        value={field.value ?? aboutApplicant?.observation ?? ''} // Use the saved observation if no current value
                        onFocus={(e) => {
                          if (e.target.value === 'Comentario') {
                            field.onChange('') // Clear the placeholder text when focused
                          }
                        }}
                        onChange={(e) => field.onChange(e.target.value)} // Update the value on user input
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={form.handleSubmit(onReject)}
                  disabled={
                    approveMutation.isPending || rejectMutation.isPending
                  }
                >
                  {rejectMutation.isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    'Rechazar'
                  )}
                </Button>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    approveMutation.isPending || rejectMutation.isPending
                  }
                >
                  {approveMutation.isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    'Aprobar'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function DoEvaluation({ application, handleClose }: Props) {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof evaluationSchema>>({
    defaultValues: {
      jobRequestId: application.jobRequestId,
      evaluationList:
        application.requirements?.map((req) => ({
          courseHiringRequirementId: req.id.toString(),
          score: 5,
        })) || [],
    },
    resolver: zodResolver(evaluationSchema),
  })

  const { fields } = useFieldArray({
    control: form.control,
    name: 'evaluationList',
  })

  const evaluateMutation = useMutation({
    mutationFn: (data: z.infer<typeof evaluationSchema>) => {
      return HiringService.updateApplication(data, 'evaluated')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.hiring.HIRINGS],
      })
      toast({
        title: 'Evaluación enviada',
        description:
          'La evaluación del postulante ha sido enviada correctamente',
      })
      handleClose()
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const onSubmit = (data: z.infer<typeof evaluationSchema>) => {
    evaluateMutation.mutate(data)
  }

  const { data: aboutApplicant } = useQuery({
    queryKey: [QueryKeys.hiring.HIRINGS, application.jobRequestId],
    queryFn: () =>
      HiringService.getMotivation(String(application.jobRequestId)),
    placeholderData: keepPreviousData,
  })

  const getSliderColor = (value: number) => {
    if (value <= 3.33) return 'bg-gradient-to-r from-red-500 to-yellow-500'
    if (value <= 6.66) return 'bg-gradient-to-r from-yellow-500 to-green-500'
    return 'bg-gradient-to-r from-green-500 to-green-600'
  }

  const onDonwnload = () => {
    downloadMutation.mutate()
  }

  const downloadMutation = useMutation({
    mutationFn: () => {
      queryKey: [QueryKeys.hiring.HIRINGS, application.name]
      HiringService.getRequieredDocuments(String(aboutApplicant?.documentId))
      return Promise.resolve({ success: true })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.hiring.HIRINGS],
      })
      toast({
        title: 'Documentos descargados',
        description: 'Se descargó la documentación anexada',
      })
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Evaluar postulación
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">
                    {(application.courseName || '').replace(/\+/g, ' ')}
                  </h3>
                  <p className="text-muted-foreground">{application.name}</p>
                </div>

                <Button
                  variant="outline"
                  className="justify-start gap-2 w-42"
                  onClick={form.handleSubmit(onDonwnload)}
                >
                  <Download className="h-4 w-4" />
                  Descargar documentos
                </Button>

                <div className="space-y-2">
                  <h3 className="font-medium">Motivación</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {aboutApplicant?.motivation}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Observación</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {aboutApplicant?.observation}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Evaluación de Requisitos</h3>
                  {fields.map((field, index) => (
                    <FormField
                      key={field.id}
                      control={form.control}
                      name={`evaluationList.${index}`}
                      render={({ field: evaluationField }) => (
                        <FormItem>
                          <FormLabel>
                            {application.requirements?.[index].detail}
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center space-x-2">
                              <Input
                                type="number"
                                value={evaluationField.value.score}
                                min={0}
                                max={10}
                                step={0.1}
                                onChange={(e) =>
                                  evaluationField.onChange({
                                    ...evaluationField.value,
                                    score: parseFloat(e.target.value),
                                  })
                                }
                              />
                              <Slider
                                min={0}
                                max={10}
                                step={0.1}
                                value={[evaluationField.value.score ?? 0]}
                                onValueChange={(value) =>
                                  evaluationField.onChange({
                                    ...evaluationField.value,
                                    score: value[0],
                                  })
                                }
                                className={getSliderColor(
                                  evaluationField.value.score ?? 0
                                )}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={evaluateMutation.isPending}
              >
                {evaluateMutation.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  'Enviar evaluación'
                )}
              </Button>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export function ViewEvaluation({ application, handleClose }: Props) {
  const getScoreColor = (score: number) => {
    if (score <= 3.33) return 'bg-red-500'
    if (score <= 6.66) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const form = useForm<z.infer<typeof evaluationSchema>>({
    resolver: zodResolver(evaluationSchema),
  })

  const { toast } = useToast()
  const queryClient = useQueryClient()

  const evaluateMutation = useMutation({
    mutationFn: () => {
      const data = { jobRequestId: application.jobRequestId }
      return HiringService.updateApplication(data, 'selected')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.hiring.HIRINGS],
      })
      toast({
        title: 'Postulante seleccionado',
        description: 'El postulante ha sido seleccionado',
      })
      handleClose()
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const { data: scores } = useQuery({
    queryKey: [QueryKeys.hiring.HIRINGS, application.jobRequestId, 'scores'],
    queryFn: () => HiringService.getScores(application.jobRequestId),
    placeholderData: keepPreviousData,
  })

  const { data: aboutApplicant } = useQuery({
    queryKey: [
      QueryKeys.hiring.HIRINGS,
      application.jobRequestId,
      'motivation',
    ],
    queryFn: () =>
      HiringService.getMotivation(String(application.jobRequestId)),
    placeholderData: keepPreviousData,
  })

  const averageScore =
    Array.isArray(scores) && scores.length > 0
      ? scores.reduce((acc, req) => acc + req.score, 0) / scores.length
      : 0

  const onDonwnload = () => {
    downloadMutation.mutate()
  }

  const downloadMutation = useMutation({
    mutationFn: () => {
      queryKey: [QueryKeys.hiring.HIRINGS, application.name]
      HiringService.getRequieredDocuments(String(aboutApplicant?.documentId))
      return Promise.resolve({ success: true })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.hiring.HIRINGS],
      })
      toast({
        title: 'Documentos descargados',
        description: 'Se descargó la documentación anexada',
      })
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Evaluación de Postulación
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-4">
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">
                    {(application.courseName || '').replace(/\+/g, ' ')}
                  </h3>
                  <p className="text-muted-foreground">{application.name}</p>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    evaluateMutation.mutate()
                  }}
                >
                  {application.havePermission &&
                    application.havePermission(
                      HiringPermissionsDict.SELECT_CANDIDATE_PHASE_2
                    ) && (
                      <Button
                        type="submit"
                        disabled={evaluateMutation.isPending}
                      >
                        {evaluateMutation.isPending ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          'Seleccionar'
                        )}
                      </Button>
                    )}
                </form>
              </CardContent>
            </Card>

            <div className="flex space-x-4">
              <Button
                variant="outline"
                className="flex-1 justify-center items-center gap-2"
                onClick={form.handleSubmit(onDonwnload)}
              >
                <Download className="h-4 w-4" />
                Descargar documentos
              </Button>
            </div>

            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Motivación</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {aboutApplicant?.motivation}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Observación</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {aboutApplicant?.observation}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-4">Evaluación de Requisitos</h3>
                <div className="space-y-6">
                  {Array.isArray(scores) &&
                    scores.map((req) => (
                      <div key={req.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{req.detail}</span>
                          <span className="font-bold">
                            {req.score.toFixed(1)}
                          </span>
                        </div>
                        <Progress
                          value={req.score * 10}
                          className={`h-2 ${getScoreColor(req.score)}`}
                        />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-2">Puntaje Promedio</h3>
                <div className="flex items-center space-x-4">
                  <Progress
                    value={averageScore * 10}
                    className={`h-4 flex-grow ${getScoreColor(averageScore)}`}
                  />
                  <span className="font-bold text-lg">
                    {averageScore.toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

const formSchema = z.object({
  jobRequestId: z.coerce.number(),
  observation: z.coerce.string().optional(),
})

const evaluationSchema = z.object({
  jobRequestId: z.coerce.number(),
  evaluationList: z.array(
    z.object({
      courseHiringRequirementId: z.coerce.string(),
      score: z.coerce.number().min(0).max(10).optional(),
    })
  ),
})
