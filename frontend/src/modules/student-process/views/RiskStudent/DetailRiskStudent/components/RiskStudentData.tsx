import { Label } from '@frontend/components/ui/label'
import { getRiskStudentDetail } from '@frontend/modules/student-process/interfaces/RiskStudentDetail'

interface Props {
  selectedRiskStudent: getRiskStudentDetail
}
export default function RiskStudentData({ selectedRiskStudent }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-xl font-semibold">Alumno</Label>
      <Label className="text-muted-foreground">Nombre</Label>
      <p>
        {selectedRiskStudent.student.name +
          ' ' +
          selectedRiskStudent.student.surname}
      </p>

      <Label className="text-muted-foreground">Código</Label>
      <p>{selectedRiskStudent.student.code}</p>
      <Label className="text-muted-foreground">Correo</Label>
      <p>{selectedRiskStudent.student.email}</p>
    </div>
  )
}
