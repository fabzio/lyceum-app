import QuickSearchInput from '@frontend/components/QuickSearchInput.tsx/QuickSearchInput'
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
import { Textarea } from '@frontend/components/ui/textarea'
import { useToast } from '@frontend/hooks/use-toast'
import { BaseRoles } from '@frontend/interfaces/enums/BaseRoles'
import PresentationCardService from '@frontend/modules/presentationCard/services/presentationCard.service'
import AccountsService from '@frontend/service/Accounts.service'
//LETTER: Se debe implementar el agregar el codigo del alumno a la solicitud de carta de presentacion
// import { useSessionStore } from '@frontend/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Loader2, Plus, X } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

export default function NewPresentationCardForm() {
  const { toast } = useToast()
  //const { session } = useSessionStore()
  const navigate = useNavigate({
    from: '/carta-de-presentacion/nueva-solicitud',
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const {
    append: appendAccount,
    remove: removeAccount,
    fields: accountIds,
  } = useFieldArray<z.infer<typeof formSchema>>({
    name: 'accountIds',
    control: form.control,
  })

  const { mutate, isPending } = useMutation({
    mutationFn: PresentationCardService.insertPresentationCard,
    onSuccess: ({ presentationCard: { id, entityName } }) => {
      toast({
        title: 'Solicitud enviada',
        description: `La solicitud de presentación para ${entityName} ha sido enviada correctamente`,
      })
      navigate({
        to: '/carta-de-presentacion/carta/$requestCode',
        params: {
          requestCode: id,
        },
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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate({
      ...data,
      accountIds: data.accountIds.map((account) => account.id),
    })
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:w-[700px]"
      >
        <FormField
          control={form.control}
          name="entityName"
          render={({ field }) => (
            <FormItem className="col-span-1 md:col-span-2">
              <FormLabel>Nombre de la Entidad</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Nombre de la entidad para la presentación"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="scheduleId"
          render={({ field }) => (
            <FormItem className="col-span-1 md:col-span-2">
              <FormLabel>ID del Horario</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar curso" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* Add SelectItem entries here or load dynamically */}
                  <SelectItem value="1">Horario 1</SelectItem>
                  <SelectItem value="2">Horario 2</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <div className="flex justify-between">
            <FormLabel>Cuentas</FormLabel>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => appendAccount({ id: '' })}
            >
              <Plus />
            </Button>
          </div>
          <div className="flex flex-col gap-2 col-span-1 ">
            {accountIds.map((account, index) => (
              <FormField
                control={form.control}
                key={account.id}
                name={`accountIds.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <QuickSearchInput
                          className="w-full"
                          placeholder="Buscar cuenta por código o nombre"
                          searchFn={(q) =>
                            AccountsService.getAccount({
                              q,
                              userType: BaseRoles.STUDENT,
                            })
                          }
                          handleSelect={(item) => field.onChange(item?.code)}
                          renderOption={(item) => (
                            <div className="hover:bg-muted px-1 text-sm flex justify-between">
                              <span>{`${item.name} ${item.firstSurname} ${item.secondSurname} `}</span>
                              <span>{item.code}</span>
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
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAccount(index)}
                      >
                        <X />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-1 md:col-span-2">
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Descripción de la presentación"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="col-span-1 md:col-span-2 w-full"
          type="submit"
          disabled={isPending}
        >
          {isPending ? <Loader2 className="animate-spin" /> : 'Enviar'}
        </Button>
      </form>
    </Form>
  )
}

const formSchema = z.object({
  entityName: z.string().min(1, 'El nombre de la entidad es requerido'),
  scheduleId: z.string().min(1, 'Debes seleccionar un curso y su horario'),
  accountIds: z.array(
    z.object({
      id: z.string().min(1, 'Se necesita al menos un estudiante'),
    })
  ),
  description: z
    .string()
    .min(1, 'Debes llenar el propósito de la carta de presentación'),
  file: z.instanceof(File, { message: 'Debe seleccionar un archivo' }),
})

// Service and Dialog placeholders
// PresentationCardService with createPresentationCard function
// ScheduleDialog for schedule selection
// AccountDialog for selecting accounts
