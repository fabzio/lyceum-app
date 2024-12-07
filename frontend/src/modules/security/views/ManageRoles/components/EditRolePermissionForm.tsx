import { Button } from '@frontend/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@frontend/components/ui/form'
import { Input } from '@frontend/components/ui/input'
import { Label } from '@frontend/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@frontend/components/ui/select'
import { useForm, useFieldArray, FormProvider, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, PlusIcon, X } from 'lucide-react'
import { UnitType } from '@frontend/interfaces/models'
import { mapUnitType } from '@frontend/lib/mapUnitType'
import PermissionsCombobox from '@frontend/modules/security/components/PermissionsCombobox'
import { RolePermissionDTO } from '@frontend/interfaces/models/RolePermission'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import RolePermissionService from '@frontend/modules/security/services/role-permission.service'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { toast } from '@frontend/hooks/use-toast'

interface Props {
  roleData: RolePermissionDTO
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditRolePermissionForm({ roleData, setIsOpen }: Props) {
  const form = useForm<z.infer<typeof editRoleSchema>>({
    resolver: zodResolver(editRoleSchema),
    defaultValues: {
      name: roleData.role.name,
      unitType: roleData.role.unitType,
    },
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

  const { mutate, isPending } = useMutation({
    mutationFn: RolePermissionService.editRolePermission,
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
      setIsOpen(false)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.security.ROLE_PERMISSIONS],
      })
      toast({
        title: 'Rol modificado',
        description: 'El rol se ha modificado con éxito',
      })
      setIsOpen(false)
    },
  })

  const onSubmit = (data: z.infer<typeof editRoleSchema>) => {
    const rolePermission = {
      role: {
        id: roleData.role.id,
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
        <FormField
          name="name"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del rol</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ingrese el nombre del rol" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="unitType"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Unidad</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Elija un tipo de unidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(UnitType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {mapUnitType[type]}
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

        <Label>Agregar permisos</Label>
        <div>
          {fields.map((fieldItem, index) => (
            <FormField
              key={fieldItem.id}
              name={`permissions.${index}.moduleId`}
              control={control}
              render={() => (
                <FormItem>
                  <section className="flex flex-col gap-1">
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
                  </section>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => append({ moduleId: 0, selected: [] })}
        >
          <PlusIcon />
        </Button>

        <div className="flex justify-end mt-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : 'Guardar'}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

const editRoleSchema = z.object({
  name: z
    .string({
      required_error: 'El nombre del rol obligatorio',
    })
    .min(1, 'El nombre es requerido')
    .max(80, 'El nombre no puede exceder los 80 caracteres'),
  unitType: z.nativeEnum(UnitType, {
    required_error: 'El tipo de unidad es obligatorio',
  }),
  permissions: z.array(
    z.object({
      moduleId: z.number(),
      selected: z.array(z.number()),
    })
  ),
})
