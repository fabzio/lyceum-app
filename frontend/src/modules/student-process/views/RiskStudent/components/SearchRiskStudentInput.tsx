import { Input } from '@frontend/components/ui/input'
import { useFilters } from '@frontend/hooks/useFilters'
import debounce from 'debounce'

export default function SearchRiskStudentInput() {
  const { setFilters } = useFilters(
    '/_auth/procesos-de-estudiantes/alumnos-riesgo'
  )
  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ q: e.target.value })
  }, 300)
  return (
    <Input
      type="search"
      placeholder="🔎 Buscar alumno"
      className="w-full "
      onChange={handleSearch}
    />
  )
}
