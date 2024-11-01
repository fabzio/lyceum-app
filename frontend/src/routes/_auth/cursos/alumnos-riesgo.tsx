import { QueryKeys } from '@/constants/queryKeys'
import { Filters } from '@/interfaces/types'
import RiskStudentService from '@/modules/student-process/services/riskStudent.service'
import RiskStudents from '@/modules/student-process/views/RiskStudent'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/cursos/alumnos-riesgo')({
  validateSearch: () => ({}) as Filters,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.courses.RISK_STUDENTS, {}],
      queryFn: () => RiskStudentService.getRiskStudents({}),
    })
  },
  component: () => <RiskStudents />,
})
