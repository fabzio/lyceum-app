import db from '@/database'
import { accounts } from '@/database/schema'
import { ilike, or } from 'drizzle-orm'

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
}

export default GenericService
