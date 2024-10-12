import { QueryKeys } from '@/constants/queryKeys'
import RiskStudentService from '@/modules/courses/services/riskStudent.service'
import RiskStudents from '@/modules/courses/views/RiskStudent'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cursos/alumnos-riesgo')({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.courses.RISK_STUDENTS],
      queryFn: RiskStudentService.getRiskStudents,
    })
  },
  component: () => <RiskStudents />,
})
