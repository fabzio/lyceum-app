import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

export default function ThesisJuryRequestSelectFilter() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Filtrar por estado" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="proponer jurado">
          Director de carrera debe proponer jurado
        </SelectItem>
        <SelectItem value="aceptar ser jurado">
          Profesores deben aceptar propuesta
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
