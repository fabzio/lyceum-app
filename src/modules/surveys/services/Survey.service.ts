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
  surveyAnswers,
  unitsSupports,
} from '@/database/schema'
import { surveyQuestions } from '@/database/schema/surveyQuestions'
import { CreateSurveyDTO, InsertAnswerDTO } from '../dtos/SurveyDTO'
import { Unit } from '@/interfaces/models/Unit'
import { ScheduleSchema } from '@/database/schema/schedules'
import { CoursesSchema } from '@/database/schema/courses'
import { BaseRoles } from '@/interfaces/enums/BaseRoles'
import Survey from '..'
import { date } from 'drizzle-orm/mysql-core'
import groupBy from 'just-group-by'

class SurveyService {
  public async getSpecialitySurveys(unitId: Unit['id']) {
    const unitType = await db.query.units.findFirst({
      columns: {
        type: true,
      },
      where: eq(units.id, unitId),
    })
    if (!unitType) throw new Error('Unidad no encontrada')
    if (unitType?.type === 'speciality') {
      //Si es especialidad, buscamos el id de la unidad de soporte
      const supportUnit = await db.query.unitsSupports.findFirst({
        columns: {
          id: true,
          supportedUnitId: true,
        },
        where: eq(unitsSupports.supportingUnitId, unitId),
      })
      if (supportUnit?.supportedUnitId !== undefined) {
        unitId = supportUnit.supportedUnitId
      } else throw new Error('La especialidad no tiene unidad de soporte')
    }

    const surveysSpeciality = await db.query.surveys.findMany({
      columns: {
        unitId: false,
      },
      where: eq(surveys.unitId, unitId),
    })
    return surveysSpeciality
  }

  public async createSurvey(surveyData: CreateSurveyDTO) {
    const exisitngUnit = await db.query.units.findFirst({
      columns: {
        id: true,
      },
      where: and(
        eq(units.id, surveyData.unitId),
        or(eq(units.type, 'section'), eq(units.type, 'department'))
      ),
    })
    if (!exisitngUnit) throw new Error('Unidad de soporte no encontrada')

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
        supportUnitId: unitsSupports.supportedUnitId,
      })
      .from(accounts)
      .innerJoin(accountRoles, eq(accountRoles.accountId, accounts.id))
      .innerJoin(units, eq(units.id, accounts.unitId))
      .innerJoin(unitsSupports, eq(unitsSupports.supportingUnitId, units.id))
      .where(
        and(
          eq(accounts.id, AccountId),
          eq(units.type, 'speciality'),
          eq(accountRoles.roleId, BaseRoles.STUDENT)
        )
      )
    if (!unitStudentResponse.length)
      throw new Error(
        'No se encontró la unidad de soporte de la especialidad del estudiante'
      )
    const [unitStudent] = unitStudentResponse
    let date = new Date()
    const surveysAvailable = await db
      .select({
        id: surveys.id,
        name: surveys.name,
        creationDate: surveys.creationDate,
        endDate: surveys.endDate,
        type: surveys.surveyType,
      })
      .from(surveys)
      .where(
        and(
          eq(surveys.unitId, unitStudent.supportUnitId),
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
          scheduleId: +scheduleId,
          scheduleCode: accounts[0].schedule.code,
          courseName: accounts[0].course.name,
          accounts: accounts.map((account) => ({
            id: account.account.id,
            name: account.account.name,
            firstSurname: account.account.firstSurname,
            secondSurname: account.account.secondSurname,
            roleId: account.account.role,
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

  public async getSurveyQuestions(surveyId: NonNullable<SurveySchema['id']>) {
    const questions = await db.query.surveys.findFirst({
      columns: {
        id: true,
        name: true,
      },
      with: {
        questions: true,
      },
      where: eq(surveys.id, surveyId),
    })
    return questions
  }

  public async insertAnsweredSurvey(params: InsertAnswerDTO) {
    const surveyId = await db.query.surveyQuestions.findFirst({
      where: eq(surveyQuestions.id, params.questions[0].id),
      columns: {
        surveyId: true,
      },
    })
    if (!surveyId) throw new Error('Pregunta no encontrada')

    await db.transaction(async (tx) => {
      await tx.insert(accountSurveys).values({
        ...params,
        surveyId: surveyId.surveyId,
      })

      await tx.insert(surveyAnswers).values(
        params.questions.map((question) => ({
          subjectAccountId: params.subjectAccountId,
          questionId: question.id,
          answerRawText: question.answer,
          scheduleId: params.scheduleId,
        }))
      )
    })
  }

  public async getSurveyResults(surveyId: NonNullable<SurveySchema['id']>) {
    const survey = await db.query.surveys.findFirst({
      columns: {
        id: true,
        name: true,
      },
      with: {
        questions: {
          with: {
            answers: {
              with: {
                account: {
                  columns: {
                    name: true,
                    firstSurname: true,
                    secondSurname: true,
                  },
                },
                schedule: {
                  columns: {
                    code: true,
                  },
                  with: {
                    course: {
                      columns: {
                        name: true,
                        code: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      where: eq(surveys.id, surveyId),
    })
    return survey
  }
}
export default SurveyService
