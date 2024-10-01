import { boolean, foreignKey, integer, primaryKey } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { schema } from '..'
import { studyPlans } from './studyPlans'
import { units } from './units'

export const specialityStudyPlans = schema.table(
  'speciality_study_plans',
  {
    specialityId: integer('speciality_id').notNull(),
    studyPlanId: integer('study_plan_id').notNull(),
    current: boolean('current').default(true),
  },
  (table) => {
    return {
      specialityStudyPlansStudyPlanFk: foreignKey({
        columns: [table.studyPlanId],
        foreignColumns: [studyPlans.id],
        name: 'speciality_study_plans_study_plan_fk',
      }).onDelete('cascade'),
      specialityStudyPlansUnitFk: foreignKey({
        columns: [table.specialityId],
        foreignColumns: [units.id],
        name: 'speciality_study_plans_unit_fk',
      }).onDelete('cascade'),
      specialityStudyPlansPk: primaryKey({
        columns: [table.specialityId, table.studyPlanId],
        name: 'speciality_study_plans_pk',
      }),
    }
  }
)

export const specialityStudyPlansRelations = relations(
  specialityStudyPlans,
  ({ one }) => ({
    studyPlan: one(studyPlans, {
      fields: [specialityStudyPlans.studyPlanId],
      references: [studyPlans.id],
    }),
    unit: one(units, {
      fields: [specialityStudyPlans.specialityId],
      references: [units.id],
    }),
  })
)

export const specialityStudyPlansSchema =
  createInsertSchema(specialityStudyPlans)
export type SpecialityStudyPlansSchema = z.infer<
  typeof specialityStudyPlansSchema
>
