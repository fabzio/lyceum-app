import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { QueryKeys } from '@/constants/queryKeys'
import { useToast } from '@/hooks/use-toast'
import ThesisThemeRequestService from '@/modules/thesis/services/ThesisThemeRequest.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface Props {
  requestCode: string
}
export default function ThesisThemeForm({ requestCode }: Props) {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const navigate = useNavigate({
    from: '/tesis/propuesta-jurados/$requestCode',
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
  } = useQuery({
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
  const alreayReviewed =
    thesisDetail?.lastAction?.account === 'd64a8b97-6373-48ab-a106-bff68293e968'

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate({
      accountId: 'd64a8b97-6373-48ab-a106-bff68293e968',
      action: data.action,
      code: requestCode,
      isFile: data.isFile,
      roleId: 3,
      content: data.isFile ? 'file-url' : data.content,
    })
    form.reset()
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 mb-5"
      >
        {!alreayReviewed && (
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
                      defaultValue={field.value}
                      orientation="horizontal"
                      className="flex"
                    >
                      <div>
                        <RadioGroupItem id="r1" value="approved">
                          Aprobado
                        </RadioGroupItem>
                        <Label htmlFor="r1">Aprobar</Label>
                      </div>
                      <div>
                        <RadioGroupItem id="r2" value="denied">
                          Denegado
                        </RadioGroupItem>
                        <Label htmlFor="r2">Observar</Label>
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
          </>
        )}
        <Button className="w-full" disabled={isPending || alreayReviewed}>
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : alreayReviewed ? (
            'Respuesta enviada'
          ) : (
            'Enviar respuesta'
          )}
        </Button>
      </form>
    </Form>
  )
}

const formSchema = z.object({
  action: z.enum(['approved', 'denied'], {
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
