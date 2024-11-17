import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from '@config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import {
  accountRoles,
  accounts,
  modules,
  permissions,
  rolePermissions,
  roles,
  terms,
  units,
} from './schema'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'
import BaseModules, { BaseModulesDict } from '@/auth/modules'
import {
  FAQPermissions,
  StudentProcessPermissions,
  ThesisPermissions,
} from '@/auth/permissions'
import { EnrollmentPermissionsDict } from '@/auth/permissions/Enrollment'
import { FAQPermissionsDict } from '@/auth/permissions/FAQ'
import { ThesisPermissionsDict } from '@/auth/permissions/Thesis'
import { StudyPlanPermissionsDict } from '@/auth/permissions/StudyPlan'
import { StudentProcessPermissionsDict } from '@/auth/permissions/StudentProcess'
import { SurveyPermissionsDict } from '@/auth/permissions/Surveys'

const queryClient = postgres({
  db: DB_DATABASE,
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USERNAME,
  password: DB_PASSWORD,
  max: 1,
  ssl: 'allow',
})
const db = drizzle(queryClient)

console.log('Seed start')
await db.transaction(async (tx) => {
  //Units
  const [{ universityId }] = await tx
    .insert(units)
    .values({
      name: 'PUCP',
      type: 'university',
    })
    .returning({
      universityId: units.id,
    })
  console.info('Units inserted')
  //Base roles
  await tx.insert(roles).values([
    {
      name: 'Estudiante',
      unitType: 'speciality',
      editable: false,
    },
    {
      name: 'Profesor',
      unitType: 'section',
      editable: false,
    },
    {
      name: 'Administrador',
      unitType: 'university',
      editable: false,
    },
    {
      name: 'Externo',
      unitType: 'university',
      editable: false,
    },
  ])
  console.info('Roles inserted')
  //Terms
  await tx.insert(terms).values([
    {
      name: '2024-1',
      current: false,
    },
    {
      name: '2024-2',
      current: true,
    },
    {
      name: '2025-0',
      current: false,
    },
    {
      name: '2025-1',
      current: false,
    },
    {
      name: '2025-2',
      current: false,
    },
    {
      name: '2026-0',
      current: false,
    },
    {
      name: '2026-1',
      current: false,
    },
    {
      name: '2026-2',
      current: false,
    },
    {
      name: '2027-0',
      current: false,
    },
    {
      name: '2027-1',
      current: false,
    },
    {
      name: '2027-2',
      current: false,
    },
    {
      name: '2028-0',
      current: false,
    },
    {
      name: '2028-1',
      current: false,
    },
    {
      name: '2028-2',
      current: false,
    },
    {
      name: '2029-0',
      current: false,
    },
    {
      name: '2029-1',
      current: false,
    },
    {
      name: '2029-2',
      current: false,
    },
    {
      name: '2030-0',
      current: false,
    },
    {
      name: '2030-1',
      current: false,
    },
    {
      name: '2030-2',
      current: false,
    },
  ])
  console.info('Terms inserted')
  //Base account
  const accountsId = await tx
    .insert(accounts)
    .values([
      {
        name: 'Fabrizio Randall',
        firstSurname: 'Montoya',
        secondSurname: 'Pinto',
        code: '20212486',
        email: 'fmontoya@pucp.edu.pe',
        unitId: universityId,
      },

      {
        name: 'Ricardo Bartra',
        firstSurname: 'Smith',
        secondSurname: 'Bartra',
        code: '20176243',
        email: 'ricardo.bartra@pucp.edu.pe',
        unitId: universityId,
      },
      {
        name: 'Leonardo Vega',
        firstSurname: 'Grijalva',
        secondSurname: 'Vega',
        code: '20240102',
        email: 'a20197102@pucp.edu.pe',
        unitId: universityId,
      },
      {
        name: 'Sebastian Castillejo',
        firstSurname: 'Franco',
        secondSurname: 'Castillejo',
        code: '20190948',
        email: 'a20190948@pucp.edu.pe',
        unitId: universityId,
      },
      {
        name: 'Piero Alvarez',
        firstSurname: 'Castillo',
        secondSurname: 'Alvarez',
        code: '20195903',
        email: 'alvarez.piero@pucp.edu.pe',
        unitId: universityId,
      },
      {
        name: 'Diego Ancajima',
        firstSurname: 'Diaz',
        secondSurname: 'Ancajima',
        code: '20202308',
        email: 'a20202308@pucp.edu.pe',
        unitId: universityId,
      },
      {
        name: 'Jhoyfer Melendez',
        firstSurname: 'Torres',
        secondSurname: 'Melendez',
        code: '20203823',
        email: 'jmelendezt@pucp.edu.pe',
        unitId: universityId,
      },
      {
        name: 'Alonso Alvarado',
        firstSurname: 'Eslava',
        secondSurname: 'Alvarado',
        code: '20180731',
        email: 'aalvaradoe@pucp.edu.pe',
        unitId: universityId,
      },
      {
        name: 'Paul Espettia',
        firstSurname: 'Rodríguez',
        secondSurname: 'Espettia',
        code: '20181395',
        email: 'paul.espettia@pucp.edu.pe',
        unitId: universityId,
      },
      {
        name: 'Alvaro Espinoza',
        firstSurname: 'Esparza',
        secondSurname: 'Larranaga',
        code: '20195925',
        email: 'aesparzal@pucp.edu.pe',
        unitId: universityId,
      },
    ])
    .returning({ accountId: accounts.id })
  console.info('Accounts inserted')
  await tx.insert(accountRoles).values(
    accountsId.map(({ accountId }) => ({
      accountId,
      roleId: BaseRoles.ADMIN,
      unitId: universityId,
    }))
  )

  const insertedModules = await tx
    .insert(modules)
    .values(
      BaseModules.map((module) => ({
        name: module.name,
        code: module.code,
      }))
    )
    .returning({
      moduleId: modules.id,
      moduleCode: modules.code,
    })
  const permissionsInserted = (
    await Promise.all(
      BaseModules.map((module) => {
        return tx
          .insert(permissions)
          .values(
            module.permissions.map((permission) => ({
              name: permission.name,
              description: permission.description,
              moduleId: insertedModules.find(
                (insertedModule) => insertedModule.moduleCode === module.code
              )?.moduleId!,
            }))
          )
          .returning({
            permissionId: permissions.id,
            permissionName: permissions.name,
            moduleId: permissions.moduleId,
          })
      })
    )
  ).flat()

  const mapPermissions = new Map(
    permissionsInserted.map((permission) => [
      permission.permissionName,
      permission.permissionId,
    ])
  )

  const [{ roleId }] = await tx
    .insert(roles)
    .values({
      name: 'Administrador',
      unitType: 'university',
      editable: true,
    })
    .returning({
      roleId: roles.id,
    })

  await tx.insert(rolePermissions).values(
    permissionsInserted
      .filter(
        (permission) =>
          permission.moduleId ===
            insertedModules.find(
              (module) => module.moduleCode === BaseModulesDict.USERS
            )?.moduleId! ||
          permission.moduleId ===
            insertedModules.find(
              (module) => module.moduleCode === BaseModulesDict.SECURITY
            )?.moduleId! ||
          permission.moduleId ===
            insertedModules.find(
              (module) => module.moduleCode === BaseModulesDict.UNITS
            )?.moduleId!
      )
      .map((permission) => ({
        roleId,
        permissionId: permission.permissionId,
      }))
  )

  await tx.insert(rolePermissions).values([
    {
      permissionId: permissionsInserted.find(
        (permission) =>
          permission.permissionName ===
          ThesisPermissions.find(
            (permission) => permission.name === 'CREATE_THESIS'
          )?.name
      )?.permissionId!,
      roleId: BaseRoles.STUDENT,
    },
    {
      permissionId: permissionsInserted.find(
        (permission) =>
          permission.permissionName ===
          StudentProcessPermissionsDict.CREATE_PRESENTATION_LETTER
      )?.permissionId!,
      roleId: BaseRoles.STUDENT,
    },
    {
      permissionId: permissionsInserted.find(
        (permission) =>
          permission.permissionName ===
          ThesisPermissions.find(
            (permission) => permission.name === 'READ_THESIS'
          )?.name
      )?.permissionId!,
      roleId: BaseRoles.PROFESSOR,
    },
    {
      permissionId: permissionsInserted.find(
        (permission) =>
          permission.permissionName === SurveyPermissionsDict.ANSWER_SURVEY
      )?.permissionId!,
      roleId: BaseRoles.STUDENT,
    },
    {
      permissionId: permissionsInserted.find(
        (permission) =>
          permission.permissionName ===
          ThesisPermissions.find(
            (permission) => permission.name === 'APROVE_THESIS_PHASE_1'
          )?.name
      )?.permissionId!,
      roleId: BaseRoles.PROFESSOR,
    },
    {
      permissionId: permissionsInserted.find(
        (permission) =>
          permission.permissionName ===
          StudentProcessPermissions.find(
            (permission) => permission.name === 'UPDATE_RISK_STUDENT_REPORT'
          )?.name
      )?.permissionId!,
      roleId: BaseRoles.PROFESSOR,
    },
    {
      permissionId: permissionsInserted.find(
        (permission) =>
          permission.permissionName ===
          EnrollmentPermissionsDict.REQUEST_ADITIONAL_ENROLLMENT
      )?.permissionId!,
      roleId: BaseRoles.STUDENT,
    },
    {
      permissionId: permissionsInserted.find(
        (permission) =>
          permission.permissionName === FAQPermissionsDict.READ_FAQ
      )?.permissionId!,
      roleId: BaseRoles.STUDENT,
    },
  ])

  const [carreerDirectorRole] = await tx
    .insert(roles)
    .values({
      name: 'Director de carrera',
      unitType: 'speciality',
      editable: true,
    })
    .returning({ roleId: roles.id })
  const carreerDirectorPermissions = [
    ThesisPermissionsDict.APROVE_THESIS_PHASE_3,
    ThesisPermissionsDict.ASSIGN_THESIS_JURY,
    StudyPlanPermissionsDict.READ_COURSES,
    StudyPlanPermissionsDict.READ_STUDY_PLAN,
    StudyPlanPermissionsDict.MANAGE_COURSES,
    StudyPlanPermissionsDict.MANAGE_STUDY_PLAN,
    EnrollmentPermissionsDict.REVIEW_ADDITIONAL_ENROLLMENT,
    EnrollmentPermissionsDict.MANAGE_SCHEDULE_PROPOSAL,
    EnrollmentPermissionsDict.READ_SCHEDULE_PROFESORS,
    FAQPermissionsDict.MAGANE_FAQ,
    FAQPermissionsDict.READ_FAQ,
    FAQPermissionsDict.VIEW_FAQ_SUGGESTIONS,
    StudentProcessPermissionsDict.READ_RISK_STUDENTS,
    StudentProcessPermissionsDict.LOAD_RISK_STUDENTS,
    StudentProcessPermissionsDict.REQUEST_RISK_STUDENT_REPORT,
    SurveyPermissionsDict.CREATE_SURVEY,
    SurveyPermissionsDict.READ_SURVEY,
    SurveyPermissionsDict.READ_SURVEY_RESULTS,
  ]
  await tx.insert(rolePermissions).values(
    carreerDirectorPermissions.map((permission) => ({
      roleId: carreerDirectorRole.roleId,
      permissionId: mapPermissions.get(permission)!,
    }))
  )
  const [academicSecretaryRole] = await tx
    .insert(roles)
    .values({
      name: 'Secretario académico',
      unitType: 'faculty',
      editable: true,
    })
    .returning({ roleId: roles.id })

  const academicSecretaryPermissions = [
    ThesisPermissionsDict.REQUEST_THESIS_JURY,
    EnrollmentPermissionsDict.REQUEST_SCHEDULE_PROPOSAL,
    EnrollmentPermissionsDict.REVIEW_SCHEDULE_PROPOSAL,
  ]

  await tx.insert(rolePermissions).values(
    academicSecretaryPermissions.map((permission) => ({
      roleId: academicSecretaryRole.roleId,
      permissionId: mapPermissions.get(permission)!,
    }))
  )

  const [sectionCoordinatorRole] = await tx
    .insert(roles)
    .values({
      name: 'Coordinador de sección',
      unitType: 'section',
      editable: true,
    })
    .returning({ roleId: roles.id })

  const sectionCoordinatorPermissions = [
    EnrollmentPermissionsDict.ASSIGN_SCHEDULE_PROFESORS,
  ]
  await tx.insert(rolePermissions).values(
    sectionCoordinatorPermissions.map((permission) => ({
      roleId: sectionCoordinatorRole.roleId,
      permissionId: mapPermissions.get(permission)!,
    }))
  )
  const [areaCoordinatorRole] = await tx
    .insert(roles)
    .values({
      name: 'Coordinador de área',
      unitType: 'area',
      editable: true,
    })
    .returning({ roleId: roles.id })

  const areaCoordinatorPermissions = [
    ThesisPermissionsDict.APROVE_THESIS_PHASE_2,
  ]
  await tx.insert(rolePermissions).values(
    areaCoordinatorPermissions.map((permission) => ({
      roleId: areaCoordinatorRole.roleId,
      permissionId: mapPermissions.get(permission)!,
    }))
  )

  await tx.insert(accountRoles).values(
    accountsId.map(({ accountId }) => ({
      accountId,
      roleId,
      unitId: universityId,
    }))
  )
})
console.log('Seed end')
queryClient.end()
