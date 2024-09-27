import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '@/components/ui/select'

export default function SelectFilter() {
  return (
    <Select>
      <SelectTrigger >
        <SelectValue placeholder="Elige un rol"/>
      </SelectTrigger>
      <SelectContent></SelectContent>
    </Select>
  )
}
