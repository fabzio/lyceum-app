import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { IRiskStudent } from '@/interfaces'
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

interface TableRiskStudentsProps {
  tableRiskStudents: IRiskStudent[]
}

export default function TableRiskStudents({
  tableRiskStudents,
}: TableRiskStudentsProps) {
  const navigate = useNavigate()

  const OnRowClick = (riskStudent: IRiskStudent) => {
    navigate({ to: `/cursos/alumnosRiesgo/${riskStudent.codigo}` })
  }

  // Estado para controlar la página actual
  const [currentPage, setCurrentPage] = useState(1)

  // Número máximo de estudiantes por página1
  const studentsPerPage = 6

  // Calcular el índice de los estudiantes que se muestran en la página actual
  const indexOfLastStudent = currentPage * studentsPerPage
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage

  // Estudiantes que se mostrarán en la página actual
  const currentStudents = tableRiskStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  )

  // Número total de páginas
  const totalPages = Math.ceil(tableRiskStudents.length / studentsPerPage)

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
            <TableHead className="py-3 px-6 text-left">Código</TableHead>
            <TableHead className="py-3 px-6 text-left">Nombres</TableHead>
            <TableHead className="py-3 px-6 text-left">Apellidos</TableHead>
            <TableHead className="py-3 px-6 text-left">Curso</TableHead>
            <TableHead className="py-3 px-6 text-left">Motivo</TableHead>
            <TableHead className="py-3 px-6 text-left">
              Última Puntuación
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="text-sm font-light">
          {currentStudents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No se encontraron estudiantes en riesgo.
              </TableCell>
            </TableRow>
          ) : (
            currentStudents.map((riskStudent) => (
              <TableRow
                key={riskStudent.codigo}
                className="transition duration-200 cursor-pointer"
                onClick={() => OnRowClick(riskStudent)}
              >
                <TableCell className="py-3 px-6 text-center">
                  {riskStudent.codigo}
                </TableCell>
                <TableCell className="py-3 px-6">
                  {riskStudent.nombres}
                </TableCell>
                <TableCell className="py-3 px-6">
                  {riskStudent.apellidos}
                </TableCell>
                <TableCell className="py-3 px-6">{riskStudent.curso}</TableCell>
                <TableCell className="py-3 px-6">
                  {riskStudent.motivo}
                </TableCell>
                <TableCell className="py-3 px-6 text-center">
                  {riskStudent.ultimaPuntuacion}
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
