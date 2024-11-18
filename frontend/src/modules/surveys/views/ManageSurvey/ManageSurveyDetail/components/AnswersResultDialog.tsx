import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@frontend/components/ui/dialog'
import { Answer } from '../interfaces/SurveyManagementDetail'
import { Button } from '@frontend/components/ui/button'
import BooleanResult from './BooleanResult'
import MultipleResult from './MultipleResult'
import MessageResult from './MessageResult'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@frontend/components/ui/select'

interface Props {
  answers: Answer[]
  type: 'boolean' | 'multiple' | 'text'
}
export default function AnswersResultDialog({ answers, type }: Props) {
  const [acountFilter, setAccountFilter] = useState<string>(
    answers[0].subjectAccountId
  )

  const filteredAnswers = answers.filter(
    (answer) => answer.subjectAccountId === acountFilter
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Ver resultados</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Resultados de {answers[0].schedule.code}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <Select
            onValueChange={(value) => setAccountFilter(value)}
            defaultValue={`${answers[0].account.name} ${answers[0].account.firstSurname} ${answers[0].account.secondSurname}`}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por cuenta" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                new Set(
                  answers.map(
                    (answer) =>
                      `${answer.account.name} ${answer.account.firstSurname} ${answer.account.secondSurname}`
                  )
                )
              ).map((account) => (
                <SelectItem key={account} value={account}>
                  {account}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ul>
            <li>
              {type === 'boolean' && (
                <BooleanResult answers={filteredAnswers} />
              )}
              {type === 'multiple' && (
                <MultipleResult answers={filteredAnswers} />
              )}
              {type === 'text' && <MessageResult answers={filteredAnswers} />}
            </li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}
