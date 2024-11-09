import { Button } from '@frontend/components/ui/button'
import { CourseProposition } from '@frontend/modules/enrollment/interfaces/CourseProposition'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { CourseActionCell } from '../../EnrollmentPropose/components/CourseActionButton.tsx'

export const CourseProposalTableColumns: ColumnDef<CourseProposition>[] = [
  {
    accessorKey: 'courseCode',
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
      <div className="capitalize">{row.getValue('courseCode')}</div>
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
    accessorKey: 'numberVisible',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Visibles
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('numberVisible')}</div>,
  },
  {
    accessorKey: 'numberHidden',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Ocultos
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('numberHidden')}</div>,
  },
  {
    accessorKey: 'actions',
    header: 'Acciones',
    cell: ({ row }) => (
      <CourseActionCell
        courseName={row.getValue('courseName')}
        courseCode={row.getValue('courseCode')}
        courseId={row.original.id}
      />
    ),
  },
]
