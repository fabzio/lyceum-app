import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { StudyPlan } from '@/study-plans/interfaces/StudyPlan';

interface StudyPlanTableProps {
  studyPlans: StudyPlan[];
  onEdit: (studyPlan: StudyPlan) => void;
}

export default function StudyPlanTable({ studyPlans, onEdit }: StudyPlanTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Inicio del Término</TableHead>
          <TableHead>Fin del Término</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {studyPlans.map((plan) => (
          <TableRow key={plan.id}>
            <TableCell>{plan.id}</TableCell>
            <TableCell>{plan.init_term}</TableCell>
            <TableCell>{plan.end_term}</TableCell>
            <TableCell>
              <button onClick={() => onEdit(plan)}>Editar</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
