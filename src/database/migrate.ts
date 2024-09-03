import config from '#/drizzle.config'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from '@config'

export const migrationClient = postgres({
  db: DB_DATABASE,
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USERNAME,
  password: DB_PASSWORD,
  max: 1,
})

// This will run migrations on the database, skipping the ones already applied
if (!config.out) throw new Error('Migration output folder is not defined')
try {
  await migrate(drizzle(migrationClient), { migrationsFolder: config.out })
} catch (e) {
  console.error(e)
  process.exit(1)
}

// Don't forget to close the connection, otherwise the script will hang
await migrationClient.end()
