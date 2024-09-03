import { char, pgTable, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core'

export const student = pgTable(
  'student',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 60 }).notNull(),
    code: char('code', { length: 8 }).notNull(),
    email: varchar('email', { length: 60 }).notNull(),
    password: char('password', { length: 60 }),
  },
  (table) => ({
    codeIndex: uniqueIndex('code-index').on(table.code),
  })
)
