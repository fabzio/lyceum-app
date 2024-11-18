import { QueryKeys } from '@frontend/constants/queryKeys'
import { useQuery } from '@tanstack/react-query'
import HiringService from '../../Services/Hirings.service'
import { Input } from '@frontend/components/ui/input'
import HiringAccordion from './components/HiringAccordion'
import { Link } from '@tanstack/react-router'
import { Button } from '@frontend/components/ui/button'
import debounce from 'debounce'
import { useSessionStore } from '@frontend/store'
import { HiringPermissionsDict } from '@frontend/interfaces/enums/permissions/Hiring'
import { useFilters } from '@frontend/hooks/useFilters'
import Need from '@frontend/components/Need'

export default function HiringSelection() {
  const { filters, setFilters } = useFilters(
    '/_auth/contrataciones/seleccion-docentes'
  )
  const { getRoleWithPermission } = useSessionStore()
  const { data } = useQuery({
    queryKey: [QueryKeys.hiring.HIRINGS, filters],
    queryFn: () =>
      HiringService.getHirings({
        unitId: getRoleWithPermission(
          HiringPermissionsDict.VIEW_LIST_OF_OPEN_HIRINGS
        )!.unitId,
        ...filters,
      }),
  })

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, q: e.target.value })
  }, 300)

  return (
    <div className="flex flex-col my-6 p-2">
      <div className="w-full flex flex-col md:flex-row justify-between gap-2">
        <div className="md:flex-grow">
          <Input
            type="search"
            placeholder="🔎 Buscar asignación"
            onChange={handleSearch}
          />
        </div>
        <Need permissions={[HiringPermissionsDict.CREATE_HIRING_PROCESS]}>
          <Link to="/contrataciones/seleccion-docentes/nuevo">
            <Button>Nueva convoctoria</Button>
          </Link>
        </Need>
      </div>
      <HiringAccordion hirings={data ?? []} />
    </div>
  )
}
