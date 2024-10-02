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
        <SelectValue placeholder="Elija un motivo" />
      </SelectTrigger>
      <SelectContent></SelectContent>
    </Select>
  )
}
