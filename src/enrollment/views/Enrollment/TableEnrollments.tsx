import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
  } from '@/components/ui/table'
  import { useNavigate } from '@tanstack/react-router'
  import { useState } from 'react'
  import {
    Pagination,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationContent,
  } from '@/components/ui/pagination'
  import { EnrollmentGeneral } from '@/enrollment/interfaces/EnrollmentGeneral'
  
  interface TableEnrollmentsProps {
    tableEnrollments: EnrollmentGeneral[]
  }
  
  export default function TableEnrollments({
    tableEnrollments,
  }: TableEnrollmentsProps) {
    const navigate = useNavigate()
    const OnRowClick = (enrollment: EnrollmentGeneral) => {
        
      navigate({
        to: `/matricula/${enrollment.request_number}`,
        /*
        params: {
          request_number: enrollment.request_number.toString(),
        },
        */
        /*
        search: {
          scheduleId: enrollment.schedule.id,
        },
        */
      })
        
    }
    // Estado para controlar la página actual
    const [currentPage, setCurrentPage] = useState(1)
  
    // Número máximo de inscripciones por página
    const enrollmentsPerPage = 6
  
    // Calcular el índice de las inscripciones que se muestran en la página actual
    const indexOfLastEnrollment = currentPage * enrollmentsPerPage
    const indexOfFirstEnrollment = indexOfLastEnrollment - enrollmentsPerPage
  
    // Inscripciones que se mostrarán en la página actual
    const currentEnrollments = tableEnrollments.slice(
      indexOfFirstEnrollment,
      indexOfLastEnrollment
    )
  
    // Número total de páginas
    const totalPages = Math.ceil(tableEnrollments.length / enrollmentsPerPage)
  
    // Función para cambiar de página
    const handlePageChange = (page: number) => {
      if (page > 0 && page <= totalPages) {
        setCurrentPage(page)
      }
    }
  
    return (
      <div>
        <Table className="mt-4">
          <TableHeader>
            <TableRow className="text-sm leading-normal">
              <TableHead className="py-3 px-6 text-left">Estado</TableHead>
              <TableHead className="py-3 px-6 text-left">Nro. Solicitud</TableHead>
              <TableHead className="py-3 px-6 text-left">Tipo de Solicitud</TableHead>
              <TableHead className="py-3 px-6 text-left">Nombre Alumno</TableHead>
              <TableHead className="py-3 px-6 text-left">Curso</TableHead>
              <TableHead className="py-3 px-6 text-left">Horario</TableHead>
            </TableRow>
          </TableHeader>
  
          <TableBody className="text-sm font-light">
            {currentEnrollments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No se encontraron solicitudes de modificación de matrícula.
                </TableCell>
              </TableRow>
            ) : (
              currentEnrollments.map((enrollment) => (
                <TableRow
                  key={enrollment.request_number}
                  className="transition duration-200 cursor-pointer"
                  onClick={() => OnRowClick(enrollment)}
                >
                  <TableCell className="py-3 px-6">
                    {enrollment.state}
                  </TableCell>
                  <TableCell className="py-3 px-6">
                    {enrollment.request_number}
                  </TableCell>
                  <TableCell className="py-3 px-6">
                    {enrollment.request_type}
                  </TableCell>
                  <TableCell className="py-3 px-6">
                    {`${enrollment.student.name} ${enrollment.student.surname}`}
                  </TableCell>
                  <TableCell className="py-3 px-6">
                    {enrollment.schedule.course_name}
                  </TableCell>
                  <TableCell className="py-3 px-6">
                    {enrollment.schedule.code}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
  
        {/* Paginación */}
        <Pagination className="flex justify-center my-4 space-x-2">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`${
                  currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
              />
            </PaginationItem>
  
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  className={`px-4 py-2 ${currentPage === index + 1 ? '' : ''}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                className={`${
                  currentPage === totalPages
                    ? ' cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    )
  }
  