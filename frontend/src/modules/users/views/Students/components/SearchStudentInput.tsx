import { Input } from '@frontend/components/ui/input'
import { useFilters } from '@frontend/hooks/useFilters'
import debounce from 'debounce'

export default function SearchStudentInput() {
  const { setFilters } = useFilters('/_auth/usuarios/estudiantes')

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
