import { Button } from '@frontend/components/ui/button'
import { EnrollmentProposal } from '@frontend/modules/enrollment/interfaces/EnrollmentProposal'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import moment from 'moment'

export const enrollmentProposalTableColumns: ColumnDef<EnrollmentProposal>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Fecha de Solicitud
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div>{moment(row.getValue('createdAt')).format('DD/MM/YYYY HH:mm')}</div>
    ),
  },
  {
    accessorKey: 'speciality',
    header: 'Especialidad',
    cell: ({ row }) => (
      <div className="capitalize">{row.original.speciality.name ?? 'N/A'}</div>
    ),
  },
  {
    accessorKey: 'state',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Estado
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const state = row.getValue('state')
      return (
        <div className="capitalize">
          {mapStateToLabel[state as keyof typeof mapStateToLabel] ?? 'N/A'}
        </div>
      )
    },
  },
]

const mapStateToLabel = {
  requested: 'Solicitado',
  approved: 'Aprobado',
  rejected: 'Rechazado',
  canceled: 'Cancelado',
}
