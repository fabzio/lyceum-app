import SubRoutesManagement from '@frontend/components/SubRoutesManagement'
import { Tab } from '@frontend/lib/utils'
import { SurveysModule } from '../surveys.module'

export default function SurveysManagement() {
  return <SubRoutesManagement tabs={tabs} />
}

const tabs: Tab[] = SurveysModule.submodules.map((submodule) => ({
  label: submodule.label,
  path: submodule.path,
  permissions: submodule.permissions,
}))
