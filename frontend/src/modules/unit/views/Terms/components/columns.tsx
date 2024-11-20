import { Button } from '@frontend/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@frontend/components/ui/dropdown-menu'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { Term } from '@frontend/interfaces/models'
import UnitService from '@frontend/modules/unit/services/Unit.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { Check, MoreHorizontal } from 'lucide-react'
import { toast } from '@frontend/hooks/use-toast'

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
      const queryClient = useQueryClient()
      const id = row.original.id as number

      const { mutate: makeCurrent } = useMutation({
        mutationFn: () => UnitService.makeCurrentTerm(id),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QueryKeys.unit.TERMS] })
          toast({
            title: 'Éxito',
            description: 'Semestre actualizado correctamente.',
          })
        },
        onError: () => {
          toast({
            title: 'Error',
            description: 'No se pudo actualizar el semestre.',
            variant: 'destructive',
          })
        },
      })

      const handleMakeCurrent = () => makeCurrent()

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
