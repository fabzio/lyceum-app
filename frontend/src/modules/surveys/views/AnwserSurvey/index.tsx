import { QueryKeys } from '@frontend/constants/queryKeys'
import { useSuspenseQuery } from '@tanstack/react-query'
import AnwserSurveyService from '../../services/AnswerSurvey.service'
import { useSessionStore } from '@frontend/store'
import moment from 'moment'
import { Label } from '@frontend/components/ui/label'
import SchedulesSurvey from './components/SchedulesSurvey'

export default function AnwserSurvey() {
  const { session } = useSessionStore()
  const { data: surveyList } = useSuspenseQuery({
    queryKey: [QueryKeys.survey.UNANWSERED_SURVEYS],
    queryFn: () =>
      AnwserSurveyService.getUnawseredSurveys({
        accountId: session!.id,
      }),
  })
  return (
    <div>
      {surveyList?.map((survey) => (
        <div className="w-4/5" key={survey.id}>
          <div key={survey.id} className="flex w-full items-center gap-4">
            <h3 className="flex-1 text-3xl font-semibold">{survey.name}</h3>
            <div>
              <Label>Tipo de encuesta</Label>
              <p>{mapSurveyType[survey.type as 'midterm' | 'annual']}</p>
            </div>
            <div>
              <Label>Fecha de inicio</Label>
              <p className="text-lg">
                {moment(survey.creationDate).format('DD/MM/YYYY')}
              </p>
            </div>
            <div>
              <Label>Fecha de finalización</Label>
              <p className="text-lg">
                {moment(survey.endDate).format('DD/MM/YYYY')}
              </p>
            </div>
          </div>
          <SchedulesSurvey schedules={survey.schedules} surveyId={survey.id} />
        </div>
      ))}
    </div>
  )
}

const mapSurveyType = {
  midterm: 'Parcial',
  annual: 'Anual',
}
