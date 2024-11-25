import { UnitType } from '@frontend/interfaces/enums'
import { Unit } from '@frontend/interfaces/models/Unit'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@frontend/components/ui/button'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@frontend/components/ui/dropdown-menu'
import { Edit, MoreHorizontal } from 'lucide-react'
import EditUnitDialog from './EditUnitDialog'

const unitColumns: ColumnDef<Unit>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'parentName',
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
      return `${prename} ${row.getValue('parentName')}`
    },
  },
  {
    accessorKey: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const [isEditOpen, setIsEditOpen] = useState(false)
      const unit = row.original
      unit.parentName = row.getValue('parentName')
      unit.parentId = row.original.parentId
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Modificar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <EditUnitDialog
            isOpen={isEditOpen}
            setIsOpen={setIsEditOpen}
            unit={unit}
          />
        </>
      )
    },
  },
]

export default unitColumns
