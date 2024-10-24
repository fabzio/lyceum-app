import db from '@/database'
import {
  courses,
  specialityStudyPlans,
  studyPlanCourses,
  studyPlans,
} from '@/database/schema'
import { Unit } from '@/interfaces/models/Unit'
import { and, eq } from 'drizzle-orm'
import { CourseAlreadyExists, StudyPlanNotFound } from '../errors'

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
  public async getPlanDetail(planId: number) {
    const response = await db
      .select({
        id: studyPlans.id,
        initTerm: studyPlans.initTerm,
        endTerm: studyPlans.endTerm,
        current: specialityStudyPlans.current,
        state: specialityStudyPlans.state,
        startLevel: studyPlans.startLevel,
        levelsCount: studyPlans.levelsCount,
      })
      .from(specialityStudyPlans)
      .innerJoin(
        studyPlans,
        eq(specialityStudyPlans.studyPlanId, studyPlans.id)
      )
      .where(eq(studyPlans.id, planId))
    if (response.length === 0)
      throw new StudyPlanNotFound('No se encontró el plan de estudio')
    const [plan] = response
    return plan
  }

  public async createPlan({
    specialityId,
    levelsCount,
    startLevel,
  }: {
    specialityId: Unit['id']
    startLevel: number
    levelsCount: number
  }) {
    const studyPlanId = await db.transaction(async (tx) => {
      const [{ studyPlanId }] = await tx
        .insert(studyPlans)
        .values({
          levelsCount,
          startLevel,
        })
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

  public async getPlanCourses(planId: number) {
    const response = await db
      .select({
        course: {
          id: courses.id,
          name: courses.name,
          code: courses.code,
          credits: courses.credits,
        },
        level: studyPlanCourses.level,
      })
      .from(studyPlanCourses)
      .innerJoin(courses, eq(studyPlanCourses.courseId, courses.id))
      .where(eq(studyPlanCourses.studyPlanId, planId))

    return response.map((course) => ({
      ...course,
      course: {
        ...course.course,
        credits: +course.course.credits,
      },
    }))
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
    const existingCourse = await db
      .select()
      .from(studyPlanCourses)
      .where(
        and(
          eq(studyPlanCourses.courseId, courseId),
          eq(studyPlanCourses.studyPlanId, studyPlanId)
        )
      )

    if (existingCourse.length > 0) {
      throw new CourseAlreadyExists(
        'El curso ya se encuentra en el plan de estudio'
      )
    }
    await db.insert(studyPlanCourses).values({
      courseId,
      studyPlanId,
      level,
    })
  }

  public async updateCourseLevel({
    courseId,
    studyPlanId,
    level,
  }: {
    studyPlanId: number
    courseId: number
    level: number
  }) {
    await db
      .update(studyPlanCourses)
      .set({
        level,
      })
      .where(
        and(
          eq(studyPlanCourses.courseId, courseId),
          eq(studyPlanCourses.studyPlanId, studyPlanId)
        )
      )
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
