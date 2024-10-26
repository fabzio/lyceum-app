import { Input } from '@/components/ui/input'
import { useFilters } from '@/hooks/useFilters'
import debounce from 'debounce'

export default function SearchExternInput() {
  const { setFilters } = useFilters('/_auth/usuarios/externos')

  const onChangeFilter = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ q: e.target.value })
  }, 300)

  return (
    <Input
      type="search"
      placeholder="🔎 Buscar externo por nombre o código"
      className="w-full md:w-2/4"
      onChange={onChangeFilter}
    />
  )
}
