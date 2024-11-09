import moment from 'moment'
import ReportsCard from './ReportsCard'
import { ScrollArea } from '@frontend/components/ui/scroll-area'
import ExpandibleAsidebar from '@frontend/components/ExpandibleAsidebar'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@frontend/constants/queryKeys'
import RiskStudentService from '@frontend/modules/student-process/services/riskStudent.service'
import { useNavigate, useParams, useSearch } from '@tanstack/react-router'
import { Skeleton } from '@frontend/components/ui/skeleton'

export default function ReportList() {
  const { code } = useParams({
    from: '/_auth/cursos/alumnos-riesgo/$code',
  })
  const { scheduleId, reportId } = useSearch({
    from: '/_auth/cursos/alumnos-riesgo/$code',
  })
  const naviagte = useNavigate({
    from: '/cursos/alumnos-riesgo/$code',
  })
  const setSelectedReport = (reportId: number) => {
    naviagte({
      search: {
        reportId: reportId,
        scheduleId,
      },
    })
  }
  const { data: reports, isLoading } = useQuery({
    queryKey: [QueryKeys.courses.RISK_STUDENT_REPORTS, code],
    queryFn: () =>
      RiskStudentService.getRiskStudentReports({
        scheduleId: +scheduleId,
        studentCode: code,
      }),
  })
  if (isLoading)
    return (
      <ul className="flex flex-col">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Skeleton key={idx} className="h-12 w-full" />
        ))}
      </ul>
    )
  return (
    <ExpandibleAsidebar defaultOpen>
      <ScrollArea className="h-svh w-full">
        <div className="flex flex-col gap-2 flex-grow">
          {(reports?.length ?? 0 > 0) ? (
            reports?.map((report, idx) => (
              <ReportsCard
                key={report.id}
                id={report.id}
                date={moment(report.date).calendar()}
                score={report.score}
                selectReport={setSelectedReport}
                selected={reportId ? reportId === report.id : idx === 0}
              />
            ))
          ) : (
            <p className="text-muted-foreground">
              No se han solicitado actualizaciones de reporte de seguimiento
            </p>
          )}
        </div>
      </ScrollArea>
    </ExpandibleAsidebar>
  )
}
