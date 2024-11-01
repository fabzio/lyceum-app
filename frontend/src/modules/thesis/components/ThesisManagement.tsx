import { Tab } from '@/lib/utils'
import SubRoutesManagement from '@/components/SubRoutesManagement'
import { ThesisModule } from '../thesis.module'

export default function ThesisManagement() {
  return <SubRoutesManagement tabs={tabs} />
}

const tabs: Tab[] = ThesisModule.submodules.map((submodule) => ({
  label: submodule.label,
  path: submodule.path,
  permissions: submodule.permissions,
}))
