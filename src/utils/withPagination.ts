import { SQL } from 'drizzle-orm'
import { PgColumn, PgSelect } from 'drizzle-orm/pg-core'

function withPagination<T extends PgSelect>(
  qb: T,
  orderByColumn: PgColumn | SQL | SQL.Aliased,
  page = 0,
  pageSize = 5
) {
  return qb
    .orderBy(orderByColumn)
    .limit(pageSize)
    .offset(page * pageSize)
}

export default withPagination
