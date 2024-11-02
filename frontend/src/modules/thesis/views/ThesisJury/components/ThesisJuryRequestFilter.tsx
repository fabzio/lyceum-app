import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@frontend/components/ui/select'

export default function ThesisJuryRequestSelectFilter() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Filtrar por estado" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="123">
          Solicitud enviada por secretario académico
        </SelectItem>
        <SelectItem value="456">Director de carrera propuso jurados</SelectItem>
        <SelectItem value="789">Terminado</SelectItem>
      </SelectContent>
    </Select>
  )
}
