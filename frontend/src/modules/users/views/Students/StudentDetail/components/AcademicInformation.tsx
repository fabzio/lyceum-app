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
  SelectValue,
} from '@frontend/components/ui/select'
import { useSearch } from '@tanstack/react-router'
import { useFormContext } from 'react-hook-form'

export default function AcademicInformation() {
  const { mode } = useSearch({
    from: '/_auth/usuarios/estudiantes/$code',
  })
  const form = useFormContext()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información Académica</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form>
            <FormField
              name="speciality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Especialidad</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger disabled={mode === 'view'}>
                        <SelectValue placeholder="Seleccione una especialidad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      //información en duro: debería ser dinámica
                      <SelectItem value="1">Ingeniería Informática</SelectItem>
                      <SelectItem value="2">Ingeniería Industrial</SelectItem>
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
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
