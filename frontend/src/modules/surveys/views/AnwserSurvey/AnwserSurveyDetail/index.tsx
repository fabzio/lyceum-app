import { QueryKeys } from '@frontend/constants/queryKeys'
import PageLayout from '@frontend/layouts/PageLayout'
import AnwserSurveyService from '@frontend/modules/surveys/services/AnswerSurvey.service'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import SurveyForm from './components/SurveyForm'
import { useSessionStore } from '@frontend/store'
import { BaseRoles } from '@frontend/interfaces/enums/BaseRoles'
import { Label } from '@frontend/components/ui/label'
import { Skeleton } from '@frontend/components/ui/skeleton'

export default function AnwserSurveyDetail() {
  const { session } = useSessionStore()
  const { scheduleId, subjetAccountId, surveyId } = useSearch({
    from: '/_auth/encuestas/listado/responder',
  })
  const { data } = useSuspenseQuery({
    queryKey: [QueryKeys.survey.UNANWSERED_SURVEYS, surveyId],
    queryFn: () => AnwserSurveyService.getQuestions({ surveyId }),
  })

  const { data: surveyList, isLoading } = useQuery({
    queryKey: [QueryKeys.survey.UNANWSERED_SURVEYS],
    queryFn: () =>
      AnwserSurveyService.getUnawseredSurveys({ accountId: session!.id }),
  })
  const account = surveyList
    ?.find((s) => s.id === surveyId)
    ?.schedules.find((s) => s.scheduleId === scheduleId)
    ?.accounts.find((a) => a.id === subjetAccountId)

  return (
    <PageLayout name={data.name}>
      {isLoading ? (
        <Skeleton className="w-1/2 h-[56px]" />
      ) : (
        <section className="mx-3">
          <Label>
            {account?.roleId === BaseRoles.TEACHER
              ? 'Docente'
              : 'Jefe de practica'}
          </Label>
          <h3 className="font-semibold text-2xl">
            {`${account?.name} ${account?.firstSurname} - ${account?.secondSurname}`}
          </h3>
        </section>
      )}
      <SurveyForm questions={data.questions} />
    </PageLayout>
  )
}
