import { Button } from '@frontend/components/ui/button'
import { QueryKeys } from '@frontend/constants/queryKeys'
import RiskStudentService from '@frontend/modules/student-process/services/riskStudent.service'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useNavigate, useParams, useSearch } from '@tanstack/react-router'
import NewReportDialog from './components/NewReportDialog'
import { Separator } from '@frontend/components/ui/separator'
import { Label } from '@frontend/components/ui/label'
import ReportDetail from './components/ReportDetail'
import RiskStudentTrack from './components/RiskStudentTrack'
import Need from '@frontend/components/Need'
import { StudentProcessPermissionsDict } from '@frontend/interfaces/enums/permissions/StudentProcess'
import RiskStudentData from './components/RiskStudentData'
import RiskStudentsProfessorData from './components/RiskStudentsProfessorData'
import DeleteRiskStudentDialog from './components/DeleteRiskStudentDialog'
import RiskStudentReportService from '@frontend/modules/student-process/services/riskStudentReport.service'

export default function StudentReport() {
  const { code } = useParams({
    from: '/_auth/procesos-de-estudiantes/alumnos-riesgo/$code',
  })
  const { scheduleId } = useSearch({
    from: '/_auth/procesos-de-estudiantes/alumnos-riesgo/$code',
  })
  const navigate = useNavigate()

  const handleDeleteRiskStudent = async (code: string, scheduleId: string) => {
    try {
      await RiskStudentReportService.deleteRiskStudent({
        studentCode: code,
        scheduleId: +scheduleId, // Convertir a número si necesario
      })
      console.log('Risk student deleted successfully')
      navigate({ to: '/procesos-de-estudiantes/alumnos-riesgo' })
    } catch (error) {
      console.error('Error deleting risk student:', error)
    }
  }
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
          <h2 className="text-3xl font-bold">Reporte de estado</h2>

          <DeleteRiskStudentDialog
            studentCode={code}
            scheduleId={scheduleId.toString()}
            onDelete={handleDeleteRiskStudent}
          />

          {selectedRiskStudent.state ? (
            <Button variant="secondary" disabled>
              No se ha solicitado un nuevo reporte
            </Button>
          ) : (
            <Need
              permissions={
                StudentProcessPermissionsDict.UPDATE_RISK_STUDENT_REPORT
              }
            >
              <div className="flex justify-center ">
                <NewReportDialog />
              </div>
            </Need>
          )}
        </div>
      </div>
      <Separator />

      <section className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RiskStudentData selectedRiskStudent={selectedRiskStudent} />
          <RiskStudentsProfessorData
            selectedRiskStudent={selectedRiskStudent}
          />
        </div>
        <Separator className="my-4" />
        <div>
          <Label className="text-xl font-semibold">Motivo de riesgo</Label>
          <p>{selectedRiskStudent.reason}</p>
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
        <Separator className="my-4" />
        <ReportDetail />
        <div className="flex flex-col w-full items-center">
          <RiskStudentTrack />
        </div>
      </section>
    </div>
  )
}
