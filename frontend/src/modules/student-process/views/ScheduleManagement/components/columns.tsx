import { Button } from '@frontend/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@frontend/components/ui/dropdown-menu'
import { AccountRoles } from '@frontend/interfaces/models/AccountRoles'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
// TODO: Agregar funcionalidad para editar y deshabilitar estudiantes
// import DisableConfirmationDialog from './DisableConfirmationDialog'
// import { useState } from 'react'
// import EditStudentDialog from './EditStudentDialog'
// import StudentForm from './StudentForm'
export const AccountTableColumns: ColumnDef<AccountRoles>[] = [
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
    accessorKey: 'role',
    header: 'Rol',
    cell: ({ row }) => {
      const rol = row.getValue('role') as number | null // Obtener la lista de roles
      const lead = row.original.lead as boolean
      let roleLabel: string

      if (rol === null) {
        roleLabel = 'JP'
      } else if (rol === 1) {
        roleLabel = lead ? 'Delegado' : 'Estudiante'
      } else if (rol === 2) {
        roleLabel = lead ? 'Profesor Principal' : 'Profesor'
      } else {
        roleLabel = 'Otro' // Default si el rol no es específico
      }
      return <div>{roleLabel}</div>
    },
  },
  {
    accessorKey: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const rol = row.getValue('role') as number | null // Obtener el rol
      const lead = row.original.lead as boolean // Obtener el valor de 'lead'

      if ((rol === 1 && !lead) || rol === null) {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <span className="sr-only">Abrir acciones</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {rol === 1 && !lead && (
                <DropdownMenuItem
                  onClick={() => {
                    /* Lógica para hacer delegado */
                  }}
                >
                  Hacer delegado
                </DropdownMenuItem>
              )}
              {rol === null && (
                <DropdownMenuItem
                  onClick={() => {
                    /* Lógica para eliminar JP */
                  }}
                >
                  Eliminar JP
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      } else {
        return null
      }
    },
  },
]
