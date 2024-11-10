import { Input } from '@frontend/components/ui/input'
import { useFilters } from '@frontend/hooks/useFilters'
import debounce from 'debounce'

export default function SearchUnit() {
  const { setFilters } = useFilters('/_auth/unidades')
  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ q: e.target.value }), 300
  })
  return (
    <div className="flex-grow">
      <Input
        type="search"
        placeholder="Buscar unidad"
        onChange={handleChange}
      />
    </div>
  )
}
