import { Input } from '@/components/ui/input'
import { useFilters } from '@/hooks/useFilters'
import debounce from 'debounce'

export default function SearchRiskStudentInput() {
  const { setFilters } = useFilters('/_auth/cursos/alumnos-riesgo')
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
