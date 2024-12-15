import { Input } from '@frontend/components/ui/input'
import { useFilters } from '@frontend/hooks/useFilters'
import debounce from 'debounce'

export default function SearchDelegateInput() {
  const { setFilters } = useFilters('/_auth/procesos-de-estudiantes/delegados')

  const onChangeFilter = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ q: e.target.value })
  }, 300)

  return (
    <Input
      type="search"
      placeholder="🔎 Buscar delegado por nombre o código de curso o alumno"
      className="w-full md:w-2/4"
      onChange={onChangeFilter}
    />
  )
}
