import SubRoutesManagement from "@frontend/components/SubRoutesManagement";
import { HiringModule } from "../hiring.module";
import { Tab } from "@frontend/lib/utils";

export default function HiringManagement() {
  return <SubRoutesManagement tabs={tabs} />
}

const tabs: Tab[] = HiringModule.submodules.map((submodule) => ({
  label: submodule.label,
  path: submodule.path,
  permissions: submodule.permissions,
}))