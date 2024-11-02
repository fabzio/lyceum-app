import SubRoutesManagement from '@frontend/components/SubRoutesManagement'
import { Tab } from '@frontend/lib/utils'
import { SecurityModule } from '../security.module'

export default function SecurityManagement() {
  return <SubRoutesManagement tabs={tabs} />
}

const tabs: Tab[] = SecurityModule.submodules.map((submodule) => ({
  label: submodule.label,
  path: submodule.path,
  permissions: submodule.permissions,
}))
