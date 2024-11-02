import SubRoutesManagement from '@frontend/components/SubRoutesManagement'
import { Tab } from '@frontend/lib/utils'
import { UserModule } from '../users.module'

export default function UserManagement() {
  return <SubRoutesManagement tabs={tabs} />
}
const tabs: Tab[] = UserModule.submodules.map((submodule) => ({
  label: submodule.label,
  path: submodule.path,
  permissions: submodule.permissions,
}))
