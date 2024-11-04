import { AppModule } from '@frontend/interfaces/AppModule'
import { ModulesDict } from '@frontend/interfaces/enums/modules'
import { EnrollmentPermissionsDict } from '@frontend/interfaces/enums/permissions/Enrollment'
import { CalendarRange } from 'lucide-react'

export const EnrollmentModule: AppModule = {
  icon: <CalendarRange />,
  path: '/matricula',
  label: 'Solicitudes de Matricula',
  code: ModulesDict.ENROLLMENT,
  description: 'Seguimiento de solicitudes relacionadas a la matrícula',
  submodules: [
    {
      label: 'Modificación de Matrícula',
      path: '/matricula/modificacion-matricula',
      permissions: [
        EnrollmentPermissionsDict.REQUEST_ADITIONAL_ENROLLMENT,
        EnrollmentPermissionsDict.REVIEW_ADDITIONAL_ENROLLMENT_ALL,
        EnrollmentPermissionsDict.REVIEW_ADDITIONAL_ENROLLMENT_MYSELF,
      ],
    },
    {
      label: 'Propuesta de Horarios',
      path: '/matricula/propuesta-horarios',
      permissions: [
        EnrollmentPermissionsDict.REQUEST_SCHEDULE_PROPOSAL,
        EnrollmentPermissionsDict.MANAGE_SCHEDULE_PROPOSAL,
        EnrollmentPermissionsDict.REVIEW_SCHEDULE_PROPOSAL,
      ],
    },
    {
      label: 'Distribución de Matrícula',
      path: '/matricula/distribucion',
      permissions: [
        EnrollmentPermissionsDict.ASSIGN_SCHEDULE_PROFESORS,
        EnrollmentPermissionsDict.READ_SCHEDULE_PROFESORS,
      ],
    },
  ],
}
