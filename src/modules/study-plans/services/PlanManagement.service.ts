import db from '@/database'
import {
  courses,
  specialityStudyPlans,
  studyPlanCourses,
  studyPlans,
} from '@/database/schema'
import { Unit } from '@/interfaces/models/Unit'
import { and, eq, inArray } from 'drizzle-orm'
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

  public async addCoursesToPlan(
    coursesList: {
      course: number | string
      level: number
      studyPlanId: number
    }[]
  ) {
    if (coursesList.every((course) => typeof course.course === 'number')) {
      const existingCourses = await db
        .select({
          courseId: studyPlanCourses.courseId,
          courseName: courses.name,
        })
        .from(studyPlanCourses)
        .innerJoin(courses, eq(studyPlanCourses.courseId, courses.id))
        .where(
          and(
            eq(studyPlanCourses.studyPlanId, coursesList[0].studyPlanId),
            inArray(
              studyPlanCourses.courseId,
              coursesList.map((course) => course.course as number)
            )
          )
        )

      if (existingCourses.length > 0) {
        throw new CourseAlreadyExists(
          `El curso ${existingCourses[0].courseName} ya existe en el plan de estudio`
        )
      }

      await db.insert(studyPlanCourses).values(
        coursesList.map((course) => ({
          courseId: course.course as number,
          level: course.level,
          studyPlanId: coursesList[0].studyPlanId,
        }))
      )
    } else {
      const existingCourses = await db
        .select({
          courseId: courses.id,
          courseCode: courses.code,
        })
        .from(courses)
        .where(
          inArray(
            courses.code,
            coursesList.map((course) => course.course as string)
          )
        )
      const coursesMap = new Map(
        existingCourses.map((course) => [course.courseCode, course.courseId])
      )
      coursesList.forEach((course) => {
        if (!coursesMap.has(course.course as string)) {
          throw new CourseAlreadyExists(
            `El curso ${course.course} no existe en la base de datos`
          )
        }
      })

      const existingCoursesInStudyPlan = await db
        .select({
          courseId: studyPlanCourses.courseId,
          courseName: courses.name,
        })
        .from(studyPlanCourses)
        .innerJoin(courses, eq(studyPlanCourses.courseId, courses.id))
        .where(
          and(
            eq(studyPlanCourses.studyPlanId, coursesList[0].studyPlanId),
            inArray(
              courses.code,
              coursesList.map((course) => course.course as string)
            )
          )
        )

      if (existingCoursesInStudyPlan.length > 0) {
        throw new CourseAlreadyExists(
          `El curso ${existingCoursesInStudyPlan[0].courseName} ya existe en el plan de estudio`
        )
      }

      await db.insert(studyPlanCourses).values(
        coursesList.map((course) => ({
          courseId: coursesMap.get(course.course as string)!,
          level: course.level,
          studyPlanId: coursesList[0].studyPlanId,
        }))
      )
    }
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
