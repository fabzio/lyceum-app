import db from '@/database'
import { courses, units } from '@/database/schema'
import {
  aliasedTable,
  and,
  asc,
  desc,
  eq,
  ilike,
  inArray,
  like,
  or,
  sql,
} from 'drizzle-orm'
import { CourseDAO } from '../dao/CourseDAO'
import { Course } from '@/interfaces/models/Course'
import { DuplicatedCourseCode } from '../errors'
import { CoursesSchema } from '@/database/schema/courses'

class CourseService implements CourseDAO {
  public async searchCourses(q: string) {
    const result = await db
      .select({
        id: courses.id,
        code: courses.code,
        name: courses.name,
      })
      .from(courses)
      .where(
        and(
          or(ilike(courses.name, `%${q}%`), ilike(courses.code, `%${q}%`)),
          eq(courses.state, true)
        )
      )
      .limit(5)
    return result.map((course) => ({
      id: course.id,
      code: course.code,
      name: course.name,
    }))
  }
  public async getAllCourses(params: {
    q?: string
    page: number
    limit: number
    sortBy?: string
  }) {
    const [field, order] = params.sortBy?.split('.') || ['name', 'asc']

    const [{ total }] = await db
      .select({
        total: sql<string>`count(*)`,
      })
      .from(courses)
      .where(
        and(
          or(
            ilike(courses.name, `%${params.q}%`),
            ilike(courses.code, `%${params.q}%`)
          ),
          eq(courses.state, true)
        )
      )
    const mappedFields = {
      ['name']: courses.name,
      ['code']: courses.code,
      ['credits']: courses.credits,
    }
    const mappedSortBy = {
      ['asc']: asc,
      ['desc']: desc,
    }
    const coursesResponse = await db
      .select({
        id: courses.id,
        code: courses.code,
        name: courses.name,
        credits: courses.credits,
        unit: units.name,
        unitType: units.type,
      })
      .from(courses)
      .leftJoin(units, eq(courses.unitId, units.id))
      .where(
        and(
          or(
            ilike(courses.name, `%${params.q}%`),
            ilike(courses.code, `%${params.q}%`)
          ),
          eq(courses.state, true)
        )
      )
      .offset(params.page * params.limit)
      .limit(params.limit)
      .orderBy(
        mappedSortBy[order as keyof typeof mappedSortBy](
          mappedFields[field as keyof typeof mappedFields]
        )
      )

    const result = coursesResponse.map((course) => ({
      ...course,
      credits: parseFloat(course.credits),
    }))
    return {
      result,
      rowCount: +total,
      currentPage: params.page,
      totalPages: Math.ceil(+total / params.limit),
      hasNext: +total > (params.page + 1) * params.limit,
    }
  }

  public async getCoursesDetail({
    courseId,
  }: {
    courseId: string
  }): Promise<Course> {
    const courseDetail = await db
      .select({
        id: courses.id,
        code: courses.code,
        name: courses.name,
        credits: courses.credits,
        state: courses.state,
      })
      .from(courses)
      .where(eq(courses.id, parseInt(courseId)))
      .limit(1)

    const course = courseDetail[0]
    return {
      id: course.id,
      code: course.code,
      name: course.name,
      credits: parseFloat(course.credits),
    }
  }

  public async createCourse(
    courseList: {
      name: string
      code: string
      credits: number
      unitId?: number
      unitName?: string
    }[]
  ) {
    const existingCourses = await db
      .select()
      .from(courses)
      .where(
        inArray(
          courses.code,
          courseList.map((course) => course.code)
        )
      )
    if (existingCourses.length > 0) {
      throw new DuplicatedCourseCode(
        'Los siguientes códigos de curso ya existen: ' +
          existingCourses.map((course) => course.code).join(', ')
      )
    }
    let coursesToInsert: CoursesSchema[]
    if (courseList.every((course) => course.unitName !== undefined)) {
      const unitsId = await db
        .select({
          id: units.id,
          name: units.name,
        })
        .from(units)
        .where(
          and(
            inArray(units.type, ['department', 'section']),
            inArray(
              units.name,
              Array.from(new Set(courseList.map((course) => course.unitName!)))
            )
          )
        )
        .limit(1)
      const unitMap = new Map(unitsId.map((unit) => [unit.name, unit.id]))
      courseList.forEach((course) => {
        if (!unitMap.has(course.unitName!)) {
          throw new Error(
            'No se encontró el departamento o sección: ' + course.unitName
          )
        }
      })
      coursesToInsert = courseList.map((course) => ({
        code: course.code,
        name: course.name,
        unitId: unitMap.get(course.unitName!)!,
        credits: course.credits.toFixed(2),
      }))
    } else {
      coursesToInsert = courseList.map((course) => ({
        code: course.code,
        name: course.name,
        unitId: course.unitId!,
        credits: course.credits.toFixed(2),
      }))
    }
    await db.insert(courses).values(coursesToInsert)
  }
  public async updateCourse(
    courseCode: string,
    course: {
      name: string
      code: string
      credits: number
      unitId: number
    }
  ) {
    const existingCourses = await db
      .select()
      .from(courses)
      .where(and(eq(courses.code, course.code)))

    if (
      existingCourses.length > 0 &&
      existingCourses[0].code !== courseCode &&
      existingCourses[0].state
    ) {
      throw new DuplicatedCourseCode(
        'El código de curso ya existe: ' +
          course.code +
          ' - ' +
          existingCourses[0].name
      )
    }
    await db.transaction(async (tx) => {
      if (!existingCourses[0].state) {
        await tx
          .update(courses)
          .set({
            state: true,
          })
          .where(eq(courses.code, course.code))
      }
      await tx
        .update(courses)
        .set({
          name: course.name,
          code: course.code,
          credits: course.credits.toFixed(2),
          unitId: course.unitId,
        })
        .where(eq(courses.code, courseCode))
    })
  }

  public async disableCourse(courseCode: string) {
    await db
      .update(courses)
      .set({
        state: false,
      })
      .where(eq(courses.code, courseCode))
  }
}

export default CourseService
