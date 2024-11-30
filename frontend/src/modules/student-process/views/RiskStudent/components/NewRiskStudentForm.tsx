import { Combobox } from '@frontend/components/Combobox'
import QuickSearchInput from '@frontend/components/QuickSearchInput.tsx/QuickSearchInput'
import { Button } from '@frontend/components/ui/button'
import { DialogClose, DialogFooter } from '@frontend/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@frontend/components/ui/form'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { useToast } from '@frontend/hooks/use-toast'
import { UnitType } from '@frontend/interfaces/enums'
import { StudentProcessPermissionsDict } from '@frontend/interfaces/enums/permissions/StudentProcess'

import RoleAccountsService from '@frontend/modules/security/services/RoleAccounts.service'
import UnitService from '@frontend/modules/unit/services/Unit.service'
import ScheduleService from '@frontend/service/Schedules.service'
import { useSessionStore } from '@frontend/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface Props {
  handleClose: () => void
}
export default function RiskStudentForm({ handleClose }: Props) {
  const { getRoleWithPermission } = useSessionStore()
  const [unitType] = useState<UnitType | null>(null)
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { data: units } = useQuery({
    queryKey: [QueryKeys.unit.UNITS, unitType],
    queryFn: () => RoleAccountsService.getUnitScopes(unitType!),
    enabled: !!unitType,
  })
  const { mutate, isPending } = useMutation({
    mutationFn: RoleAccountsService.insertRoleAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.security.ROLE_ACCOUNTS],
      })
      handleClose()
    },
    onError: ({ message }) => {
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      })
    },
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate({
      accountId: data.userId,
      roleId: data.roleId,
      unitId: +data.unitId,
    })
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="userId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alumno</FormLabel>
                <FormControl>
                  <QuickSearchInput
                    placeholder="Buscar usuario por código o nombre"
                    searchFn={(q) =>
                      UnitService.getStudentsFromUnit({
                        unitId: getRoleWithPermission(
                          StudentProcessPermissionsDict.LOAD_RISK_STUDENTS
                        )!.unitId, //jugadon para obtener el unitId
                        q,
                      })
                    }
                    handleSelect={(item) => {
                      field.onChange(item?.id)
                    }}
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
              </FormItem>
            )}
          />
          <FormField
            name="roleId" //scheduleId
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Curso</FormLabel>
                <FormControl>
                  <QuickSearchInput
                    placeholder="Buscar Horario"
                    searchFn={
                      () =>
                        form.getValues('userId')
                          ? ScheduleService.getAccounSchedule(
                              form.getValues('userId')
                            )
                          : Promise.resolve([]) // Si no hay usuario seleccionado, no realizar búsqueda
                    }
                    handleSelect={(item) => {
                      field.onChange(item?.id)
                    }}
                    renderOption={(item) => (
                      <div className="hover:bg-muted">
                        {' '}
                        {`${item.courseName} ${item.code}`}
                      </div>
                    )}
                    renderSelected={(item) => (
                      <article>{item.courseName}</article>
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="unitId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Motivo</FormLabel>
                <FormControl>
                  <Combobox
                    options={
                      units?.map((item) => ({
                        value: item.id.toString(),
                        label: item.name,
                      })) || []
                    }
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Elija la unidad de alcance"
                    disabled={!unitType}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : 'Guardar'}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  )
}

const formSchema = z.object({
  userId: z
    .string({ required_error: 'El usuario es requerido' })
    .min(1, 'El usuario es requerido'),
  roleId: z.number({ required_error: 'El rol es requerido' }),
  unitId: z.string({ required_error: 'La unidad es requerida' }),
})
