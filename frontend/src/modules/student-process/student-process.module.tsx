import { AppModule } from '@frontend/interfaces/AppModule'
import { ModulesDict } from '@frontend/interfaces/enums/modules'
import { StudentProcessPermissionsDict } from '@frontend/interfaces/enums/permissions/StudentProcess'
import { FileUser } from 'lucide-react'

export const StudentProcessModule: AppModule = {
  code: ModulesDict.STUDY_PROCESS,
  label: 'Procesos de estudiantes',
  description: 'Gestión de solicitudes de estudiantes y cursos',
  icon: <FileUser />,
  path: '/procesos-de-estudiantes',
  submodules: [
    {
      label: 'Alumnos en riesgo',
      path: '/procesos-de-estudiantes/alumnos-riesgo',
      permissions: [
        StudentProcessPermissionsDict.READ_RISK_STUDENTS,
        StudentProcessPermissionsDict.LOAD_RISK_STUDENTS,
        StudentProcessPermissionsDict.REQUEST_RISK_STUDENT_REPORT,
        StudentProcessPermissionsDict.UPDATE_RISK_STUDENT_REPORT,
      ],
    },
    {
      label: 'Cartas de presentación',
      path: '/procesos-de-estudiantes/cartas-de-presentacion',
      permissions: [
        StudentProcessPermissionsDict.CREATE_PRESENTATION_LETTER,
        StudentProcessPermissionsDict.REVIEW_PRESENTATION_LETTER,
        StudentProcessPermissionsDict.APPROVE_PRESENTATION_LETTER,
        StudentProcessPermissionsDict.READ_PRESENTATION_LETTER,
      ],
    },
    {
      label: 'Horarios',
      path: '/procesos-de-estudiantes/horarios',
      permissions: [
        StudentProcessPermissionsDict.MANAGE_DELEGATE,
        StudentProcessPermissionsDict.MANAGE_JP,
      ],
    },
  ],
}
