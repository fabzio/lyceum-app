import db from '@/database'
import { accounts } from '@/database/schema'
import { eq, ilike, or, sql } from 'drizzle-orm'

class GenericService {
  public async getAccount({ q }: { q: string }) {
    return await db
      .select({
        id: accounts.id,
        name: accounts.name,
        firstSurname: accounts.firstSurname,
        secondSurname: accounts.secondSurname,
        code: accounts.code,
      })
      .from(accounts)
      .where(
        or(
          ilike(accounts.name, `%${q}%`),
          ilike(accounts.firstSurname, `%${q}%`),
          ilike(accounts.secondSurname, `%${q}%`),
          ilike(accounts.code, `%${q}%`)
        )
      )
      .limit(5)
  }

  public static async googleLogin({
    email,
    googleId,
  }: {
    email: string
    googleId: string
  }) {
    const accountResponse = await db
      .select({
        id: accounts.id,
        name: accounts.name,
        surname: sql<string>`concat(${accounts.firstSurname} || ' ' || ${accounts.secondSurname})`,
        code: accounts.code,
        email: accounts.email,
        googleId: accounts.googleId,
      })
      .from(accounts)
      .where(or(eq(accounts.email, email), eq(accounts.googleId, googleId)))
    if (accountResponse.length === 0) {
      throw new Error('Su cuenta no está registrada en el sistema')
    }
    const [account] = accountResponse
    if (!account.googleId) {
      await db
        .update(accounts)
        .set({ googleId })
        .where(eq(accounts.code, account.code))
    }
    return account
  }
}

export default GenericService
