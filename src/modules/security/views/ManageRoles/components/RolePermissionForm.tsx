import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { QueryKeys } from '@/constants/queryKeys'
import { useToast } from '@/hooks/use-toast'
import { UnitType } from '@/interfaces/models'
import { mapUnitType } from '@/lib/mapUnitType'
import PermissionsCombobox from '@/modules/security/components/PermissionsCombobox'
import RolePermissionService from '@/modules/security/services/role-permission.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PlusIcon, X } from 'lucide-react'
import { FormProvider, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'

interface Props {
  handleClose: () => void
}

export default function RolePermissionForm({ handleClose }: Props) {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof newRoleSchema>>({
    resolver: zodResolver(newRoleSchema),
    shouldUnregister: true,
  })
  const { control, handleSubmit } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'permissions',
  })
  useWatch({
    control,
    name: 'permissions',
  })
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: RolePermissionService.createRolePermission,
    onSettled: () => handleClose(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.security.ROLE_PERMISSIONS],
      })
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
      })
    },
  })

  const onSubmit = (data: z.infer<typeof newRoleSchema>) => {
    const rolePermission = {
      role: {
        name: data.name,
        unitType: data.unitType,
      },
      permissions: data.permissions.flatMap(
        (permission) => permission.selected
      ),
    }
    mutate(rolePermission)
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <div>
            <FormField
              name="name"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Nombre del rol</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ingrese el nombre del rol" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              name="unitType"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Unidad</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Elija un tipo de unidad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tipo de Unidad</SelectLabel>
                          {Object.values(UnitType).map((unitType) => (
                            <SelectItem key={unitType} value={unitType}>
                              {mapUnitType[unitType]}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <section className="flex flex-col gap-2">
              <div>
                <FormField
                  name="permissions"
                  control={control}
                  render={({}) => (
                    <FormItem>
                      <FormLabel>Permisos</FormLabel>

                      <section className="flex flex-col gap-1">
                        {fields.map((field, index) => (
                          <div key={field.id}>
                            <div className="w-full flex items-center">
                              <PermissionsCombobox index={index} />
                              <Button
                                variant="ghost"
                                onClick={() => remove(index)}
                                size="icon"
                              >
                                <X />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </section>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => append({ moduleId: 0, selected: [] })}
              >
                <PlusIcon />
              </Button>
            </section>
          </div>
        </section>

        <DialogFooter className="mt-2">
          <div className="flex w-full justify-between">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit">Guardar</Button>
          </div>
        </DialogFooter>
      </form>
    </FormProvider>
  )
}

const newRoleSchema = z.object({
  name: z
    .string({
      required_error: 'El nombre del rol obligatorio',
    })
    .min(1, 'El nombre es requerido')
    .max(80, 'El nombre no puede exceder los 80 caracteres'),
  unitType: z.nativeEnum(UnitType, {
    required_error: 'El tipo de unidad es obligatorio',
  }),
  permissions: z
    .array(
      z.object({
        moduleId: z.number(),
        selected: z.array(z.number()),
      })
    )
    .nonempty('Debe seleccionar al menos un módulo'),
})
