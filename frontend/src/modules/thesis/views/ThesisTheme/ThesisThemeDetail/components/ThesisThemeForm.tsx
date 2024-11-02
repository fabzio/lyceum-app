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
import { Label } from '@frontend/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@frontend/components/ui/radio-group'
import { Switch } from '@frontend/components/ui/switch'
import { Textarea } from '@frontend/components/ui/textarea'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { useToast } from '@frontend/hooks/use-toast'
import { ThesisPermissionsDict } from '@frontend/interfaces/enums/permissions/Thesis'
import ThesisThemeRequestService from '@frontend/modules/thesis/services/ThesisThemeRequest.service'
import { useSessionStore } from '@frontend/store'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { useNavigate, useParams } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function ThesisThemeForm() {
  const { session, getRoleWithPermission, havePermission } = useSessionStore()
  const { requestCode } = useParams({
    from: '/_auth/tesis/tema-tesis/$requestCode',
  })
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const navigate = useNavigate({
    from: '/tesis/propuesta-jurados/$requestCode',
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      action: 'undefined',
      content: '',
      isFile: false,
    },
  })
  const { mutate, isPending } = useMutation({
    mutationFn: ThesisThemeRequestService.insertThesisThemeReview,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.thesis.THESIS_REQUESTS_HISTORY, requestCode],
      })
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.thesis.THESIS_REQUESTS],
      })
      refetch()
    },
  })
  const {
    data: thesisDetail,
    refetch,
    isError,
  } = useSuspenseQuery({
    queryKey: [QueryKeys.thesis.THESIS_REQUEST_DETAIL, requestCode],
    queryFn: () => ThesisThemeRequestService.getThemeRequestDetail(requestCode),
  })
  if (isError) {
    toast({
      title: 'Error',
      description: 'No se pudo obtener la información de la tesis',
    })
    navigate({
      to: '/tesis/propuesta-jurados',
    })
  }

  const permissionRequeriment = mapPermissionPhase[thesisDetail.phase]
  const canReview =
    havePermission(permissionRequeriment) && thesisDetail.phase !== 0

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (data.action === 'undefined') {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: 'Debes seleccionar una acción',
      })
      return
    }
    form.reset()
    mutate({
      accountId: session!.id,
      action: data.action,
      code: requestCode,
      isFile: data.isFile,
      roleId: getRoleWithPermission(permissionRequeriment)!.roleId,
      content: data.isFile ? 'file-url' : data.content,
    })
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 mb-5"
      >
        {canReview && (
          <>
            {' '}
            <FormField
              control={form.control}
              name="action"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Respuesta </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      orientation="horizontal"
                      className="flex"
                    >
                      <RadioGroupItem hidden value="undefined" />
                      <div>
                        <RadioGroupItem id="r1" value="approved" />
                        <Label className="ml-1" htmlFor="r1">
                          Aprobar
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem id="r2" value="denied" />
                        <Label className="ml-1" htmlFor="r2">
                          Observar
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="content"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comentario</FormLabel>
                  <FormControl>
                    {form.watch('isFile') ? (
                      <Input
                        type="file"
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        placeholder="Subir archivo"
                      />
                    ) : (
                      <Textarea
                        value={field.value as string}
                        onChange={field.onChange}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="isFile"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Subir archivos</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" disabled={isPending || !canReview}>
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Enviar respuesta'
              )}
            </Button>
          </>
        )}
      </form>
    </Form>
  )
}

const formSchema = z.object({
  action: z.enum(['approved', 'denied', 'undefined'], {
    required_error: 'Este campo es requerido',
  }),
  isFile: z.boolean({
    required_error: 'Este campo es requerido',
  }),
  content: z.union([
    z
      .string({
        required_error: 'Este campo es requerido',
      })
      .min(1)
      .max(255),
    z.instanceof(Blob),
  ]),
  file: z.instanceof(FileList).optional(),
})

const mapPermissionPhase: Record<0 | 1 | 2 | 3, ThesisPermissionsDict> = {
  0: 'CREATE_THESIS',
  1: 'APROVE_THESIS_PHASE_1',
  2: 'APROVE_THESIS_PHASE_2',
  3: 'APROVE_THESIS_PHASE_3',
}
