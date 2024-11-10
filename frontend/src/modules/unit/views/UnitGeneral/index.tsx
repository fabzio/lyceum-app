import { QueryKeys } from '@frontend/constants/queryKeys'
import { UnitType } from '@frontend/interfaces/enums'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import UnitService from '../../services/Unit.service'
import UnitTable from '../../components/UnitTable'
import { useFilters } from '@frontend/hooks/useFilters'
import SearchUnit from '../../components/SearchUnit'
import NewUnitDialog from '../../components/NewUnitDialog'
import MasiveUnitsDialog from '../../components/MasiveUnitsDialog'

interface Props {
  unitType: UnitType
}
export default function UnitGeneral({ unitType }: Props) {
  const { filters } = useFilters('/_auth/unidades')
  const { data: unitList } = useQuery({
    queryKey: [QueryKeys.unit.UNITS, unitType, filters],
    queryFn: () =>
      UnitService.getUnitByTypePaginated({ ...filters, unitType: unitType }),
    placeholderData: keepPreviousData,
  })
  return (
    <div>
      <div className="flex mb-2 gap-2">
        <SearchUnit />
        <MasiveUnitsDialog unitType={unitType} />
        <NewUnitDialog unitType={unitType} />
      </div>
      <UnitTable unitList={unitList} />
    </div>
  )
}
