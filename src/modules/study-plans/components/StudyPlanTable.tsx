import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { StudyPlan } from '@/modules/study-plans/interfaces/StudyPlan'
import { useNavigate } from '@tanstack/react-router'

interface StudyPlanTableProps {
  studyPlans: StudyPlan[]
}

export default function StudyPlanTable({ studyPlans }: StudyPlanTableProps) {
  const navigate = useNavigate()

  const onEdit = (planId: string) => {
    navigate({
      to: '/plan-de-estudios/gestion-plan/$planId',
      params: { planId },
    })
  }
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
            <TableCell>{plan.initTerm}</TableCell>
            <TableCell>{plan.endTerm}</TableCell>
            <TableCell>
              <button onClick={() => onEdit(plan.id)}>Editar</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
