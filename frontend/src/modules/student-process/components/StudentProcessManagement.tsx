import SubRoutesManagement from '@frontend/components/SubRoutesManagement'
import { Tab } from '@frontend/lib/utils'
import { StudentProcessModule } from '../student-process.module'

export default function StudentProcessManagement() {
  return <SubRoutesManagement tabs={tabs} />
}

const tabs: Tab[] = StudentProcessModule.submodules.map((submodule) => ({
  label: submodule.label,
  path: submodule.path,
  permissions: submodule.permissions,
}))
