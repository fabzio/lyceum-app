import { Button } from '@/components/ui/button'
import { QueryKeys } from '@/constants/queryKeys'
import RiskStudentService from '@/modules/courses/services/riskStudent.service'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams, useSearch } from '@tanstack/react-router'
import NewReportDialog from './components/NewReportDialog'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import ReportDetail from './components/ReportDetail'
import RiskStudentTrack from './components/RiskStudentTrack'

export default function StudentReport() {
  const { code } = useParams({
    from: '/_auth/cursos/alumnos-riesgo/$code',
  })
  const { scheduleId } = useSearch({
    from: '/_auth/cursos/alumnos-riesgo/$code',
  })

  const { data: selectedRiskStudent } = useSuspenseQuery({
    queryKey: [QueryKeys.courses.RISK_STUDENT, code],
    queryFn: () =>
      RiskStudentService.getRiskStudentDetail({
        studentCode: code,
        scheduleId: +scheduleId,
      }),
  })
  return (
    <div className="flex w-full h-full flex-col">
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2 h-10 w-full p-2 justify-between">
          <h1 className="text-3xl font-bold">Reporte de estado</h1>
          {selectedRiskStudent.state ? (
            <Button variant="secondary" disabled>
              No se ha solicitado un nuevo reporte
            </Button>
          ) : (
            <div className="flex justify-center ">
              <NewReportDialog />
            </div>
          )}
        </div>
      </div>
      <Separator />

      <section className="space-y-4">
        <ReportDetail />

        <div className="flex flex-col w-full items-center">
          <h2 className="font-semibold text-xl">Rendimiento histórico</h2>
          <RiskStudentTrack />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-xl font-semibold">Curso</Label>
            <p>
              {selectedRiskStudent.course.code +
                ' - ' +
                selectedRiskStudent.course.name}
            </p>
          </div>
          <div>
            <Label className="text-xl font-semibold">Horario</Label>
            <p>{selectedRiskStudent.schedule.code}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
