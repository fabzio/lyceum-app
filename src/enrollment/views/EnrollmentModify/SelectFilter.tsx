import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  } from '@/components/ui/select'
  
  interface SelectFilterProps {
    onFilterChange?: (score: string) => void
    selectedValue?: string | null
    filterType?: 'ScoreFilter' | 'ReasonFilter'
  }
  
  export default function SelectFilter({
    onFilterChange,
    selectedValue,
    filterType,
  }: SelectFilterProps) {
    return (
      <Select onValueChange={onFilterChange} value={selectedValue || undefined}>
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