import db from '@/database'
import { accounts } from '@/database/schema'
import { eq } from 'drizzle-orm'

export const getAccountsIds = async (accountsCode: string): Promise<string> => {
  const response = await db
    .select({
      id: accounts.id,
    })
    .from(accounts)
    .where(eq(accounts.code, accountsCode))
  return response[0]?.id
}

export const generateThesisCode = (): string => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString()
}
