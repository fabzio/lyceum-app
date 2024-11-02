import { Input } from '@frontend/components/ui/input'
import { useFilters } from '@frontend/hooks/useFilters'
import debounce from 'debounce'

export default function SearchProfessorInput() {
  const { setFilters } = useFilters('/_auth/usuarios/docentes')

  const onChangeFilter = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ q: e.target.value })
  }, 300)

  return (
    <Input
      type="search"
      placeholder="🔎 Buscar profesor por nombre o código"
      className="w-full md:w-2/4"
      onChange={onChangeFilter}
    />
  )
}
