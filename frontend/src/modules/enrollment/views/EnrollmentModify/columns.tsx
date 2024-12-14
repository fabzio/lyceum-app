// EnrollmentTableColumns.ts
import { ColumnDef } from '@tanstack/react-table'
import { EnrollmentGeneral } from '@frontend/modules/enrollment/interfaces/EnrollmentGeneral'
import { Button } from '@frontend/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { Badge } from '@frontend/components/ui/badge'

// Definición de columnas para la tabla de inscripciones
export const EnrollmentTableColumns: ColumnDef<EnrollmentGeneral>[] = [
  {
    accessorKey: 'state',
    header: 'Estado',
    /*
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Estado
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    */
    cell: ({ row }) => {
      const state = row.getValue('state')
      return (
        <div>
          <Badge
            variant={mapVariant[state as keyof typeof mapVariant] ?? 'default'}
          >
            {mapState[state as keyof typeof mapState] ?? 'Pendiente'}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: 'requestNumber',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Nro. Solicitud
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('requestNumber')}</div>,
  },
  {
    accessorKey: 'requestType',
    header: 'Tipo de Solicitud',
    cell: ({ row }) => (
      <div>
        {
          mapRequestType[
            row.getValue('requestType') as keyof typeof mapRequestType
          ]
        }
      </div>
    ),
  },
  {
    accessorFn: (row) => row.student.name,
    header: 'Nombre Alumno',
    cell: ({ row }) => <div>{row.original.student.name}</div>,
  },
  {
    accessorKey: 'courseName',
    header: 'Curso',
    cell: ({ row }) => <div>{row.original.schedule.courseName}</div>,
  },
  {
    accessorKey: 'scheduleCode',
    header: 'Horario',
    cell: ({ row }) => <div>{row.original.schedule.code}</div>,
  },
]
const mapRequestType = {
  aditional: 'Matrícula adicional',
  withdrawal: 'Retiro de matricula',
}

const mapState = {
  approved: 'Aprobado',
  denied: 'Denegado',
}

const mapVariant = {
  approved: 'default',
  denied: 'destructive',
  requested: 'outline',
} as const
