import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
} from '@frontend/components/ui/pagination'
import {
  ColumnDef,
  PaginationState,
  PaginationOptions,
  SortingState,
  OnChangeFn,
  useReactTable,
  getCoreRowModel,
} from '@tanstack/react-table'
import { Button } from '@frontend/components/ui/button'

import { CourseProposal } from '@frontend/modules/enrollment/interfaces/CourseProposal'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@frontend/components/ui/accordion'

type Props<EnrollmentProposal extends Record<string, unknown>> = {
  data: EnrollmentProposal[]
  columns: ColumnDef<EnrollmentProposal>[]
  pagination: PaginationState
  paginationOptions: Pick<
    PaginationOptions,
    'onPaginationChange' | 'rowCount' | 'pageCount'
  >
  sorting: SortingState
  onSortingChange: OnChangeFn<SortingState>
  onRowClick?: (row: EnrollmentProposal) => void
}

export default function DataAccordion<
  EnrollmentProposal extends Record<string, unknown>,
>({
  data,
  columns,
  pagination,
  paginationOptions,
  sorting,
  onSortingChange,
}: Props<EnrollmentProposal>) {
  const table = useReactTable<EnrollmentProposal>({
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
  const currentPage = table.getState().pagination.pageIndex
  const totalPages = table.getPageCount()

  const paginationNumbers = generatePaginationNumbers(
    currentPage + 1,
    totalPages
  )
  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <AccordionItem key={row.id} value={row.id}>
              <AccordionTrigger>
                <div className="w-full px-2 flex justify-between">
                  <h3>{row.original.courseName as string}</h3>
                  <p>
                    {(row.original.schedules as CourseProposal[]).length}{' '}
                    {(row.original.schedules as CourseProposal[]).length === 1
                      ? 'horario'
                      : 'horarios'}
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-2">
                  {(row.original.schedules as CourseProposal[]).map(
                    (courseproposal: CourseProposal, idx: number) => (
                      <li
                        className="flex justify-between "
                        key={courseproposal.courseId}
                      >
                        <div className="grid grid-cols-12 items-center border-b py-2 flex-grow">
                          <span className="font-semibold col-span-9">
                            Horario N°{idx}
                          </span>
                          <span className=" col-span-1">
                            {courseproposal.vacants} vacantes
                          </span>
                          <span className=" col-span-1">
                            {courseproposal.visibility === 'visible'
                              ? 'Visible'
                              : 'Oculto'}
                          </span>
                          <span className=" col-span-1 flex flex-row-reverse">
                            <Button className="mx-5" variant={'outline'}>
                              Eliminar
                            </Button>
                          </span>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))
        ) : (
          <div className="text-center text-muted-foreground mt-2">
            No hay cursos propuestos
          </div>
        )}
      </Accordion>
      <Pagination className="flex justify-center my-4 space-x-2">
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="secondary"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
          </PaginationItem>

          {paginationNumbers.map((page, index) => (
            <PaginationItem key={index}>
              {page === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationItem>
                  <Button
                    variant={page === currentPage + 1 ? 'outline' : 'ghost'}
                    size="icon"
                    onClick={() => table.setPageIndex(+page - 1)}
                  >
                    {page}
                  </Button>
                </PaginationItem>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <Button
              variant="secondary"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Siguiente
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}

const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
  const surroundingPageCount = 2
  const finalPageNumbers: (number | string)[] = []
  let previousPage: number | undefined

  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
    const isPageAtStartOrEnd = pageNumber === 1 || pageNumber === totalPages
    const isPageNearCurrent =
      pageNumber >= currentPage - surroundingPageCount &&
      pageNumber <= currentPage + surroundingPageCount

    if (isPageAtStartOrEnd || isPageNearCurrent) {
      if (previousPage !== undefined) {
        const isThereAGap = pageNumber - previousPage === 2
        const isThereALargerGap = pageNumber - previousPage > 2

        if (isThereAGap) {
          finalPageNumbers.push(previousPage + 1)
        } else if (isThereALargerGap) {
          finalPageNumbers.push('...')
        }
      }

      finalPageNumbers.push(pageNumber)
      previousPage = pageNumber
    }
  }

  return finalPageNumbers
}
