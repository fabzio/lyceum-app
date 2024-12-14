import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@frontend/components/ui/select'
import { useState } from 'react'

interface ThesisThemeSelectFilterProps {
  onFilterChange: (value: string) => void
}

export default function ThesisThemeSelectFilter({
  onFilterChange,
}: ThesisThemeSelectFilterProps) {
  const [selectedFilter, setSelectedFilter] = useState('')

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value)
    onFilterChange(value)
  }
  return (
    <Select value={selectedFilter} onValueChange={handleFilterChange}>
      <SelectTrigger>
        <SelectValue placeholder="Filtrar por estado" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="sended">Enviado por alumno</SelectItem>
        <SelectItem value="approvedByProfessor">Aprobado por Asesor</SelectItem>
        <SelectItem value="approvedByAreaCoordinator">
          Aprobado por Coordinador de Área
        </SelectItem>
        <SelectItem value="approvedByCareerDirector">
          Aprobado por Director de Carrera
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
