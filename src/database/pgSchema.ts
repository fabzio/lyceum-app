import { DB_SCHEMA } from '@/config'
import { pgSchema } from 'drizzle-orm/pg-core'

export const schema = pgSchema(DB_SCHEMA)
