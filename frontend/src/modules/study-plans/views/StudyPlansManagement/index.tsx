import Need from '@frontend/components/Need'
import NewStudyPlan from './components/NewStudyPlan'
import StudyPlanTable from './components/StudyPanTable'
import { StudyPlanPermissionsDict } from '@frontend/interfaces/enums/permissions/StudyPlan'

export default function StudyPlanManagement() {
  return (
    <div className="p-6">
      <div className="flex justify-end">
        <Need permissions={StudyPlanPermissionsDict.MANAGE_STUDY_PLAN}>
          <NewStudyPlan />
        </Need>
      </div>
      <Need permissions={StudyPlanPermissionsDict.READ_STUDY_PLAN}>
        <div>
          <StudyPlanTable />
        </div>
      </Need>
    </div>
  )
}
