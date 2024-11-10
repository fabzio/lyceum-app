import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@frontend/components/ui/card'
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
} from '@frontend/components/ui/select'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { UnitType } from '@frontend/interfaces/enums'
import UnitService from '@frontend/modules/unit/services/Unit.service'
import { SelectValue } from '@radix-ui/react-select'
import { useQuery } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { useFormContext } from 'react-hook-form'

export default function AcademicInformation() {
  const { mode } = useSearch({
    from: '/_auth/usuarios/docentes/$code',
  })
  const form = useFormContext()
  const { data: units } = useQuery({
    queryKey: [QueryKeys.unit.UNITS],
    queryFn: () =>
      UnitService.getUnitsByType(`${UnitType.DEPARTMENT},${UnitType.SECTION}`),
  })
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información Académica</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <FormField
            name="unit"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {form.getValues('unitType') === UnitType.DEPARTMENT
                    ? 'Departamento'
                    : 'Sección'}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger disabled={mode === 'view'}>
                      <SelectValue placeholder="Elija un departamento o sección" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {units?.map((unit) => (
                      <SelectItem key={unit.id} value={unit.id.toString()}>
                        {unit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </CardContent>
    </Card>
  )
}
