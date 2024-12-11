import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@frontend/components/ui/card'

interface Evaluation {
  requirementDetail: string
  requirementStep: 'phase1' | 'phase2' | null
  score: number
  evaluationDate: Date
  evaluatorName: string
  evaluatorLastname: string
}

interface RequirementEvaluationListProps {
  evaluations: Evaluation[]
}

const getScoreColor = (score: number) => {
  if (score >= 9) return 'bg-green-500'
  if (score >= 7) return 'bg-green-300'
  if (score >= 5) return 'bg-yellow-300'
  if (score >= 3) return 'bg-orange-300'
  return 'bg-red-500'
}

export const RequirementEvaluationList: React.FC<
  RequirementEvaluationListProps
> = ({ evaluations }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evaluación de Requisitos</CardTitle>
      </CardHeader>
      <CardContent>
        {evaluations.length == 0 && (
          <p className="text-center font-semibold text-lg dark: text-gray-700 ">
            Evaluación pendiente
          </p>
        )}
        {evaluations.map((evaluation, index) => (
          <div key={index} className="mb-4 p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              {evaluation.requirementDetail}
            </h3>
            <div className="flex items-center mb-2">
              <div
                className={`w-12 h-12 rounded-full ${getScoreColor(evaluation.score)} flex items-center justify-center text-white font-bold mr-4`}
              >
                {evaluation.score.toFixed(1)}
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Evaluado por: {evaluation.evaluatorName}{' '}
                  {evaluation.evaluatorLastname}
                </p>
                <p className="text-sm text-gray-600">
                  Fecha:{' '}
                  {new Date(evaluation.evaluationDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Etapa:{' '}
              {evaluation.requirementStep === 'phase1'
                ? 'Fase 1'
                : evaluation.requirementStep === 'phase2'
                  ? 'Fase 2'
                  : 'No especificada'}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
