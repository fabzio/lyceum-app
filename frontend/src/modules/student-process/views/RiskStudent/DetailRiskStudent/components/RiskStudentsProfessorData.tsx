import { Label } from '@frontend/components/ui/label'
import { getRiskStudentDetail } from '@frontend/modules/student-process/interfaces/RiskStudentDetail'

interface Props {
  selectedRiskStudent: getRiskStudentDetail
}
export default function RiskStudentsProfessorData({
  selectedRiskStudent,
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-xl font-semibold">Docente</Label>
      <Label className="text-muted-foreground">Nombre</Label>
      <p>
        {selectedRiskStudent.schedule.professorName +
          ' ' +
          selectedRiskStudent.schedule.professorSurname}
      </p>
      <Label className="text-muted-foreground">Código</Label>
      <p>{selectedRiskStudent.schedule.professorCode}</p>
      <Label className="text-muted-foreground">Correo</Label>
      <p>{selectedRiskStudent.schedule.professorEmail}</p>
    </div>
  )
}
