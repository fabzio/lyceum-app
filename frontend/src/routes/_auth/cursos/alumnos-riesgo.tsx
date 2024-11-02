import { QueryKeys } from '@frontend/constants/queryKeys'
import { Filters } from '@frontend/interfaces/types'
import RiskStudentService from '@frontend/modules/student-process/services/riskStudent.service'
import RiskStudents from '@frontend/modules/student-process/views/RiskStudent'
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
