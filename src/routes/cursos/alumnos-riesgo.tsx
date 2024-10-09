import { QueryKeys } from '@/constants/queryKeys'
import RiskStudentService from '@/courses/services/riskStudent.service'
import RiskStudents from '@/courses/views/RiskStudent'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cursos/alumnos-riesgo')({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData({
      queryKey: [QueryKeys.courses.RISK_STUDENTS],
      queryFn: RiskStudentService.getRiskStudents,
    })
  },
  component: () => <RiskStudents />,
})
