import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
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
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { SelectValue } from '@radix-ui/react-select'
import { useSearch } from '@tanstack/react-router'
import { useFormContext } from 'react-hook-form'

export default function AcademicInformation() {
  const { mode } = useSearch({
    from: '/_auth/usuarios/docentes/$code',
  })
  const form = useFormContext()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información Académica</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <FormField
            name="department"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Departamento</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger disabled={mode === 'view'}>
                      <SelectValue placeholder="Elija un departamento" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Ciencias</SelectItem>
                    <SelectItem value="2">Ciencias</SelectItem>
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
