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
        <SelectValue placeholder="Elegir estado" />
      </SelectTrigger>
      <SelectContent></SelectContent>
    </Select>
  )
}
