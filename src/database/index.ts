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

const queryClient = postgres({
  db: DB_DATABASE,
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USERNAME,
  password: DB_PASSWORD,
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
  ssl: 'allow',
})
const db = drizzle(queryClient)
import { pgSchema } from 'drizzle-orm/pg-core'

export const schema = pgSchema(DB_SCHEMA)
export default db
