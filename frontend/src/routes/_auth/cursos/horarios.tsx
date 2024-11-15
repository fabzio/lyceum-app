import { createFileRoute, redirect } from '@tanstack/react-router'
import ScheduleManagement from '@frontend/modules/student-process/views/ScheduleManagement'
import { StudentsFilters } from '@frontend/modules/users/views/Students/interfaces/CourseFIlters'
import { StudentProcessPermissionsDict } from '@frontend/interfaces/enums/permissions/StudentProcess'
import { haveSomePermission } from '@frontend/lib/utils'

export const Route = createFileRoute('/_auth/cursos/horarios')({
  validateSearch: () => ({}) as StudentsFilters,
  beforeLoad: async ({ context: { sessionStore } }) => {
    const { getAllPermissions } = sessionStore
    if (
      !haveSomePermission(getAllPermissions(), [
        StudentProcessPermissionsDict.MANAGE_JP,
        StudentProcessPermissionsDict.MANAGE_DELEGATE,
      ])
    ) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: () => <ScheduleManagement />,
})
