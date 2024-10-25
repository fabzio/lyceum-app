import QuickSearchInput from '@/components/QuickSearchInput.tsx/QuickSearchInput'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { QueryKeys } from '@/constants/queryKeys'
import { useToast } from '@/hooks/use-toast'
import RolePermissionService from '@/modules/security/services/role-permission.service'
import RoleAccountsService from '@/modules/security/services/RoleAccounts.service'
import AccountsService from '@/service/Accounts.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select } from '@radix-ui/react-select'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface Props {
  handleClose: () => void
}
export default function AssigmentForm({ handleClose }: Props) {
  const [unitType, setUnitType] = useState<string | null>(null)
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { data: units, isLoading } = useQuery({
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
                <FormLabel>Usuario</FormLabel>
                <FormControl>
                  <QuickSearchInput
                    placeholder="Buscar usuario por código o nombre"
                    searchFn={(q) => AccountsService.getAccount({ q })}
                    handleSelect={(item) => field.onChange(item?.id)}
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
            name="roleId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <FormControl>
                  <QuickSearchInput
                    placeholder="Buscar rol por nombre"
                    searchFn={(q) => RolePermissionService.getRole({ q })}
                    handleSelect={(item) => {
                      setUnitType(item?.unitType || null)
                      field.onChange(item?.id)
                    }}
                    renderOption={(item) => (
                      <div className="hover:bg-muted">{item.name}</div>
                    )}
                    renderSelected={(item) => <article>{item.name}</article>}
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
                <FormLabel>Unidad</FormLabel>
                <FormControl>
                  <Select disabled={!unitType} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Elija la unidad de alcance" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoading ? (
                        <SelectItem value="0" disabled>
                          <Loader2 className="animate-spin" />
                        </SelectItem>
                      ) : (
                        units?.map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="mt-2">
            <div className="flex w-full justify-between">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" /> : 'Guardar'}
              </Button>
            </div>
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
