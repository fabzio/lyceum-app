import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { IRiskStudent } from '@/interfaces';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

interface TableRiskStudentsProps {
  tableRiskStudents: IRiskStudent[]
}

const TableRiskStudents: React.FC<TableRiskStudentsProps> = ({ tableRiskStudents }) => {

  const navigate = useNavigate();

  const OnRowClick = (riskStudent: IRiskStudent) => {
    navigate({ to: `/cursos/alumnosRiesgo/${riskStudent.codigo}` });
  }

  // Estado para controlar la página actual
  const [currentPage, setCurrentPage] = useState(1);

  // Número máximo de estudiantes por página
  const studentsPerPage = 6;

  // Calcular el índice de los estudiantes que se muestran en la página actual
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  // Estudiantes que se mostrarán en la página actual
  const currentStudents = tableRiskStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  // Número total de páginas
  const totalPages = Math.ceil(tableRiskStudents.length / studentsPerPage);



  // Funciones para cambiar de página
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <Table className="mt-4">
        <TableHeader>
          <TableRow className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <TableHead className="py-3 px-6 text-left">Código</TableHead>
            <TableHead className="py-3 px-6 text-left">Nombres</TableHead>
            <TableHead className="py-3 px-6 text-left">Apellidos</TableHead>
            <TableHead className="py-3 px-6 text-left">Curso</TableHead>
            <TableHead className="py-3 px-6 text-left">Motivo</TableHead>
            <TableHead className="py-3 px-6 text-left">Última Puntuación</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="text-gray-600 text-sm font-light">
          {/* Verificar si no hay estudiantes filtrados */}
          {currentStudents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                No se encontraron estudiantes en riesgo.
              </TableCell>
            </TableRow>
          ) : (
            currentStudents.map((riskStudent) => (
              <TableRow
                key={riskStudent.codigo}
                className="border-b hover:bg-gray-50 transition duration-200 cursor-pointer"
                onClick={() => OnRowClick(riskStudent)}
              >
                <TableCell className="py-3 px-6 text-center">{riskStudent.codigo}</TableCell>
                <TableCell className="py-3 px-6">{riskStudent.nombres}</TableCell>
                <TableCell className="py-3 px-6">{riskStudent.apellidos}</TableCell>
                <TableCell className="py-3 px-6">{riskStudent.curso}</TableCell>
                <TableCell className="py-3 px-6">{riskStudent.motivo}</TableCell>
                <TableCell className="py-3 px-6 text-center">{riskStudent.ultimaPuntuacion}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Controles de paginación */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Anterior
        </button>
        
        <span>
          Página {currentPage} de {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Siguiente
        </button>
      </div>
    </div>
  )
  
};

export default TableRiskStudents;
