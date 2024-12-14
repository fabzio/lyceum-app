import { Input } from '@frontend/components/ui/input'
import { useFilters } from '@frontend/hooks/useFilters'
import debounce from 'debounce'

export default function SearchEnrollmentInput() {
  const { setFilters } = useFilters('/_auth/matricula/modificacion-matricula')

  const onChangeFilter = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ q: e.target.value }) // Se actualiza el filtro de búsqueda
  }, 300)

  return (
    <Input
      type="search"
      placeholder="🔎 Buscar matricula por alumno o curso"
      className="w-full md:w-2/4"
      onChange={onChangeFilter}
    />
  )
}
