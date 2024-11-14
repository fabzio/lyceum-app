import { surveys, SurveySchema } from '@/database/schema/surveys'
import db from '@/database'
import {
  and,
  between,
  Column,
  eq,
  gte,
  inArray,
  isNull,
  lte,
  or,
} from 'drizzle-orm'
import {
  units,
  scheduleAccounts,
  schedules,
  courses,
  terms,
  accounts,
  unitType,
  accountRoles,
  accountSurveys,
} from '@/database/schema'
import { surveyQuestions } from '@/database/schema/surveyQuestions'
import { CreateSurveyDTO } from '../dtos/SurveyDTO'
import { Unit } from '@/interfaces/models/Unit'
import { ScheduleSchema } from '@/database/schema/schedules'
import { CoursesSchema } from '@/database/schema/courses'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'
import Survey from '..'
import { date } from 'drizzle-orm/mysql-core'
import groupBy from 'just-group-by'

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

  public async getUnAnsweredSurveys(AccountId: string) {
    const unitStudentResponse = await db
      .select({
        unitId: accounts.unitId,
        unitType: units.type,
      })
      .from(accounts)
      .innerJoin(accountRoles, eq(accountRoles.accountId, accounts.id))
      .innerJoin(units, eq(units.id, accounts.unitId))
      .where(
        and(
          eq(accounts.id, AccountId),
          eq(units.type, 'speciality'),
          eq(accountRoles.roleId, BaseRoles.STUDENT)
        )
      )
    if (!unitStudentResponse.length)
      throw new Error('No se encontró la especialidad del estudiante')
    const [unitStudent] = unitStudentResponse
    let date = new Date()
    const surveysAvailable = await db
      .select({
        id: surveys.id,
        name: surveys.name,
        endDate: surveys.endDate,
      })
      .from(surveys)
      .where(
        and(
          eq(surveys.unitId, unitStudent.unitId),
          eq(surveys.active, true),
          gte(surveys.endDate, date),
          lte(surveys.creationDate, date)
        )
      )
    if (!surveysAvailable.length) return []

    const accountsToEvaluate = await db
      .select({
        course: {
          code: courses.code,
          name: courses.name,
        },
        schedule: {
          id: schedules.id,
          code: schedules.code,
        },
        account: {
          id: scheduleAccounts.accountId,
          name: accounts.name,
          firstSurname: accounts.firstSurname,
          secondSurname: accounts.secondSurname,
          role: scheduleAccounts.roleId,
        },
      })
      .from(scheduleAccounts)
      .innerJoin(accounts, eq(accounts.id, scheduleAccounts.accountId))
      .innerJoin(schedules, eq(schedules.id, scheduleAccounts.scheduleId))
      .innerJoin(courses, eq(courses.id, schedules.courseId))
      .where(
        and(
          or(
            isNull(scheduleAccounts.roleId),
            eq(scheduleAccounts.roleId, BaseRoles.PROFESSOR)
          ),
          inArray(
            scheduleAccounts.scheduleId,
            db
              .selectDistinct({
                id: scheduleAccounts.scheduleId,
              })
              .from(scheduleAccounts)
              .where(and(eq(scheduleAccounts.accountId, AccountId)))
          )
        )
      )
    const alreadyAnswered = await this.getAnsweredSurveys(AccountId)
    const UnAnsweredSurveys = surveysAvailable.map((survey) => {
      const accountsToEvaluateSurvey = accountsToEvaluate.filter(
        (account) =>
          !alreadyAnswered.find(
            (answered) =>
              answered.scheduleId === account.schedule.id &&
              answered.subjectAccountId === account.account.id &&
              answered.surveyId === survey.id
          )
      )
      return {
        ...survey,
        schedules: Object.entries(
          groupBy(accountsToEvaluateSurvey, (account) => account.schedule.id)
        ).map(([scheduleId, accounts]) => ({
          scheduleId,
          scheduleCode: accounts[0].schedule.code,
          courseName: accounts[0].course.name,
          accounts: accounts.map((account) => ({
            accountId: account.account.id,
            accountName: account.account.name,
            firstSurname: account.account.firstSurname,
            secondSurname: account.account.secondSurname,
          })),
        })),
      }
    })

    return UnAnsweredSurveys.filter((survey) => survey.schedules.length)
  }

  public async getAnsweredSurveys(AccountId: string) {
    const answeredSurveys = await db
      .select({
        scheduleId: accountSurveys.scheduleId,
        subjectAccountId: accountSurveys.subjectAccountId,
        surveyId: accountSurveys.surveyId,
      })
      .from(accountSurveys)
      .innerJoin(surveys, eq(surveys.id, accountSurveys.surveyId))
      .where(
        and(
          eq(accountSurveys.evaluatorAccountId, AccountId),
          eq(surveys.active, true),
          gte(surveys.endDate, new Date()),
          lte(surveys.creationDate, new Date())
        )
      )
    return answeredSurveys
  }
}
export default SurveyService
