import { Tab } from '@frontend/lib/utils'

import SubRoutesManagement from '@frontend/components/SubRoutesManagement'
import { StudyPlanModule } from '../study-plan.module'

export default function StudyPlansManagment() {
  return <SubRoutesManagement tabs={tabs} />
}

const tabs: Tab[] = StudyPlanModule.submodules.map((submodule) => ({
  label: submodule.label,
  path: submodule.path,
  permissions: submodule.permissions,
}))
