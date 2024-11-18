import groupBy from 'just-group-by'
import { Answer } from '../interfaces/SurveyManagementDetail'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@frontend/components/ui/accordion'
import AnswersResultDialog from './AnswersResultDialog'

interface Props {
  answers: Answer[]
  type: 'boolean' | 'multiple' | 'text'
}
export default function SurveyAnswerResult({ answers, type }: Props) {
  const answerByCourse = groupBy(
    answers,
    (answer) => `${answer.schedule.course.code} ${answer.schedule.course.name}`
  )
  return (
    <div className="px-4 w-full md:w-3/5">
      <Accordion collapsible type="single">
        {Object.entries(answerByCourse).map(([course, answers]) => (
          <AccordionItem key={course} value={course}>
            <AccordionTrigger>{course}</AccordionTrigger>
            <AccordionContent>
              <ul>
                {Object.entries(
                  groupBy(answers, (answer) => answer.scheduleId)
                ).map(([scheduleId, answers]) => (
                  <li key={scheduleId}>
                    <div className="flex items-center gap-2">
                      <p>{answers[0].schedule.code}</p>
                      <p>{`${answers.length} respuesta${
                        answers.length === 1 ? '' : 's'
                      }`}</p>
                      <AnswersResultDialog answers={answers} type={type} />
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
