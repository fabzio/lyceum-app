import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { IRiskStudent } from '@/interfaces';

interface TableRiskStudentsProps {
  tableRiskStudents: IRiskStudent[]
}

const TableRiskStudents: React.FC<TableRiskStudentsProps> = ({ tableRiskStudents }) => {

  const OnRowClick = (riskStudent: IRiskStudent) => {
    alert(`Hiciste clic en: ${riskStudent.nombres}`);
  }

  return (
    <Table>
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
        {tableRiskStudents.map(riskStudent => (
          <TableRow 
            key={riskStudent.codigo} 
            className="border-b hover:bg-gray-50 transition duration-200 cursor-pointer" 
            onClick={() => OnRowClick(riskStudent)}
          >
            <TableCell className="py-3 px-6">{riskStudent.codigo}</TableCell>
            <TableCell className="py-3 px-6">{riskStudent.nombres}</TableCell>
            <TableCell className="py-3 px-6">{riskStudent.apellidos}</TableCell>
            <TableCell className="py-3 px-6">{riskStudent.curso}</TableCell>
            <TableCell className="py-3 px-6">{riskStudent.motivo}</TableCell>
            <TableCell className="py-3 px-6">{riskStudent.ultimaPuntuacion}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableRiskStudents;
