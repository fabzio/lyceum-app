import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@frontend/components/ui/accordion'
import AccountSurvey from './AccountSurvey'
import { SurveySchedule } from '@frontend/modules/surveys/interfaces/SurveyStudent'

interface Props {
  surveyId: number
  schedules: SurveySchedule[]
}
export default function SchedulesSurvey({ schedules, surveyId }: Props) {
  return (
    <Accordion type="single" className="w-full">
      {schedules.map((schedule, index) => (
        <AccordionItem key={index} value={schedule.scheduleId.toString()}>
          <AccordionTrigger>
            <div className="flex justify-start w-full gap-2 px-3">
              <p>{schedule.courseName}</p> -<h3>{schedule.scheduleCode}</h3>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="w-full space-y-2">
              {schedule.accounts.map((account: any, index: number) => (
                <AccountSurvey
                  key={index}
                  account={account}
                  scheduleId={schedule.scheduleId}
                  surveyId={surveyId}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
