import { surveys, SurveySchema } from '@/database/schema/surveys'
import db from '@/database'
import { and, between, Column, eq, gte, lte } from 'drizzle-orm'
import {
  units,
  scheduleAccounts,
  schedules,
  courses,
  terms,
  accounts,
} from '@/database/schema'
import { surveyQuestions } from '@/database/schema/surveyQuestions'
import { CreateSurveyDTO } from '../dtos/SurveyDTO'
import { Unit } from '@/interfaces/models/Unit'
import { ScheduleSchema } from '@/database/schema/schedules'
import { CoursesSchema } from '@/database/schema/courses'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'
import Survey from '..'
import { date } from 'drizzle-orm/mysql-core'

class SurveyService {
  public async getSpecialitySurveys(unitId: Unit['id']) {
    const isSpeciality = await db.query.units.findFirst({
      columns: {
        id: true,
      },
      where: and(eq(units.id, unitId), eq(units.type, 'speciality')),
    })
    console.log(isSpeciality)
    if (!isSpeciality) throw new Error('Especialidad no encontrada')

    return await db.query.surveys.findMany({
      columns: {
        unitId: false,
      },
      where: eq(surveys.unitId, unitId),
    })
  }
  public async createSurvey(surveyData: CreateSurveyDTO) {
    const exisitngUnit = await db.query.units.findFirst({
      columns: {
        id: true,
      },
      where: and(eq(units.id, surveyData.unitId), eq(units.type, 'speciality')),
    })
    if (!exisitngUnit) throw new Error('Especialidad no encontrada')

    await db.transaction(async (tx) => {
      const [newSurvey] = await tx
        .insert(surveys)
        .values(surveyData)
        .returning({
          id: surveys.id,
        })

      await tx.insert(surveyQuestions).values(
        surveyData.questions.map((question) => ({
          questionText: question.text,
          surveyId: newSurvey.id,
          type: question.type,
        }))
      )
    })
  }

  public async getUnAnsweredSurveys(
    AccountId: string
  ): Promise<
    (Pick<ScheduleSchema, 'id' | 'code'> &
      Pick<CoursesSchema, 'id' | 'code' | 'name'>)[]
  > {
    // Formatear `date` como una cadena en el formato adecuado (YYYY-MM-DD)
    let date = new Date()

    const survey = await db
      .select()
      .from(surveys)
      .where(
        and(
          gte(surveys.creationDate, date),
          lte(surveys.endDate, date),
          eq(surveys.active, true)
        )
      )

    if (!surveys) {
      return []
    }
    const UnAnsweredSurveys = await db
      .select({
        id: schedules.id, // Esto será el id del ScheduleSchema
        code: schedules.code, // Esto será el code del ScheduleSchema
        courseId: courses.id, // Este será el id del CoursesSchema
        courseCode: courses.code, // Este será el code del CoursesSchema
        courseName: courses.name, // Esto será el name del CoursesSchema
      })
      .from(courses)
      .innerJoin(schedules, eq(schedules.courseId, courses.id))
      .innerJoin(
        scheduleAccounts,
        eq(scheduleAccounts.scheduleId, schedules.id)
      )
      .innerJoin(terms, eq(terms.id, schedules.termId))

      .where(
        and(
          eq(scheduleAccounts.accountId, AccountId),
          eq(scheduleAccounts.roleId, BaseRoles.STUDENT),
          eq(terms.current, true)
        )
      )

    const a = await db.query.scheduleAccounts.findMany({
      where: and(
        eq(scheduleAccounts.accountId, AccountId),
        eq(scheduleAccounts.roleId, BaseRoles.STUDENT)
      ),
      with: {
        account: {
          columns: {
            id: true,
            name: true,
            firstSurname: true,
            secondSurname: true,
          },
        },
      },
    })

    console.log(a)
    // Mapear los resultados para ajustarlos a los tipos esperados
    return UnAnsweredSurveys.map((result) => ({
      id: result.id, // Asignar el ID del horario
      code: result.code, // Asignar el código del horario
      name: result.courseName, // Asignar el nombre del curso
    }))
  }
}
export default SurveyService
