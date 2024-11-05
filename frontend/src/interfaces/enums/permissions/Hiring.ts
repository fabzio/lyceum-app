export const HiringPermissionsDict = {
  CREATE_ACCOUNT: 'CREATE_ACCOUNT',
  READ_OWN_ACCOUNT_INFORMATION: 'READ_OWN_ACCOUNT_INFORMATION',
  CREATE_OWN_CONTACT_INFO: 'CREATE_OWN_CONTACT_INFO',
  READ_OWN_CONTACT_INFO: 'READ_OWN_CONTACT_INFO',
  UPDATE_OWN_CONTACT_INFO: 'UPDATE_OWN_CONTACT_INFO',
  CREATE_JOB_REQUEST: 'CREATE_JOB_REQUEST',
  READ_OWN_JOB_REQUESTS: 'READ_OWN_JOB_REQUESTS',
  TAKE_DOWN_JOB_REQUESTS: 'TAKE_DOWN_JOB_REQUESTS',
  VIEW_LIST_OF_OPEN_HIRINGS: 'VIEW_LIST_OF_OPEN_HIRINGS',
  VIEW_COURSES_IN_HIRING: 'VIEW_COURSES_IN_HIRING',
  VIEW_STATUS_OF_OWN_JOB_REQUEST_APPLICATIONS:
    'VIEW_STATUS_OF_OWN_JOB_REQUEST_APPLICATIONS',
  VIEW_ALL_CANDIDATES_PHASE_1: 'VIEW_ALL_CANDIDATES_PHASE_1',
  VIEW_ALL_CANDIDATES_PHASE_2: 'VIEW_ALL_CANDIDATES_PHASE_2',
  CHANGE_STATUS_ALL_CANDIDATES_PHASE_1: 'CHANGE_STATUS_ALL_CANDIDATES_PHASE_1',
  EVALUATE_ALL_CANDIDATES_PHASE_2: 'EVALUATE_ALL_CANDIDATES_PHASE_2',
  SELECT_CANDIDATE_PHASE_2: 'SELECT_CANDIDATE_PHASE_2',
  CREATE_HIRING_PROCESS: 'CREATE_HIRING_PROCESS',
  ASSIGN_COURSES_TO_HIRING_PROCESS: 'ASSIGN_COURSES_TO_HIRING_PROCESS',
  CREATE_REQUIREMENT_TO_COURSE_HIRING_PROCESS:
    'CREATE_REQUIREMENT_TO_COURSE_HIRING_PROCESS',
  OPEN_HIRING: 'OPEN_HIRING',
  CLOSE_HIRING: 'CLOSE_HIRING',
  SHOW_RESULTS: 'SHOW_RESULTS',
  VIEW_RESULTS_PHASE_1: 'VIEW_RESULTS_PHASE_1',
  VIEW_RESULTS_PHASE_2: 'VIEW_RESULTS_PHASE_2',
  VIEW_ALL_UPDATED_REQUEST_PHASE_1: 'VIEW_ALL_UPDATED_REQUEST_PHASE_1',
  VIEW_OWN_UPDATED_REQUEST_PHASE_1: 'VIEW_OWN_UPDATED_REQUEST_PHASE_1',
  ASSIGN_REVIEWER_SELECTOR_EVALUATOR: 'ASSIGN_REVIEWER_SELECTOR_EVALUATOR',
} as const

export type HiringPermissionsDict = keyof typeof HiringPermissionsDict

