import { UnitType } from '@frontend/interfaces/enums'
import { Unit } from '@frontend/interfaces/models/Unit'
import { ColumnDef } from '@tanstack/react-table'

const unitColumns: ColumnDef<Unit>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'parent',
    header: 'Unidad superior',
    cell: ({ row }) => {
      const prename =
        row.original.unitType === UnitType.FACULTY ||
        row.original.unitType === UnitType.DEPARTMENT
          ? 'Universidad '
          : row.original.unitType === UnitType.SPECIALTY
            ? 'Facultad de '
            : row.original.unitType === UnitType.SECTION
              ? 'Departamento de '
              : 'Especialidad de '
      return `${prename} ${row.getValue('parent')}`
    },
  },
]

export default unitColumns
