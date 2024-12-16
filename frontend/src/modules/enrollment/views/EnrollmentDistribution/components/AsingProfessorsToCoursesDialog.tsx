import { Button } from '@frontend/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@frontend/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@frontend/components/ui/form'
import { Input } from '@frontend/components/ui/input'
import { useState } from 'react'
import { z } from 'zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { Schedule } from '@frontend/interfaces/models/Schedule'
import QuickSearchInput from '@frontend/components/QuickSearchInput.tsx/QuickSearchInput'
import AccountsService from '@frontend/service/Accounts.service'
import { BaseRoles } from '@frontend/interfaces/enums/BaseRoles'
import { Loader2, PlusIcon, X } from 'lucide-react'
import { useToast } from '@frontend/hooks/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import EnrollmenDistributionService from '@frontend/modules/enrollment/services/EnrollmentDistribution.service'
import { QueryKeys } from '@frontend/constants/queryKeys'

interface Props {
  schedule: Schedule
}

export default function AssignProfessorsToCoursesDialog({ schedule }: Props) {
  const scheduleId = schedule.id
  const professors = schedule.professors
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { mutate, isPending } = useMutation({
    mutationFn: EnrollmenDistributionService.updateProfessorsInCourse,
    onError: ({ message }) => {
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      toast({
        title: 'Profesores asignados',
        description: 'Los profesores han sido asignados correctamente',
      })
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.enrollment.SCHEDULE_DISTRIBUTION],
      })
      setIsOpen(false)
    },
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      professors: professors,
      principal: String(professors.findIndex((professor) => professor.isLead)),
    },
  })
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'professors',
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate({
      scheduleId,
      professorsList: data.professors.map((professor, index) => ({
        professorId: professor.accountId,
        isLead: +data.principal === index,
      })),
    })
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (open) {
          form.reset({
            professors: professors,
            principal: String(
              professors.findIndex((professor) => professor.isLead)
            ), // Reset to default state
          })
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Asignar Docentes</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Asignar Docentes</DialogTitle>
          <DialogDescription>
            Asigna los docentes a los horarios seleccionados, una vez asignado
            el horario
            <span className="font-semibold"> NO podrá ser modificado</span>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <Button
              size="icon"
              variant="outline"
              onClick={() =>
                append({
                  accountId: '',
                })
              }
            >
              <PlusIcon />
            </Button>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <FormField
                  name={`professors.${index}.accountId`}
                  defaultValue={field.id}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Docente</FormLabel>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          size="icon"
                          variant="outline"
                          onClick={() => remove(index)}
                        >
                          <X />
                        </Button>
                        <div className="flex-1">
                          <FormControl>
                            <QuickSearchInput
                              placeholder="Buscar profesor por código o nombre"
                              searchFn={(q) => {
                                const accountsResult =
                                  AccountsService.getAccount({
                                    q,
                                    userType: BaseRoles.TEACHER,
                                  })
                                const professorsResult = accountsResult.then(
                                  (accounts) =>
                                    accounts.map((account) => ({
                                      accountId: account.id,
                                      name: `${account.name} ${account.firstSurname} ${account.secondSurname}`,
                                      code: account.code,
                                    }))
                                )
                                return professorsResult
                              }}
                              handleSelect={(item) =>
                                field.onChange(item?.accountId)
                              }
                              renderOption={(item) => (
                                <div className="hover:bg-muted">
                                  {`${item.name}`}
                                </div>
                              )}
                              renderSelected={(item) => (
                                <article>
                                  <h5 className="font-semibold">
                                    {`${item.name}`}
                                  </h5>
                                  <p className="text-xs">{item.code}</p>
                                </article>
                              )}
                              defaultValue={professors.find(
                                (p) => p.accountId === field.value
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="principal"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Input
                          id={`${index}`}
                          type="radio"
                          {...field}
                          value={`${index}`}
                          checked={+form.watch('principal') === index}
                          onChange={() => field.onChange(index.toString())}
                        />
                      </FormControl>
                      <FormLabel htmlFor={`${index}`}>Principal</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            ))}

            <DialogFooter className="mt-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending || fields.length === 0}>
                {isPending ? <Loader2 className="animate-spin" /> : 'Asignar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

// Schema de validación de formulario
const formSchema = z.object({
  professors: z
    .array(
      z.object({
        accountId: z
          .string({
            required_error: 'Debes seleccionar un profesor',
          })
          .min(1, 'Debes seleccionar un profesor'),
      })
    )
    .nonempty('Debes ingresar al menos un jurado'),
  principal: z.string(),
})
