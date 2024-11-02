import { Button } from '@frontend/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@frontend/components/ui/dropdown-menu'
import { Student } from '@frontend/modules/users/interfaces/Student'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
// TODO: Agregar funcionalidad para editar y deshabilitar estudiantes
// import DisableConfirmationDialog from './DisableConfirmationDialog'
// import { useState } from 'react'
// import EditStudentDialog from './EditStudentDialog'
// import StudentForm from './StudentForm'
export const StudentTableColumns: ColumnDef<Student>[] = [
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
    accessorFn: (row) => `${row.name} ${row.firstSurname} ${row.secondSurname}`,
    header: 'Nombre',
  },
  //XXX: Decidir si se deja el código anterior o se usa el código de abajo
  // {
  //   accessorKey: 'name',
  //   header: ({ column }) => (
  //     <Button
  //       variant="ghost"
  //       onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //     >
  //       Nombre
  //       <ArrowUpDown className="ml-2 h-4 w-4" />
  //     </Button>
  //   ),
  //   cell: ({ row }) => (String(row.getValue('name')))
  // },
  // {
  //   accessorKey: 'firstSurname',
  //   header: ({ column }) => (
  //     <Button
  //       variant="ghost"
  //       onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //     >
  //       Primer Apellido
  //       <ArrowUpDown className="ml-2 h-4 w-4" />
  //     </Button>
  //   ),
  //   cell: ({ row }) => (String(row.getValue('firstSurname')))
  // },
  // {
  //   accessorKey: 'secondSurname',
  //   header: ({ column }) => (
  //     <Button
  //       variant="ghost"
  //       onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //     >
  //       Segundo Apellido
  //       <ArrowUpDown className="ml-2 h-4 w-4" />
  //     </Button>
  //   ),
  //   cell: ({ row }) => (String(row.getValue('secondSurname')))
  // },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Correo
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('email')}</div>,
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
