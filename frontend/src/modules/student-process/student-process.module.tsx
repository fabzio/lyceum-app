import { AppModule } from '@frontend/interfaces/AppModule'
import { ModulesDict } from '@frontend/interfaces/enums/modules'
import { StudentProcessPermissionsDict } from '@frontend/interfaces/enums/permissions/StudentProcess'
import { FileUser } from 'lucide-react'

export const StudentProcessModule: AppModule = {
  code: ModulesDict.STUDY_PROCESS,
  label: 'Procesos de estudiantes',
  description: 'Gestión de solicitudes de estudiantes y cursos',
  icon: <FileUser />,
  path: '/cursos',
  submodules: [
    {
      label: 'Alumnos en riesgo',
      path: '/cursos/alumnos-riesgo',
      permissions: [
        StudentProcessPermissionsDict.READ_RISK_STUDENTS,
        StudentProcessPermissionsDict.LOAD_RISK_STUDENTS,
        StudentProcessPermissionsDict.REQUEST_RISK_STUDENT_REPORT,
        StudentProcessPermissionsDict.UPDATE_RISK_STUDENT_REPORT,
      ],
    },
    {
      label: 'Horarios',
      path: '/cursos/horarios',
      permissions: [
        StudentProcessPermissionsDict.MANAGE_DELEGATE,
        StudentProcessPermissionsDict.MANAGE_JP,
      ],
    },
  ],
}
