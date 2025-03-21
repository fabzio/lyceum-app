import { Skeleton } from '@frontend/components/ui/skeleton'
import { Textarea } from '@frontend/components/ui/textarea'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { RiskStudentReport } from '@frontend/modules/student-process/interfaces/RiskStudentReport'
import RiskStudentReportService from '@frontend/modules/student-process/services/riskStudentReport.service'
import { useQuery } from '@tanstack/react-query'
import { useParams, useSearch } from '@tanstack/react-router'
import { Angry, Frown, Laugh, Meh, Smile } from 'lucide-react'
import moment from 'moment'

export default function ReportDetail() {
  const { code } = useParams({
    from: '/_auth/procesos-de-estudiantes/alumnos-riesgo/$code',
  })
  const { scheduleId, reportId } = useSearch({
    from: '/_auth/procesos-de-estudiantes/alumnos-riesgo/$code',
  })
  const { data: reportsDetail, isLoading } = useQuery({
    queryKey: [QueryKeys.courses.RISK_STUDENT_REPORT, reportId ?? 0],
    queryFn: () =>
      RiskStudentReportService.getRiskStudentReport({
        reportId: reportId ?? null,
        studentCode: code,
        scheduleId: +scheduleId,
      }),
  })
  let reportDetail: RiskStudentReport | null = null
  if (!isLoading) {
    if (!reportsDetail?.[0]) return null
    reportDetail = reportsDetail[0]
  }
  const getColorForFace = (faceScore: number) =>
    reportDetail?.score === faceScore ? mapColor[faceScore - 1] : 'gray'
  return (
    <>
      <div>
        <h3 className="text-2xl font-semibold mt-4">Calificación</h3>
        <span> {moment(reportDetail?.date).calendar()}</span>
      </div>
      <div className="flex justify-center space-x-4">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={idx} className=" rounded-full h-12 w-12" />
          ))
        ) : (
          <>
            <Angry size={50} color={getColorForFace(1)} />
            <Frown size={50} color={getColorForFace(2)} />
            <Meh size={50} color={getColorForFace(3)} />
            <Smile size={50} color={getColorForFace(4)} />
            <Laugh size={50} color={getColorForFace(5)} />
          </>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-semibold mb-2">Comentarios</h3>
        {isLoading ? (
          <Skeleton className="h-20" />
        ) : (
          <Textarea value={reportDetail?.observation} disabled />
        )}
      </div>
    </>
  )
}

const mapColor = ['#f70909', '#f75109', '#fec84b', 'lightgreen', 'skyblue']
