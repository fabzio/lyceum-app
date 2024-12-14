import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@frontend/components/ui/select'
import { useFilters } from '@frontend/hooks/useFilters'

export default function StateFilter() {
  const { setFilters } = useFilters('/_auth/matricula/modificacion-matricula')

  const handleStateFilterChange = (value: string | null) => {
    setFilters({
      eqnumber: value && value !== 'none' ? parseInt(value) : undefined,
    })
  }

  return (
    <Select onValueChange={handleStateFilterChange} value={undefined}>
      <SelectTrigger className="w-full md:w-48">
        <SelectValue placeholder="Filtrar por estado" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="0">Todos los estados</SelectItem>
        <SelectItem value="1">Solicitado</SelectItem>
        <SelectItem value="2">Aprobado</SelectItem>
        <SelectItem value="3">Rechazado</SelectItem>
      </SelectContent>
    </Select>
  )
}
