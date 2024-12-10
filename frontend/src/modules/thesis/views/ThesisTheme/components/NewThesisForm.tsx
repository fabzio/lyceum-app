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
import { QueryKeys } from '@frontend/constants/queryKeys'
import { useToast } from '@frontend/hooks/use-toast'
import { BaseRoles } from '@frontend/interfaces/enums/BaseRoles'
import { ThesisPermissionsDict } from '@frontend/interfaces/enums/permissions/Thesis'
import ThesisThemeRequestService from '@frontend/modules/thesis/services/ThesisThemeRequest.service'
import UnitService from '@frontend/modules/unit/services/Unit.service'
import AccountsService from '@frontend/service/Accounts.service'
import { useSessionStore } from '@frontend/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Loader2, Plus, X } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

export default function NewThesisForm() {
  const { toast } = useToast()
  const { session, getRoleWithPermission } = useSessionStore()
  const navigate = useNavigate({
    from: '/tesis/nueva-solicitud',
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const {
    append: appendAdvisor,
    remove: removeAdvisor,
    fields: advisorFields,
  } = useFieldArray({
    control: form.control,
    name: 'advisors',
  })

  const {
    append: appendStudent,
    remove: removeStudent,
    fields: studentFields,
  } = useFieldArray({
    control: form.control,
    name: 'students',
  })
  const { data: listAreas, isLoading } = useQuery({
    queryKey: [QueryKeys.unit.UNITS],
    queryFn: () =>
      UnitService.getChildUnits(
        getRoleWithPermission(ThesisPermissionsDict.CREATE_THESIS)!.unitId
      ),
  })
  const { mutate, isPending } = useMutation({
    mutationFn: ThesisThemeRequestService.createThesis,
    onSuccess: ({ historyId, thesisCode }) => {
      toast({
        title: 'Solicitud enviada',
        description: 'La solicitud de tesis ha sido enviada correctamente',
      })
      navigate({
        to: '/tesis/tema-tesis/$requestCode',
        params: {
          requestCode: thesisCode,
        },
        search: {
          historyId,
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
      applicantCode: session!.code,
      advisors: data.advisors.map((advisor) => advisor.code),
      students: data.students.map((student) => student.code),
      areaId: +data.areaId,
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
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-1 md:col-span-2">
              <FormLabel>Título de la Tesis</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Escribe el título de la tesis"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="areaId"
          render={({ field }) => (
            <FormItem className="col-span-1 md:col-span-2">
              <FormLabel>Área</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <SelectValue placeholder="Elija un área de su especialidad" />
                    )}
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {listAreas?.map((area) => (
                    <SelectItem key={area.id} value={area.id.toString()}>
                      {area.name}
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
            <FormLabel>Asesores</FormLabel>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => appendAdvisor({ code: '' })}
            >
              <Plus />
            </Button>
          </div>
          <div className="flex flex-col gap-2 col-span-1 ">
            {advisorFields.map((advisor, index) => (
              <FormField
                control={form.control}
                key={advisor.id}
                name={`advisors.${index}.code`}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <QuickSearchInput
                          className="w-full"
                          placeholder="Buscar asesor por código o nombre"
                          searchFn={(q) =>
                            AccountsService.getAccount({
                              q,
                              userType: BaseRoles.TEACHER,
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
                        onClick={() => removeAdvisor(index)}
                      >
                        <X />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            {form.formState.errors.advisors && (
              <FormMessage className="col-span-1 md:col-span-2 text-red-600">
                {form.formState.errors.advisors.message}
              </FormMessage>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 col-span-1 ">
          <div className="flex justify-between">
            <FormLabel>Estudiantes</FormLabel>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => appendStudent({ code: '' })}
            >
              <Plus />
            </Button>
          </div>
          {studentFields.map((student, index) => (
            <FormField
              control={form.control}
              key={student.id}
              name={`students.${index}.code`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <QuickSearchInput
                        className="w-full"
                        placeholder="Buscar estudiante por código o nombre"
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
                      onClick={() => removeStudent(index)}
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

        <FormField
          control={form.control}
          name="justification"
          // eslint-disable-next-line
          render={({ field: { value, onChange, ...filedProps } }) => (
            <FormItem className="col-span-1 md:col-span-2">
              <FormLabel className="inline-block hover:underline w-auto">
                Justificación
              </FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  {...filedProps}
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    onChange(e.target.files && e.target.files[0])
                  }
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
  title: z
    .string({ required_error: 'El título es requerido' })
    .min(1, 'El título es requerido'),
  areaId: z.string({ required_error: 'El área es requerida' }),
  advisors: z
    .array(
      z.object({
        code: z
          .string({ required_error: 'El código del asesor es requerido' })
          .min(1, 'El código del asesor es requerido'),
      })
    )
    .nonempty('Debes agregar al menos un asesor'),
  students: z.array(
    z.object({
      code: z
        .string({ required_error: 'El código del estudiante es requerido' })
        .min(1, 'El código del estudiante es requerido'),
    })
  ),
  justification: z.instanceof(File, { message: 'Debe seleccionar un archivo' }),
})
