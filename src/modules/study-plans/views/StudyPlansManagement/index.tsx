import NewStudyPlan from './components/NewStudyPlan'
import StudyPlanTable from './components/StudyPanTable'

export default function StudyPlanManagement() {
  return (
    <div className="p-6">
      <div className="flex justify-end">
        <NewStudyPlan />
      </div>
      <div>
        <StudyPlanTable />
      </div>
    </div>
  )
}
