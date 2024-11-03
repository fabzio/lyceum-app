import { Button } from '@frontend/components/ui/button'
import { CourseProposal } from '@frontend/modules/enrollment/interfaces/CourseProposal'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
export const CourseProposalTableColumns: ColumnDef<CourseProposal>[] = [
  {
    accessorKey: 'courseId',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Código
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('courseId')}</div>
    ),
  },
  {
    accessorKey: 'courseName',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Nombre
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('courseName')}</div>
    ),
  },
  {
    accessorKey: 'vacants',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Vacantes
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('vacants')}</div>,
  },
  {
    accessorKey: 'visible',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Visibles
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('visible')}</div>,
  },
  {
    accessorKey: 'hidden',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Ocultos
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('hidden')}</div>,
  },
  {
    accessorKey: 'actions',
    header: 'Acciones',
    //TODO: Modificar funcionalidad para agregar
    //cell: ({ row }) => {
  },
]
