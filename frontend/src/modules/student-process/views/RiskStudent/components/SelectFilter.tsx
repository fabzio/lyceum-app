import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@frontend/components/ui/select'
import { useFilters } from '@frontend/hooks/useFilters'

interface SelectFilterProps {
  onFilterChange?: (score: string) => void
  selectedValue?: string | null
  filterType?: 'ScoreFilter' | 'ReasonFilter'
}

export default function SelectFilter({
  selectedValue,
  filterType,
}: SelectFilterProps) {
  const { setFilters } = useFilters(
    '/_auth/procesos-de-estudiantes/alumnos-riesgo'
  )

  const handleScoreFilterChange = (value: string | null) => {
    setFilters({
      eqnumber: value && value !== 'Todos' ? parseInt(value) : undefined,
    })
  }

  return (
    <Select
      onValueChange={handleScoreFilterChange}
      value={selectedValue || undefined}
    >
      <SelectTrigger className="w-full md:w-48">
        <SelectValue
          placeholder={
            filterType === 'ScoreFilter'
              ? 'Filtrar por puntuación'
              : 'Filtrar por motivo'
          }
        />
      </SelectTrigger>
      <SelectContent>
        {filterType === 'ScoreFilter' && (
          <>
            <SelectItem value="Todos">Todas Puntuaciones</SelectItem>
            <SelectItem value="1">Puntuación 1</SelectItem>
            <SelectItem value="2">Puntuación 2</SelectItem>
            <SelectItem value="3">Puntuación 3</SelectItem>
            <SelectItem value="4">Puntuación 4</SelectItem>
            <SelectItem value="5">Puntuación 5</SelectItem>
          </>
        )}
        {filterType === 'ReasonFilter' && (
          <>
            <SelectItem value="Todos">Todos Motivos</SelectItem>
            <SelectItem value="Tercera">Tercera</SelectItem>
            <SelectItem value="Cuarta">Cuarta</SelectItem>
            <SelectItem value="Salud Mental">Salud Mental</SelectItem>
          </>
        )}
      </SelectContent>
    </Select>
  )
}
