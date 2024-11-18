import {
  ChartConfig,
  ChartContainer,
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
      name: 'Sí',
      value: answers.filter((answer) => answer.answerRawText === 'true').length,
      fill: 'var(--color-Sí)',
    },
    {
      name: 'No',
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
          nameKey="name"
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
