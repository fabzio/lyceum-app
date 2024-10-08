import { Button } from '@/components/ui/button'
import { QueryKeys } from '@/constants/queryKeys'
import RiskStudentService from '@/courses/services/riskStudent.service'
import useCourseStore from '@/courses/store'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import moment from 'moment'
import ReportDetail from './ReportDetail'
import { useState } from 'react'
import ReportsCard from './ReportsCard'

export default function DetailRiskStudent() {
  const { code } = useParams({
    from: '/cursos/alumnos-riesgo/$code',
  })

  const [selectedReport, setSelectedReport] = useState<number | null>(null)

  const { selectedRiskStudent } = useCourseStore()
  if (!selectedRiskStudent) return <p>No se ha seleccionado un estudiante</p>

  const { data: reports } = useSuspenseQuery({
    queryKey: [QueryKeys.courses.RISK_STUDENT_REPORTS, code],
    queryFn: () =>
      RiskStudentService.getRiskStudentReports({
        scheduleId: selectedRiskStudent.schedule.id,
        studentCode: code,
      }),
  })

  return (
    <div className="flex flex-row justify-between my-6 p-2">
      <div className="flex flex-col gap-2 flex-grow">
        {reports.map((report, idx) => (
          <ReportsCard
            key={report.id}
            id={report.id}
            date={moment(report.date).calendar()}
            score={report.score}
            selectReport={setSelectedReport}
            selected={selectedReport? selectedReport === report.id : idx === 0}
          />
        ))}
      </div>
      <div className="w-2/3">
        <h2 className="text-3xl font-bold">Reporte de estado</h2>
        <div className="border p-4 rounded shadow mt-4">
          <h3 className="text-2xl font-semibold">Alumno</h3>
          <p>
            {selectedRiskStudent.student.name +
              ' ' +
              selectedRiskStudent.student.surname}
          </p>
          <p>{code}</p>

          <h3 className="text-2xl font-semibold mt-4">Curso</h3>
          <p>{selectedRiskStudent.course.name}</p>

          <h3 className="text-2xl font-semibold mt-4">Docente</h3>
          <p>{selectedRiskStudent.schedule.professor}</p>

          <ReportDetail reportId={selectedReport} />
          <div className="flex justify-center mt-4">
            <Button className="mt-4">Solicitar actualización</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
