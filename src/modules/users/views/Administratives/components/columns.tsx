import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Administrative } from '@/modules/users/interfaces/Administrative'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
// TODO: Agregar funcionalidad para editar y deshabilitar profesores
// import DisableConfirmationDialog from './DisableConfirmationDialog'
// import { useState } from 'react'
// import EditAdministrativeDialog from './EditAdministrativeDialog'
// import AdministrativeForm from './AdministrativeForm'
export const AdministrativeTableColumns: ColumnDef<Administrative>[] = [
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
    //TODO: Agregar funcionalidad para editar y deshabilitar profesores
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
          {/* <EditAdministrativeDialog
            isOpen={isEditDialogOpen}
            setIsOpen={setIsEditDialogOpen}
          >
            <AdministrativeForm
              mode="edit"
              Administrative={row.original}
              handleClose={() => setIsEditDialogOpen(false)}
            />
          </EditAdministrativeDialog>
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
