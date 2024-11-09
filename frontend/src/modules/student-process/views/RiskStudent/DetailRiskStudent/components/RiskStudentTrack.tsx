import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@frontend/components/ui/chart'
import { QueryKeys } from '@frontend/constants/queryKeys'
import RiskStudentService from '@frontend/modules/student-process/services/riskStudent.service'
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
  if (isLoading || !reports || reports.length === 0)
    return (
      <>
        <h2 className="font-semibold text-xl">Rendimiento histórico</h2>
        <p className="text-muted-foreground">
          No se han solicitado reportes de seguimiento
        </p>
      </>
    )
  const data = reports
    .map((report) => ({
      score: report.score,
      date: moment(report.date).format('DD/MM'),
    }))
    .reverse()
  return (
    <>
      <ChartContainer
        className="h-[300px] w-4/5 min-h-[200px] pt-5"
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
          <Line dataKey="score" stroke="var(--color-score)" strokeWidth={2} />
          <XAxis dataKey="date" tickMargin={8} />
          <CartesianGrid vertical={false} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
        </LineChart>
      </ChartContainer>
    </>
  )
}

const chartConfig = {
  score: {
    label: 'Puntaje',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig
