import { Input } from '@frontend/components/ui/input'
import { useFilters } from '@frontend/hooks/useFilters'
import debounce from 'debounce'

export default function SearchCourseInput() {
  const { setFilters } = useFilters('/_auth/plan-de-estudios/cursos')

  const onChangeFilter = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ q: e.target.value })
  }, 300)

  return (
    <Input
      type="search"
      placeholder="🔎 Buscar curso por código o nombre"
      className="w-full md:w-2/4"
      onChange={onChangeFilter}
    />
  )
}
