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
import PresentationCardService from '@frontend/modules/student-process/services/presentationCard.service'
import AccountsService from '@frontend/service/Accounts.service'
import ScheduleService from '@frontend/service/Schedules.service'
import { useSessionStore } from '@frontend/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Loader2, Plus, X } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

export default function NewPresentationCardForm() {
  const { session } = useSessionStore()
  const { toast } = useToast()
  //const { session } = useSessionStore()
  const navigate = useNavigate({
    from: '/procesos-de-estudiantes/cartas-de-presentacion/nueva-solicitud',
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const {
    append: appendAccount,
    remove: removeAccount,
    fields: accountIds,
  } = useFieldArray({
    name: 'accountIds',
    control: form.control,
  })

  const { mutate, isPending } = useMutation({
    mutationFn: PresentationCardService.insertPresentationCard,
    onSuccess: ({ id, companyName }) => {
      toast({
        title: 'Solicitud enviada',
        description: `La solicitud de presentación para ${companyName} ha sido enviada correctamente`,
      })
      navigate({
        to: '/procesos-de-estudiantes/cartas-de-presentacion/$requestCode',
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

  const { data: accountSchedules } = useQuery({
    queryKey: ['schedules', session!.id],
    queryFn: () => ScheduleService.getAccounSchedule(session!.id),
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate({
      presentationCard: data,
      accountId: session!.id,
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
          name="companyName"
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
                  {accountSchedules?.map((schedule) => (
                    <SelectItem
                      key={schedule.id}
                      value={schedule.id.toString()}
                    >
                      {schedule.courseName} - {schedule.code}
                    </SelectItem>
                  ))}
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
              onClick={() =>
                appendAccount({
                  id: '',
                })
              }
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
                            }).then((res) =>
                              res.filter(
                                (account) => account.id !== session!.id
                              )
                            )
                          }
                          handleSelect={(item) => {
                            console.log(item?.id)
                            field.onChange({ id: item?.id })
                          }} // Updated to pass an object
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
          name="documentFile"
          // eslint-disable-next-line
          render={({ field: { value, onChange, ...filedProps } }) => (
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
                    onChange(e.target.files && e.target.files[0])
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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

export const formSchema = z.object({
  companyName: z.string().min(1, 'El nombre de la entidad es requerido'),
  scheduleId: z.coerce
    .number()
    .min(1, 'Debes seleccionar un curso y su horario'),
  accountIds: z.array(
    z.object({ id: z.string().min(1, 'Se necesita al menos un estudiante') })
  ),
  description: z
    .string({
      required_error: 'Debes llenar el propósito de la carta de presentación',
    })
    .min(1, 'Debes llenar el propósito de la carta de presentación'),
  documentFile: z.instanceof(File, { message: 'Debe seleccionar un archivo' }),
})

export type NewPresentationCardFormValues = z.infer<typeof formSchema>
