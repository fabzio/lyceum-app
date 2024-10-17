import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Course } from '@/interfaces/models/Course'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

export const courseTableColumns: ColumnDef<Course>[] = [
  {
    accessorKey: 'code',
    header: 'Código',
    cell: ({ row }) => <div className="capitalize">{row.getValue('code')}</div>,
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'credits',
    header: 'Créditos',
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
      const course = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <span className="sr-only">Abrir acciones</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel onClick={() => console.log(course.code)}>
              Acciones
            </DropdownMenuLabel>
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem>Deshabilitar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
