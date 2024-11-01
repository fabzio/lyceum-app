import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { capitalize } from '@/lib/utils'

interface Props {
  id: number
  date: string
  score: number
  selectReport: (id: number) => void
  selected: boolean
}

export default function ReportsCard({
  id,
  date,
  score,
  selectReport,
  selected,
}: Props) {
  const maxScore = 5

  return (
    <Card
      className={`cursor-pointer ${selected ? 'border-primary' : ''} mx-5`}
      onClick={() => selectReport(id)}
    >
      <CardHeader>
        <CardTitle className="text-lg tracking-wider">
          {capitalize(date)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <p>Puntaje</p>
          <div className="text-3xl font-bold">{score}</div>
          <div className="text-sm">de {maxScore}</div>
        </div>
      </CardContent>
    </Card>
  )
}
