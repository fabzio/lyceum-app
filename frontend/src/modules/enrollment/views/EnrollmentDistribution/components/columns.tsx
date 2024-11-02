import { Button } from '@frontend/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@frontend/components/ui/dropdown-menu'
import { CourseProposal } from '@frontend/modules/enrollment/interfaces/CourseProposal'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
export const CourseProposalTableColumns: ColumnDef<CourseProposal>[] = [
  {
    accessorKey: 'courseId',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Código
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue('courseId')}</div>,
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
    cell: ({ row }) => <div className="capitalize">{row.getValue('courseName')}</div>,
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
    accessorKey: 'visible',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Visibles
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('visible')}</div>,
  },
  {
    accessorKey: 'hidden',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Ocultos
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('hidden')}</div>,
  },
  {
    accessorKey: 'actions',
    header: 'Acciones',
    //TODO: Modificar funcionalidad para agregar
    //cell: ({ row }) => {
    cell: ({}) => {
      // const { code } = row.original
      // const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
      // const [isDisableDialogOpen, setIsDisableDialogOpen] = useState(false)

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Agregar
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
