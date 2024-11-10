import SubRoutesManagement from '@frontend/components/SubRoutesManagement'
import { Tab } from '@frontend/lib/utils'
import { UnitModule } from '../unit.module'

// this results in for examples/react/kitchen-sink/src/main.ts
export default function UnitManagement() {
  return <SubRoutesManagement tabs={tabs} />
}

const tabs: Tab[] = UnitModule.submodules.map((submodule) => ({
  label: submodule.label,
  path: submodule.path,
  permissions: submodule.permissions,
}))
