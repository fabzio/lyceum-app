import { AppModule } from '@/interfaces/AppModule'
import { ModulesDict } from '@/interfaces/enums/modules'
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
      permissions: [],
    },
  ],
}
