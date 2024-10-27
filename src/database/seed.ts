import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_SCHEMA,
  DB_USERNAME,
} from '@config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { faker } from '@faker-js/faker'

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
import { pgSchema } from 'drizzle-orm/pg-core'
import { accountRoles, accounts, courses, roles, terms, units } from './schema'
import { areasMap, facultiesMock, specialitiesMap } from './mock/units'
import { UnitsInsertSchema } from './schema/units'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'

export const schema = pgSchema(DB_SCHEMA)

console.log('Seed start')
await db.transaction(async (tx) => {
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

  //Base roles
  await tx.insert(roles).values([
    {
      name: 'Estudiante',
      unitType: 'university',
      editable: false,
    },
    {
      name: 'Profesor',
      unitType: 'university',
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

  const [{ accountId }] = await tx
    .insert(accounts)
    .values({
      name: 'Fabrizio Randall',
      firstSurname: 'Montoya',
      secondSurname: 'Pinto',
      code: '20212486',
      email: 'fmontoya@pucp.edu.pe',
      unitId: 1,
    })
    .returning({ accountId: accounts.id })

  await tx.insert(accountRoles).values({
    accountId,
    roleId: BaseRoles.ADMIN,
    unitId: 1,
  })
})
console.log('Seed end')
queryClient.end()
