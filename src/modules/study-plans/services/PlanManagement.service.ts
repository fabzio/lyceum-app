import db from '@/database'
import {
  courses,
  specialityStudyPlans,
  studyPlanCourses,
  studyPlans,
} from '@/database/schema'
import { Unit } from '@/interfaces/models/Unit'
import { and, eq } from 'drizzle-orm'

class PlanManagementService {
  public async getPlans(specilityId: Unit['id']) {
    const response = await db
      .select({
        id: studyPlans.id,
        initTerm: studyPlans.initTerm,
        endTerm: studyPlans.endTerm,
        current: specialityStudyPlans.current,
        state: specialityStudyPlans.state,
      })
      .from(specialityStudyPlans)
      .innerJoin(
        studyPlans,
        eq(specialityStudyPlans.studyPlanId, studyPlans.id)
      )
      .where(eq(specialityStudyPlans.specialityId, specilityId))

    return response
  }

  public async createPlan(specialityId: Unit['id']) {
    const studyPlanId = await db.transaction(async (tx) => {
      const [{ studyPlanId }] = await tx
        .insert(studyPlans)
        .values({})
        .returning({
          studyPlanId: studyPlans.id,
        })

      await tx.insert(specialityStudyPlans).values({
        specialityId,
        studyPlanId,
      })
      return studyPlanId
    })
    return studyPlanId
  }

  public async getPlanById(planId: number) {
    const response = await db
      .select({
        course: {
          name: courses.name,
          code: courses.code,
          credits: courses.credits,
        },
        level: studyPlanCourses.level,
      })
      .from(studyPlanCourses)
      .innerJoin(courses, eq(studyPlanCourses.courseId, courses.id))
      .where(eq(studyPlans.id, planId))

    return response
  }

  public async addCourseToPlan({
    courseId,
    level,
    studyPlanId,
  }: {
    studyPlanId: number
    courseId: number
    level: number
  }) {
    await db.insert(studyPlanCourses).values({
      courseId,
      studyPlanId,
      level,
    })
  }

  public async removeCourseFromPlan({
    courseId,
    studyPlanId,
  }: {
    studyPlanId: number
    courseId: number
  }) {
    await db
      .delete(studyPlanCourses)
      .where(
        and(
          eq(studyPlanCourses.courseId, courseId),
          eq(studyPlanCourses.studyPlanId, studyPlanId)
        )
      )
  }
}

export default PlanManagementService
