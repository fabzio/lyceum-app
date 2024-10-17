import { Filters } from '@/interfaces/types'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  OnChangeFn,
  PaginationOptions,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination'

type Props<T extends Record<string, string | number>> = {
  data: T[]
  columns: ColumnDef<T>[]
  pagination: PaginationState
  paginationOptions: Pick<PaginationOptions, 'onPaginationChange' | 'rowCount'>
  filters: Filters<T>
  onFilterChange: (filters: Partial<T>) => void
  sorting: SortingState
  onSortingChange: OnChangeFn<SortingState>
}

export default function DataTable<T extends Record<string, string | number>>({
  data,
  columns,
  pagination,
  paginationOptions,
  sorting,
  onSortingChange,
}: Props<T>) {
  const table = useReactTable({
    data,
    columns,
    state: { pagination, sorting },
    onSortingChange,
    ...paginationOptions,
    manualFiltering: true,
    manualSorting: true,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No se encontraron resultados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination className="flex justify-center my-4 space-x-2">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() => table.previousPage()}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={() => table.nextPage()}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}
