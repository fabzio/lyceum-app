import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@frontend/components/ui/select'

export default function ThesisThemeSelectFilter() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Filtrar por estado" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="123">Enviado por alumno</SelectItem>
        <SelectItem value="456">Aprobado por Asesor</SelectItem>
        <SelectItem value="789">Aprobado por Coordinador de Área</SelectItem>
        <SelectItem value="321">Aprobado por Director de Carrera</SelectItem>
        <SelectItem value="654">Terminado</SelectItem>
      </SelectContent>
    </Select>
  )
}
