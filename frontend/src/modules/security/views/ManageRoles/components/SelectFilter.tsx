import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '@frontend/components/ui/select'

export default function SelectFilter() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Elija un tipo de unidad" />
      </SelectTrigger>
      <SelectContent></SelectContent>
    </Select>
  )
}
