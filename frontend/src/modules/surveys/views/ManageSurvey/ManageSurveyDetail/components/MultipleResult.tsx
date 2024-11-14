import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@frontend/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { Answer } from '../interfaces/SurveyManagementDetail'

interface Props {
  answers: Answer[]
}
export default function MultipleResult({ answers }: Props) {
  const chartData = Array.from({ length: 5 }).map((_, i) => ({
    value: i + 1,
    result: answers.filter((answer) => answer.answerRawText === String(i + 1))
      .length,
  }))
  return (
    <ChartContainer config={chartConfig}>
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="value"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="result" fill="var(--color-result)" radius={8} />
      </BarChart>
    </ChartContainer>
  )
}
const chartConfig = {
  result: {
    label: 'Respuestas',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig
