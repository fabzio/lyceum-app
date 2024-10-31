import SubRoutesManagement from '@/components/SubRoutesManagement'
import { Tab } from '@/lib/utils'
import { EnrollmentModule } from '../enrollment.module'

export default function EnrollmentManagement() {
  return <SubRoutesManagement tabs={tabs} />
}

const tabs: Tab[] = EnrollmentModule.submodules.map((submodule) => ({
  label: submodule.label,
  path: submodule.path,
  permissions: submodule.permissions,
}))