export const HiringPermissions = [
  {
    name: HiringPermissionsDict.CREATE_ACCOUNT,
    description: 'Crear cuenta',
  },
  {
    name: HiringPermissionsDict.READ_OWN_ACCOUNT_INFORMATION,
    description: 'Leer información de la propia cuenta',
  },
  {
    name: HiringPermissionsDict.CREATE_OWN_CONTACT_INFO,
    description: 'Crear información de contacto propia',
  },
  {
    name: HiringPermissionsDict.READ_OWN_CONTACT_INFO,
    description: 'Leer información de contacto propia',
  },
  {
    name: HiringPermissionsDict.UPDATE_OWN_CONTACT_INFO,
    description: 'Actualizar información de contacto propia',
  },
  {
    name: HiringPermissionsDict.CREATE_JOB_REQUEST,
    description:
      'Crear solicitud de empleo: (Aplicar para una posición en la contratación de cursos)',
  },
  {
    name: HiringPermissionsDict.READ_OWN_JOB_REQUESTS,
    description: 'Leer solicitudes de empleo propias',
  },
  {
    name: HiringPermissionsDict.TAKE_DOWN_JOB_REQUESTS,
    description: 'Eliminar solicitudes de empleo',
  },
  {
    name: HiringPermissionsDict.VIEW_LIST_OF_OPEN_HIRINGS,
    description: 'Ver lista de contrataciones abiertas',
  },
  {
    name: HiringPermissionsDict.VIEW_COURSES_IN_HIRING,
    description: 'Ver cursos en contratación',
  },
  {
    name: HiringPermissionsDict.VIEW_STATUS_OF_OWN_JOB_REQUEST_APPLICATIONS,
    description: 'Ver estado de las propias solicitudes de empleo',
  },
  {
    name: HiringPermissionsDict.VIEW_ALL_CANDIDATES_PHASE_1,
    description:
      'Ver todos los candidatos en la fase 1 del proceso de contratación de un curso',
  },
  {
    name: HiringPermissionsDict.VIEW_ALL_CANDIDATES_PHASE_2,
    description:
      'Ver todos los candidatos en la fase 2 del proceso de contratación de un curso',
  },
  {
    name: HiringPermissionsDict.CHANGE_STATUS_ALL_CANDIDATES_PHASE_1,
    description:
      'Cambiar el estado de todos los candidatos en la fase 1 del proceso de contratación de un curso',
  },
  {
    name: HiringPermissionsDict.EVALUATE_ALL_CANDIDATES_PHASE_2,
    description:
      'Evaluar a todos los candidatos en la fase 2 del proceso de contratación de un curso',
  },
  {
    name: HiringPermissionsDict.SELECT_CANDIDATE_PHASE_2,
    description:
      'Seleccionar un candidato en la fase 2 del proceso de contratación de un curso',
  },
  {
    name: HiringPermissionsDict.CREATE_HIRING_PROCESS,
    description: 'Crear un proceso de contratación',
  },
  {
    name: HiringPermissionsDict.ASSIGN_COURSES_TO_HIRING_PROCESS,
    description: 'Asignar cursos a un proceso de contratación',
  },
  {
    name: HiringPermissionsDict.CREATE_REQUIREMENT_TO_COURSE_HIRING_PROCESS,
    description: 'Crear requisito para un proceso de contratación de curso',
  },
  {
    name: HiringPermissionsDict.OPEN_HIRING,
    description: 'Abrir contratación',
  },
  {
    name: HiringPermissionsDict.CLOSE_HIRING,
    description: 'Cerrar contratación',
  },
  {
    name: HiringPermissionsDict.SHOW_RESULTS,
    description: 'Mostrar resultados',
  },
  {
    name: HiringPermissionsDict.VIEW_RESULTS_PHASE_1,
    description:
      'Ver resultados del proceso de contratación de curso en la fase 1',
  },
  {
    name: HiringPermissionsDict.VIEW_RESULTS_PHASE_2,
    description:
      'Ver resultados del proceso de contratación de curso en la fase 2',
  },
  {
    name: HiringPermissionsDict.VIEW_ALL_UPDATED_REQUEST_PHASE_1,
    description: 'Ver todas las solicitudes actualizadas en la fase 1',
  },
  {
    name: HiringPermissionsDict.VIEW_OWN_UPDATED_REQUEST_PHASE_1,
    description:
      'Ver las propias solicitudes actualizadas en la fase 1 (candidato)',
  },
  {
    name: HiringPermissionsDict.ASSIGN_REVIEWER_SELECTOR_EVALUATOR,
    description:
      'Asignar revisor, selector y evaluador para un proceso de contratación de curso a nivel de curso',
  },
] as const
