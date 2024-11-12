import { Input } from '@frontend/components/ui/input'
import { useFilters } from '@frontend/hooks/useFilters'
import debounce from 'debounce'

export function SearchCourseProposalInput() {
  const { setFilters } = useFilters(
    '/_auth/matricula/propuesta-horarios/$requestNumber'
  )

  const onChangeFilter = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ q: e.target.value })
  }, 300)

  return (
    <Input
      type="search"
      placeholder="🔎 Buscar curso por nombre o codigo"
      className="w-full md:w-2/4"
      onChange={onChangeFilter}
    />
  )
}
