import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from '@config'
import { defineConfig } from 'drizzle-kit'

if (!DB_DATABASE || !DB_HOST || !DB_USERNAME || !DB_PASSWORD || !DB_PORT) {
  throw new Error('Database configuration environment variables are missing')
}

export default defineConfig({
  schema: './src/database/schema/index.ts',
  out: './src/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    database: DB_DATABASE,
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    port: Number(DB_PORT),
  },
  verbose: true,
  strict: true,
})
