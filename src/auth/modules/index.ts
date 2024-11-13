import {
  EnrollmentPermissions,
  FAQPermissions,
  HiringPermissions,
  SecurityPermissions,
  StudentProcessPermissions,
  StudyPlanPermissions,
  ThesisPermissions,
  UnitPermissions,
  UsersPermissions,
  SurveyPermissions,
} from '../permissions'

export const BaseModulesDict = {
  THESIS: 'THESIS',
  STUDY_PROCESS: 'STUDY_PROCESS',
  STUDY_PLAN: 'STUDY_PLAN',
  ENROLLMENT: 'ENROLLMENT',
  USERS: 'USERS',
  SECURITY: 'SECURITY',
  FAQ: 'FAQ',
  UNITS: 'UNITS',
  SURVEYS: 'SURVEYS',
  HIRING: 'HIRING',
} as const

export type BaseModulesDict = keyof typeof BaseModulesDict

const BaseModules = [
  {
    name: 'Tesis',
    code: BaseModulesDict.THESIS,
    permissions: ThesisPermissions,
  },
  {
    name: 'Procesos de estudiantes',
    code: BaseModulesDict.STUDY_PROCESS,
    permissions: StudentProcessPermissions,
  },
  {
    name: 'Planes de estudio',
    code: BaseModulesDict.STUDY_PLAN,
    permissions: StudyPlanPermissions,
  },
  {
    name: 'Matrícula',
    code: BaseModulesDict.ENROLLMENT,
    permissions: EnrollmentPermissions,
  },
  {
    name: 'Usuarios',
    code: BaseModulesDict.USERS,
    permissions: UsersPermissions,
  },
  {
    name: 'Seguridad',
    code: BaseModulesDict.SECURITY,
    permissions: SecurityPermissions,
  },
  {
    name: 'Preguntas frecuentes',
    code: BaseModulesDict.FAQ,
    permissions: FAQPermissions,
  },
  {
    name: 'Contratación',
    code: BaseModulesDict.HIRING,
    permissions: HiringPermissions,
  },
  {
    name: 'Unidades',
    code: BaseModulesDict.UNITS,

    permissions: UnitPermissions,
  },
  {
    name: 'Encuestas',
    code: BaseModulesDict.SURVEYS,
    permissions: SurveyPermissions,
  },
] as const

export default BaseModules
