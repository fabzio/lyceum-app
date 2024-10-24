import { Input } from '@/components/ui/input'
import { useFilters } from '@/hooks/useFilters'
import debounce from 'debounce'

export default function SearchStudentInput() {
  const { setFilters } = useFilters('/_auth/usuarios/')

  const onChangeFilter = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ q: e.target.value })
  }, 300)

  return (
    <Input
      type="search"
      placeholder="🔎 Buscar alumno por nombre o código"
      className="w-full md:w-2/4"
      onChange={onChangeFilter}
    />
  )
}
