import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { QueryKeys } from '@/constants/queryKeys'
import RiskStudentService from '@/modules/courses/services/riskStudent.service'
import { useQuery } from '@tanstack/react-query'
import { useParams, useSearch } from '@tanstack/react-router'
import moment from 'moment'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

export default function RiskStudentTrack() {
  const { code } = useParams({
    from: '/_auth/cursos/alumnos-riesgo/$code',
  })
  const { scheduleId } = useSearch({
    from: '/_auth/cursos/alumnos-riesgo/$code',
  })

  const { data: reports, isLoading } = useQuery({
    queryKey: [QueryKeys.courses.RISK_STUDENT_REPORTS, code],
    queryFn: () =>
      RiskStudentService.getRiskStudentReports({
        scheduleId: +scheduleId,
        studentCode: code,
      }),
  })
  if (isLoading || !reports || reports.length === 0) return null
  const data = reports
    .map((report) => ({
      score: report.score,
      date: moment(report.date).format('DD/MM'),
    }))
    .reverse()
  return (
    <ChartContainer
      className="h-[300px] w-4/5 min-h-[200px]"
      config={chartConfig}
    >
      <LineChart
        data={data}
        accessibilityLayer
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <Line
          dataKey="score"
          type="natural"
          stroke="var(--color-score)"
          strokeWidth={2}
        />
        <XAxis dataKey="date" tickMargin={8} />
        <CartesianGrid vertical={false} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
      </LineChart>
    </ChartContainer>
  )
}

const chartConfig = {
  score: {
    label: 'Puntaje',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig
