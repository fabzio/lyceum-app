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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@frontend/components/ui/select'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { useToast } from '@frontend/hooks/use-toast'
import { UnitType } from '@frontend/interfaces/models'
import { mapUnitType } from '@frontend/lib/mapUnitType'
import PermissionsCombobox from '@frontend/modules/security/components/PermissionsCombobox'
import RolePermissionService from '@frontend/modules/security/services/role-permission.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Loader2, PlusIcon, X } from 'lucide-react'
import { FormProvider, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'

export default function RolePermissionForm() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof newRoleSchema>>({
    resolver: zodResolver(newRoleSchema),
    shouldUnregister: true,
    defaultValues: {
      name: '',
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
  const navigate = useNavigate({
    from: '/seguridad/roles/nuevo',
  })
  const { mutate, isPending } = useMutation({
    mutationFn: RolePermissionService.createRolePermission,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.security.ROLE_PERMISSIONS],
      })
      toast({
        title: 'Rol creado',
        description: 'El rol ha sido creado con éxito',
      })
      navigate({
        to: '/seguridad/roles',
      })
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
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
                  <FormLabel>Tipo de unidad de alcance</FormLabel>
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
            <section className="mt-2 flex flex-col gap-2">
              <Label>Permisos</Label>
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
            </section>
          </div>
        </section>
        <div className="mt-2 flex w-full justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : 'Guardar'}
          </Button>
        </div>
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
