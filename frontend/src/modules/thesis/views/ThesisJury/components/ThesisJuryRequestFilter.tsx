import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@frontend/components/ui/select'
import { useState } from 'react'

interface ThesisThemeSelectFilterProps {
  onFilterChange: (
    value: 'unassigned' | 'requested' | 'assigned' | undefined
  ) => void
}

export default function ThesisJuryRequestSelectFilter({
  onFilterChange,
}: ThesisThemeSelectFilterProps) {
  const [selectedFilter, setSelectedFilter] = useState('')

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value)
    onFilterChange(value as 'unassigned' | 'requested' | 'assigned' | undefined)
  }

  return (
    <Select value={selectedFilter} onValueChange={handleFilterChange}>
      <SelectTrigger>
        <SelectValue placeholder="Filtrar por estado" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="unassigned">
          Solicitud enviada por secretario académico
        </SelectItem>
        <SelectItem value="requested">
          Director de carrera propuso jurados
        </SelectItem>
        <SelectItem value="assigned">Terminado</SelectItem>
      </SelectContent>
    </Select>
  )
}
