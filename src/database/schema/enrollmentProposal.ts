import { foreignKey, integer, serial, timestamp, uuid } from 'drizzle-orm/pg-core'
import { schema } from '..'
import { enrollmentProposalStatus } from './enums'
import { units } from './units'
import { accounts } from './accounts'
import { terms } from './terms'

export const enrollmentProposal = schema.table(
  'enrollment_proposal',
  {
    id: serial('id').primaryKey(),
    specialityId: integer('speciality_id').notNull(),
    accountId: uuid('account_id').notNull(),
    termId: integer('term_id').notNull(),
    state: enrollmentProposalStatus('state').default('requested').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    enrollmentProposalSpecialityFk: foreignKey({
      columns: [table.specialityId],
      foreignColumns: [units.id],
      name: 'enrollment_proposal_speciality_fk',
    }),

    enrollmentProposalAccountFk: foreignKey({
      columns: [table.accountId],
      foreignColumns: [accounts.id],
      name: 'enrollment_proposal_account_fk',
    }),

    enrollmentProposalTermFk: foreignKey({
      columns: [table.termId],
      foreignColumns: [terms.id],
      name: 'enrollment_proposal_term_fk',
    }),
  })
)
