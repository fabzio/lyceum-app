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
  courses,
  modules,
  permissions,
  rolePermissions,
  roles,
  terms,
  units,
} from './schema'
import {
  areasMap,
  departmentsMock,
  facultiesMock,
  sectionsMap,
  specialitiesMap,
} from './mock/units'
import { UnitsInsertSchema } from './schema/units'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'
import BaseModules, { BaseModulesDict } from '@/auth/modules'
import { ThesisPermissions } from '@/auth/permissions'

const queryClient = postgres({
  db: DB_DATABASE,
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USERNAME,
  password: DB_PASSWORD,
  max: 1,
  ssl: 'allow',
})
const db = drizzle(queryClient, { logger: true })

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

  const faculties = await tx
    .insert(units)
    .values(
      facultiesMock.map((faculty) => ({ ...faculty, parentId: universityId }))
    )
    .returning({
      facultyId: units.id,
      facultyName: units.name,
    })

  const specialities = (
    await Promise.all(
      faculties.map((faculty) => {
        return tx
          .insert(units)
          .values(
            specialitiesMap[faculty.facultyName].map(
              (speciality) =>
                ({
                  name: speciality,
                  type: 'speciality',
                  parentId: faculty.facultyId,
                } as UnitsInsertSchema)
            )
          )
          .returning({
            specialityId: units.id,
            specialityName: units.name,
          })
      })
    )
  ).flat()

  await Promise.all(
    specialities.map((speciality) => {
      if (areasMap[speciality.specialityName]) {
        return tx
          .insert(units)
          .values(
            areasMap[speciality.specialityName].map(
              (area) =>
                ({
                  name: area,
                  type: 'area',
                  parentId: speciality.specialityId,
                } as UnitsInsertSchema)
            )
          )
          .returning({
            termId: units.id,
            termName: units.name,
          })
      }
    })
  )

  const departmentInserted = await tx
    .insert(units)
    .values(
      departmentsMock.map((department) => ({
        name: department,
        type: 'department' as const,
        parentId: universityId,
      }))
    )
    .returning({
      departmentId: units.id,
      departmentName: units.name,
    })
  const sectionsToInsert = departmentInserted
    .map((department) => {
      const sections = sectionsMap[department.departmentName] ?? []
      return sections.map(
        (section) =>
          ({
            name: section,
            type: 'section',
            parentId: department.departmentId,
          } as UnitsInsertSchema)
      )
    })
    .flat()

  await tx.insert(units).values(sectionsToInsert)
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
    ])
    .returning({ accountId: accounts.id })

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
            )?.moduleId!
      )
      .map((permission) => ({
        roleId,
        permissionId: permission.permissionId,
      }))
  )

  await tx.insert(rolePermissions).values({
    permissionId: permissionsInserted.find(
      (permission) => permission.permissionName === ThesisPermissions[0].name
    )?.permissionId!,
    roleId: BaseRoles.STUDENT,
  })

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
