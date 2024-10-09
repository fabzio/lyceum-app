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
import { accounts, roles, terms } from './schema'

export const schema = pgSchema(DB_SCHEMA)
const main = async () => {
  const accountsData: (typeof accounts.$inferInsert)[] = []

  for (let i = 0; i < 10; i++) {
    accountsData.push({
      name: faker.person.firstName(),
      code: faker.string.numeric(8),
      email: faker.internet.email(),
      firstSurname: faker.person.lastName(),
      secondSurname: faker.person.lastName(),
      googleId: faker.internet.password(),
    })
  }
  console.log('Seed start')
  //Accounts
  await db.insert(accounts).values(accountsData)

  //Terms
  await db.insert(terms).values([
    {
      name: '2024-2',
    },
  ])

  //Base roles
  await db.insert(roles).values([
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
  console.log('Seed end')
}

main()
