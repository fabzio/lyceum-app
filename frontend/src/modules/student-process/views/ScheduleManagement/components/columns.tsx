import Need from '@frontend/components/Need'
import { Button } from '@frontend/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@frontend/components/ui/dropdown-menu'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { toast } from '@frontend/hooks/use-toast'
import { StudentProcessPermissionsDict } from '@frontend/interfaces/enums/permissions/StudentProcess'
import { AccountRoles } from '@frontend/interfaces/models/AccountRoles'
import ScheduleService from '@frontend/service/Schedules.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
      const queryClient = useQueryClient()
      const rol = row.getValue('role') as number | null // Obtener el rol
      const lead = row.original.lead as boolean // Obtener el valor de 'lead'
      const id = row.original.id as string // Obtener el id del JP

      const { mutate: deleteJP } = useMutation({
        mutationFn: () => ScheduleService.deleteJP(id),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QueryKeys.users.GENERIC] })
          toast({
            title: 'Éxito',
            description: 'JP eliminado correctamente.',
          })
        },
        onError: () => {
          toast({
            title: 'Error',
            description: 'No se pudo eliminar el JP.',
            variant: 'destructive',
          })
        },
      })

      const { mutate: toggleLead } = useMutation({
        mutationFn: () => ScheduleService.toggleLead(id),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QueryKeys.users.GENERIC] })
          toast({
            title: 'Éxito',
            description: 'Estado de delegado actualizado correctamente.',
          })
        },
        onError: () => {
          toast({
            title: 'Error',
            description: 'No se pudo actualizar el estado de delegado.',
            variant: 'destructive',
          })
        },
      })

      const handleEliminarJP = () => deleteJP()
      const handleToggleLead = () => toggleLead()
      /*
      const handleEliminarJP = async () => {
        try {
          // Llamamos al servicio para eliminar el JP
          await ScheduleService.deleteJP(id); // Aquí llamamos al servicio de eliminación
          // Refrescar la lista o hacer alguna otra acción luego de eliminar
        } catch (error) {
          console.error('Error al eliminar JP', error);
        }
      };  
      const handleToggleLead = async () => {
        try {
          // Llamamos al servicio para alternar el valor de 'lead'
          await ScheduleService.toggleLead(id); // Aquí llamamos al servicio para alternar 'lead'
          // Refrescar la lista o hacer alguna otra acción luego de alternar el 'lead'
        } catch (error) {
          console.error('Error al alternar el lead', error);
        }
      };
      */
      if (rol === 1 || rol === null) {
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
                <Need
                  permissions={StudentProcessPermissionsDict.MANAGE_DELEGATE}
                >
                  <DropdownMenuItem
                    onClick={handleToggleLead} // Hacer delegado
                  >
                    Hacer delegado
                  </DropdownMenuItem>
                </Need>
              )}
              {rol === 1 && lead && (
                <Need
                  permissions={StudentProcessPermissionsDict.MANAGE_DELEGATE}
                >
                  <DropdownMenuItem
                    onClick={handleToggleLead} // Eliminar delegado
                  >
                    Eliminar delegado
                  </DropdownMenuItem>
                </Need>
              )}
              {rol === null && (
                <Need permissions={StudentProcessPermissionsDict.MANAGE_JP}>
                  <DropdownMenuItem onClick={handleEliminarJP}>
                    Eliminar JP
                  </DropdownMenuItem>
                </Need>
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
