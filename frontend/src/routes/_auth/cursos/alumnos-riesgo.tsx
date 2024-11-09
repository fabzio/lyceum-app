import { QueryKeys } from '@frontend/constants/queryKeys'
import { StudentProcessPermissionsDict } from '@frontend/interfaces/enums/permissions/StudentProcess'
import { Filters } from '@frontend/interfaces/types'
import { haveSomePermission } from '@frontend/lib/utils'
import RiskStudentService from '@frontend/modules/student-process/services/riskStudent.service'
import RiskStudents from '@frontend/modules/student-process/views/RiskStudent'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/cursos/alumnos-riesgo')({
  validateSearch: () => ({}) as Filters,
  beforeLoad: async ({ context: { sessionStore } }) => {
    const { getAllPermissions } = sessionStore
    if (
      !haveSomePermission(getAllPermissions(), [
        StudentProcessPermissionsDict.LOAD_RISK_STUDENTS,
        StudentProcessPermissionsDict.UPDATE_RISK_STUDENT_REPORT,
      ])
    ) {
      throw redirect({
        to: '/',
      })
    }
  },
  loader: async ({ context: { queryClient, sessionStore } }) => {
    const { session, getRoleWithPermission } = sessionStore
    const role = getRoleWithPermission(
      StudentProcessPermissionsDict.LOAD_RISK_STUDENTS
    )
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.courses.RISK_STUDENTS, {}],
      queryFn: role?.unitId
        ? () =>
            RiskStudentService.getRiskStudentsOfSpeciality({
              specialityId: role.unitId,
            })
        : () =>
            RiskStudentService.getRiskStudentsOfProfessor({
              professorId: session!.id,
            }),
    })
  },
  component: () => <RiskStudents />,
})
