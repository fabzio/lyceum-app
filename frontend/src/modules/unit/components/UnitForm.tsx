import QuickSearchInput from '@frontend/components/QuickSearchInput.tsx/QuickSearchInput'
import { Button } from '@frontend/components/ui/button'
import { DialogClose, DialogFooter } from '@frontend/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@frontend/components/ui/form'
import { Input } from '@frontend/components/ui/input'
import { UnitType } from '@frontend/interfaces/enums'
import { Unit } from '@frontend/interfaces/models/Unit'
import { mapParentUnitType, mapUnitType } from '@frontend/lib/mapUnitType'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import UnitService from '../services/Unit.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useToast } from '@frontend/hooks/use-toast'
import { useFilters } from '@frontend/hooks/useFilters'
import { QueryKeys } from '@frontend/constants/queryKeys'

interface Props {
  unit?: Unit
  unitType: UnitType
  handleClose: () => void
}

export default function UnitForm({ unit, unitType, handleClose }: Props) {
  const { filters } = useFilters('/_auth/unidades')
  const queryClient = useQueryClient()

  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: unit,
  })
  const { mutate, isPending } = useMutation({
    mutationFn: UnitService.createUnits,
    onSuccess: () => {
      toast({
        title: 'Unidad creada',
        description: 'La unidad ha sido creada con éxito',
      })
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.unit.UNITS, unitType, filters],
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
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (
      !([UnitType.DEPARTMENT, UnitType.FACULTY] as UnitType[]).includes(
        unitType
      ) &&
      !values.parentId
    ) {
      toast({
        title: 'Error',
        description: 'Debe seleccionar una unidad superior',
        variant: 'destructive',
      })
      return
    }
    mutate([{ ...values, unitType, parentId: values.parentId ?? 1 }])
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Nombre</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Nombre de la unidad</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Descripción de la unidad (opcional)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {!([UnitType.DEPARTMENT, UnitType.FACULTY] as UnitType[]).includes(
          unitType
        ) && (
          <FormField
            control={form.control}
            name="parentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {mapUnitType[mapParentUnitType[unitType] ?? 'university']}
                </FormLabel>
                <FormControl>
                  <QuickSearchInput
                    searchFn={(q) =>
                      UnitService.getUnitsByType({
                        q,
                        type: mapParentUnitType[unitType] ?? 'university',
                      })
                    }
                    handleSelect={(unit) => field.onChange(unit?.id)}
                    placeholder={`Buscar ${mapUnitType[mapParentUnitType[unitType] ?? 'university'].toLowerCase()} por nombre`}
                    renderOption={(unit) => unit.name}
                    renderSelected={(unit) => unit.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : 'Guardar'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

const formSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  description: z
    .string()
    .min(1, 'La descripción es requerida')
    .max(255)
    .optional(),
  parentId: z.number().optional(),
})
