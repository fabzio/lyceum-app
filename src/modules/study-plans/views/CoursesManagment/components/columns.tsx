import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Course } from '@/interfaces/models/Course'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import DisableConfirmationDialog from './DisableConfirmationDialog'
import { useState } from 'react'
import EditCourseDialog from './EditCourseDialog'
import CourseForm from './CourseForm'

export const courseTableColumns: ColumnDef<Course>[] = [
  {
    accessorKey: 'code',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Código
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue('code')}</div>,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Nombre
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'credits',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Créditos
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">
        {(row.getValue('credits') as number).toFixed(2)}
      </div>
    ),
  },
  {
    accessorKey: 'specialty',
    header: 'Especialidad',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('specialty')}</div>
    ),
  },
  {
    accessorKey: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const { code } = row.original
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
      const [isDisableDialogOpen, setIsDisableDialogOpen] = useState(false)

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <span className="sr-only">Abrir acciones</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsDisableDialogOpen(true)}>
              Deshabilitar
            </DropdownMenuItem>
          </DropdownMenuContent>
          <EditCourseDialog
            isOpen={isEditDialogOpen}
            setIsOpen={setIsEditDialogOpen}
          >
            <CourseForm
              mode="edit"
              course={row.original}
              handleClose={() => setIsEditDialogOpen(false)}
            />
          </EditCourseDialog>
          <DisableConfirmationDialog
            isOpen={isDisableDialogOpen}
            setIsOpen={setIsDisableDialogOpen}
            code={code}
          />
        </DropdownMenu>
      )
    },
  },
]
