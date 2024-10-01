import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '@/components/ui/select'

export default function SelectFilter() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Elige un módulo" />
      </SelectTrigger>
      <SelectContent></SelectContent>
    </Select>
  )
}
