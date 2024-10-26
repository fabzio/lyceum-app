import ReportList from './components/ReportList'
import StudentReport from './StudentReport'

export default function DetailRiskStudent() {
  return (
    <div className="flex flex-col lg:flex-row   space-y-8 lg:space-y-0 lg:space-x-8">
      <ReportList />
      <StudentReport />
    </div>
  )
}
