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
import { QueryKeys } from '@/constants/queryKeys'
import { useToast } from '@/hooks/use-toast'
import { ThesisPermissionsDict } from '@/interfaces/enums/permissions/Thesis'
import ThesisThemeRequestService from '@/modules/thesis/services/ThesisThemeRequest.service'
import { useSessionStore } from '@/store'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function ThesisUploadCorrections() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { session, havePermission, getRoleWithPermission } = useSessionStore()
  const { requestCode } = useParams({
    from: '/_auth/tesis/tema-tesis/$requestCode',
  })
  const { data: thesisDetail, refetch } = useSuspenseQuery({
    queryKey: [QueryKeys.thesis.THESIS_REQUEST_DETAIL, requestCode],
    queryFn: () => ThesisThemeRequestService.getThemeRequestDetail(requestCode),
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
    onError: ({ message }) => {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: message,
      })
    },
  })
  const form = useForm({
    resolver: zodResolver(formSchema),
  })
  const canUploadCorrections =
    thesisDetail.phase === 0 &&
    havePermission(ThesisPermissionsDict.CREATE_THESIS)

  const handleSubmit = () => {
    const formData = new FormData()
    formData.append('file', form.getValues('file'))
    mutate({
      accountId: session!.id,
      action: 'sended',
      code: requestCode,
      isFile: true,
      content: 'Correcciones de tesis',
      roleId: getRoleWithPermission(ThesisPermissionsDict.CREATE_THESIS)!
        .roleId,
    })
  }
  return (
    <>
      {canUploadCorrections && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              name="file"
              
              // eslint-disable-next-line
              render={({ field: { value, onChange, ...filedProps } }) => (
                <FormItem>
                  <FormLabel>Subir correcciones</FormLabel>
                  <FormControl>
                    <Input
                      {...filedProps}
                      type="file"
                      accept=".doc,.docx,.pdf,.csv"
                      onChange={(e) =>
                        onChange(e.target.files && e.target.files[0])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  'Subir archivo'
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  )
}
const formSchema = z.object({
  file: z.instanceof(File, { message: 'Debe seleccionar un archivo' }),
})
