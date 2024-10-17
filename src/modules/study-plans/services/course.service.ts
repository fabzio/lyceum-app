import db from '@/database'
import { courses } from '@/database/schema'
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

class CourseService implements CourseDAO {
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
        or(
          ilike(courses.name, `%${params.q}%`),
          ilike(courses.code, `%${params.q}%`)
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
      })
      .from(courses)
      .where(
        or(
          ilike(courses.name, `%${params.q}%`),
          ilike(courses.code, `%${params.q}%`)
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
      id: course.id,
      code: course.code,
      name: course.name,
      credits: parseFloat(course.credits),
    }))
    return {
      result,
      rowCount: +total,
      currentPage: params.page,
      totalPages: Math.ceil(+total / params.limit),
    }
  }

  public async getCoursesDetail({
    courseId,
  }: {
    courseId: string
  }): Promise<Course> {
    // Puedes devolver null si no se encuentra el curso
    const courseDetail = await db
      .select({
        id: courses.id,
        code: courses.code,
        name: courses.name,
        credits: courses.credits,
      })
      .from(courses)
      .where(eq(courses.id, parseInt(courseId)))
      .limit(1) // Para obtener solo un resultado

    // Verificar si se encontró algún resultado y devolver el primer curso
    const course = courseDetail[0]
    return {
      id: course.id,
      code: course.code,
      name: course.name,
      credits: parseFloat(course.credits), // Parsear el campo decimal
    }
  }

  public async createCourse(
    courseList: {
      name: string
      code: string
      credits: number
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
    await db.insert(courses).values(
      courseList.map((course) => ({
        ...course,
        credits: course.credits.toFixed(2),
      }))
    )
  }
}

export default CourseService
