import { AppModule } from '@frontend/interfaces/AppModule'
import { Building2 } from 'lucide-react'
import { UnitPermissionsDict } from '@frontend/interfaces/enums/permissions/Units'

export const UnitModule: AppModule = {
  path: '/unidades',
  code: 'UNITS',
  icon: <Building2 />,
  label: 'Unidades',
  description: 'Módulo de unidades académicas de la universidad',
  submodules: [
    {
      label: 'Departamentos',
      path: '/unidades/departamentos',
      permissions: [
        UnitPermissionsDict.READ_DEPARTMENT,
        UnitPermissionsDict.WRITE_DEPARTMENT,
      ],
    },
    {
      label: 'Facultades',
      path: '/unidades/facultades',
      permissions: [
        UnitPermissionsDict.READ_FACULTY,
        UnitPermissionsDict.WRITE_FACULTY,
      ],
    },
    {
      label: 'Especialidades',
      path: '/unidades/especialidades',
      permissions: [
        UnitPermissionsDict.READ_SPECIALTIES,
        UnitPermissionsDict.WRITE_SPECIALTIES,
      ],
    },
    {
      label: 'Secciones',
      path: '/unidades/secciones',
      permissions: [
        UnitPermissionsDict.READ_SECTION,
        UnitPermissionsDict.WRITE_SECTION,
      ],
    },
    {
      label: 'Áreas',
      path: '/unidades/areas',
      permissions: [
        UnitPermissionsDict.READ_AREAS,
        UnitPermissionsDict.WRITE_AREAS,
      ],
    },
  ],
}
