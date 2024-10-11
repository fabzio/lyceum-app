import { QueryKeys } from '@/constants/queryKeys'
import RiskStudentService from '@/courses/services/riskStudent.service'
import DetailRiskStudent from '@/courses/views/RiskStudent/DetailRiskStudent'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cursos/alumnos-riesgo/$code')({
  loaderDeps: ({ search }) => {
    const { scheduleId } = search as { scheduleId: string }
    return {
      scheduleId,
    }
  },
  loader: async ({
    deps: { scheduleId },
    params,
    context: { queryClient },
  }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.courses.RISK_STUDENT_REPORTS, params.code],
      queryFn: () =>
        RiskStudentService.getRiskStudentReports({
          scheduleId: parseInt(scheduleId),
          studentCode: params.code,
        }),
    })
  },
  component: () => <DetailRiskStudent />,
})
