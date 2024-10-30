import QuickSearchInput from '@/components/QuickSearchInput.tsx/QuickSearchInput'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { QueryKeys } from '@/constants/queryKeys'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'
import ThesisJuryRequestService from '@/modules/thesis/services/thesisJuryRequest.service'
import AccountsService from '@/service/Accounts.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { Loader2, PlusIcon, X } from 'lucide-react'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

export default function SearchJuryDialog() {
  const queryClient = useQueryClient()
  const { requestCode } = useParams({
    from: '/_auth/tesis/propuesta-jurados/$requestCode',
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const [isOpen, setIsOpen] = useState(false)
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'jurors',
    rules: {
      maxLength: {
        value: 3,
        message: 'Máximo 3 jurados',
      },
    },
  })
  const { mutate, isPending } = useMutation({
    mutationFn: ThesisJuryRequestService.insertThesisJuries,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.thesis.THESIS_JURIES],
      })
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.thesis.THESIS_REQUEST_DETAIL, requestCode],
      })
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.thesis.THESIS_REQUESTS],
      })
      setIsOpen(false)
    },
  })

  const onSubmit = ({ jurors }: z.infer<typeof formSchema>) => {
    const codes = jurors.map((juror) => juror.code)
    mutate({
      codeList: codes,
      thesisCode: requestCode,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Asignar Jurados</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Asignar Jurados</DialogTitle>
          <DialogDescription>
            Ingresa los códigos de los jurados que participarán en la
            sustentación de la tesis
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() =>
                append({
                  code: '',
                })
              }
            >
              <PlusIcon />
            </Button>
            <>
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <FormField
                    name={`jurors.${index}.code`}
                    defaultValue={field.code}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Asesor</FormLabel>
                        <div className="flex gap-2">
                          <div className="flex-grow">
                            <FormControl>
                              <QuickSearchInput
                                placeholder="Buscar asesor por código o nombre"
                                searchFn={(q) =>
                                  AccountsService.getAccount({
                                    q,
                                    userType: BaseRoles.TEACHER,
                                  })
                                }
                                handleSelect={(item) =>
                                  field.onChange(item?.code)
                                }
                                renderOption={(item) => (
                                  <div className="hover:bg-muted">
                                    {`${item.name} ${item.firstSurname} ${item.secondSurname} ${item.code}`}
                                  </div>
                                )}
                                renderSelected={(item) => (
                                  <article>
                                    <h5 className="font-semibold">
                                      {`${item.name} ${item.firstSurname} ${item.secondSurname}`}
                                    </h5>
                                    <p className="text-xs">{item.code}</p>
                                  </article>
                                )}
                              />
                            </FormControl>
                            <FormMessage />
                          </div>
                          <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            onClick={() => remove(index)}
                          >
                            <X />
                          </Button>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </>

            <Button disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : 'Asignar'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const formSchema = z.object({
  jurors: z
    .array(
      z.object({
        code: z.string().regex(/^[0-9]{8}$/, 'Código de jurado inválido'),
      })
    )
    .nonempty('Debes ingresar al menos un jurado'),
})
