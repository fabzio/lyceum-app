import { Button } from '@frontend/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@frontend/components/ui/dropdown-menu'
import EnrollmentProposal from '@frontend/modules/enrollment/interfaces/EnrollmentProposal'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
// TODO: Agregar funcionalidad para eliminar horarios
// import DisableConfirmationDialog from './DisableConfirmationDialog'
// import { useState } from 'react'
// import EditStudentDialog from './EditStudentDialog'
// import StudentForm from './StudentForm'
export const EnrollmentProposalColumns: ColumnDef<EnrollmentProposal>[] = [
  {
    accessorKey: 'code',
    cell: ({ row }) => <div className="capitalize">{row.getValue('code')}</div>,
  },
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
    accessorKey: 'actions',
    header: 'Acciones',
    //TODO: Agregar funcionalidad para editar y deshabilitar estudiantes
    //cell: ({ row }) => {
    cell: ({}) => {
      // const { code } = row.original
      // const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
      // const [isDisableDialogOpen, setIsDisableDialogOpen] = useState(false)

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <span className="sr-only">Abrir acciones</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}> */}
            <DropdownMenuItem>Editar</DropdownMenuItem>
            {/* <DropdownMenuItem onClick={() => setIsDisableDialogOpen(true)}> */}
            <DropdownMenuItem>Deshabilitar</DropdownMenuItem>
          </DropdownMenuContent>
          {/* <EditStudentDialog
            isOpen={isEditDialogOpen}
            setIsOpen={setIsEditDialogOpen}
          >
            <StudentForm
              mode="edit"
              Student={row.original}
              handleClose={() => setIsEditDialogOpen(false)}
            />
          </EditStudentDialog>
          <DisableConfirmationDialog
            isOpen={isDisableDialogOpen}
            setIsOpen={setIsDisableDialogOpen}
            code={code}
          /> */}
        </DropdownMenu>
      )
    },
  },
]
