import { QueryKeys } from '@/constants/queryKeys'
import RiskStudentService from '@/modules/courses/services/riskStudent.service'
import DetailRiskStudent from '@/modules/courses/views/RiskStudent/DetailRiskStudent'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/cursos/alumnos-riesgo/$code')({
  validateSearch: () => ({}) as { scheduleId: number; reportId?: number },
  loaderDeps: ({ search }) => {
    const { scheduleId } = search
    return {
      scheduleId,
    }
  },
  loader: async ({
    deps: { scheduleId },
    params: { code },
    context: { queryClient },
  }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.courses.RISK_STUDENT, code],
      queryFn: () =>
        RiskStudentService.getRiskStudentDetail({
          scheduleId: scheduleId,
          studentCode: code,
        }),
    })
  },
  component: () => <DetailRiskStudent />,
})
