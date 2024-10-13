import moment from 'moment'
import ReportsCard from './ReportsCard'

interface Props {
  reports: {
    id: number
    date: string
    score: number
  }[]
  selectedReport: number | null
  setSelectedReport: (id: number) => void
}
export default function ReportList({
  reports,
  selectedReport,
  setSelectedReport,
}: Props) {
  return (
    <div className="flex flex-col gap-2 flex-grow">
      {reports.map((report, idx) => (
        <ReportsCard
          key={report.id}
          id={report.id}
          date={moment(report.date).calendar()}
          score={report.score}
          selectReport={setSelectedReport}
          selected={selectedReport ? selectedReport === report.id : idx === 0}
        />
      ))}
    </div>
  )
}
