import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

interface SelectFilterProps {
  onFilterChange: (score: string) => void;
  selectedValue: string | null;
  filterType: 'ScoreFilter' | 'ReasonFilter'; // Tipo de filtro: puntuación o motivo
}

export default function SelectFilter({ onFilterChange, selectedValue, filterType  }: SelectFilterProps) {
  return (
    <Select onValueChange={onFilterChange} value={selectedValue || undefined}> {/* Cambia null por undefined */}
      <SelectTrigger className="w-full md:w-48">
        <SelectValue placeholder={filterType === 'ScoreFilter' ? "Filtrar por puntuación" : "Filtrar por motivo"} />
      </SelectTrigger>
      <SelectContent>
        {/* Si el tipo de filtro es "ScoreFilter", mostramos las opciones de puntuación */}
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
        {/* Si el tipo de filtro es "ReasonFilter", mostramos las opciones de motivo */}
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
