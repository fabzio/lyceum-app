import { Button } from '@frontend/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@frontend/components/ui/dropdown-menu'
import { Term } from '@frontend/interfaces/models'
import { ColumnDef } from '@tanstack/react-table'
import { Check, MoreHorizontal } from 'lucide-react'

const TermTableColumns: ColumnDef<Term>[] = [
  {
    accessorKey: 'name',
    header: 'Semestre',
  },
  {
    accessorKey: 'current',
    header: 'Estado',
    cell: ({ row }) => (row.original.current ? 'VIGENTE' : ''),
  },
  {
    accessorKey: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const term = row.original

      const handleMakeCurrent = () => {
        // Aquí podrías llamar a un servicio para hacer el término vigente
        console.log(`Haciendo vigente el término: ${term.name}`)
      }

      return (
        <>
          {!term.current && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleMakeCurrent}>
                  <Check className="mr-2 h-4 w-4" />
                  Hacer vigente
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </>
      )
    },
  },
]

export default TermTableColumns
