import { Label } from '@frontend/components/ui/label'
import { QueryKeys } from '@frontend/constants/queryKeys'
import PageLayout from '@frontend/layouts/PageLayout'
import SurveyManagementService from '@frontend/modules/surveys/services/ManageSurvey.service'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import SurveyAnswerResult from './components/SurveyAnswerResult'

export default function ManageSurveyDetail() {
  const { surveyId } = useParams({
    from: '/_auth/encuestas/gestionar/$surveyId',
  })
  const { data: survey } = useSuspenseQuery({
    queryKey: [QueryKeys.survey.SURVEYS, surveyId],
    queryFn: () => SurveyManagementService.getSurveyResults(surveyId),
  })
  return (
    <PageLayout name={survey?.name}>
      {survey?.questions.map((question) => (
        <article key={question.id} className="px-3">
          <div className="flex items-center gap-2">
            <Label>{question.questionText}</Label>
            <p>{`${question.answers.length} 
          respuesta${question.answers.length === 1 ? '' : 's'}
          `}</p>
          </div>
          <section>
            <SurveyAnswerResult
              answers={question.answers}
              type={question.type}
            />
          </section>
        </article>
      ))}
    </PageLayout>
  )
}
