import { Input } from '@/components/ui/input'
import { useFilters } from '@/hooks/useFilters'
import debounce from 'debounce'

export default function CourseQuickSearch() {
  const { setFilters } = useFilters('/_auth/plan-de-estudios/gestionar/$planId')
  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ q: e.target.value })
  }, 300)
  return <Input placeholder="🔎 Buscar curso..." type='search' onChange={handleChange} />
}
