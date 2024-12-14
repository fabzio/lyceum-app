import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from '@frontend/components/ui/chart'
import { Answer } from '../interfaces/SurveyManagementDetail'
import { Label, Pie, PieChart } from 'recharts'

interface Props {
  answers: Answer[]
}

export default function BooleanResult({ answers }: Props) {
  const chartData = [
    {
      answer: 'Sí',
      value: answers.filter((answer) => answer.answerRawText === 'true').length,
      fill: 'var(--color-Sí)',
    },
    {
      answer: 'No',
      value: answers.filter((answer) => answer.answerRawText === 'false')
        .length,
      fill: 'var(--color-No)',
    },
  ]
  return (
    <ChartContainer config={chartConfig}>
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="answer"
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline={'middle'}
                    className="fill-foreground text-base font-bold"
                  >
                    <tspan x={viewBox.cx} y={viewBox.cy}>
                      {answers.length}
                    </tspan>
                    <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24}>
                      respuesta{answers.length === 1 ? '' : 's'}
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </Pie>
        <ChartLegend
          content={({ payload }) => (
            <ul className="flex flex-wrap justify-center gap-8">
              {payload?.map((entry, index: number) => (
                <li
                  key={`legend-item-${index}`}
                  className="flex items-center gap-2 text-sm"
                >
                  <span
                    className="block w-4 h-4"
                    style={{ backgroundColor: entry.color }}
                  />
                  {(entry.payload as unknown as { answer: string }).answer}
                </li>
              ))}
            </ul>
          )}
          className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  )
}
const chartConfig = {
  respuestas: {
    label: 'Respuestas',
  },
  ['Sí']: {
    color: 'hsl(var(--chart-1))',
  },
  ['No']: {
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig
