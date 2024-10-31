import { AppModule } from '@/interfaces/AppModule'
import { ModulesDict } from '@/interfaces/enums/modules'
import { EnrollmentPermissionsDict } from '@/interfaces/enums/permissions/Enrollment'
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
        EnrollmentPermissionsDict.REVIEW_ADDITIONAL_ENROLLMENT,
      ],
    },
    {
      label: 'Propuesta de Horarios',
      path: '/matricula/propuesta-horarios',
      permissions: [],
    },
    {
      label: 'Distribución de Matrícula',
      path: '/matricula/distribucion',
      permissions: [],
    },
  ],
}
