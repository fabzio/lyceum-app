import SearchExternInput from './components/SearchExternInput'
import ExternTable from './components/ExternTable'
import Need from '@frontend/components/Need'
import { UserPermissionsDict } from '@frontend/interfaces/enums/permissions/Users'

export default function ExternManagement() {
  return (
    <div className="flex flex-col my-6 p-4 gap-2 rounded-lg shadow-md">
      <div className="w-full flex flex-col md:flex-row justify-between gap-4">
        <SearchExternInput />
      </div>
      <Need permissions={UserPermissionsDict.READ_EXTERNALS}>
        <ExternTable />
      </Need>
    </div>
  )
}
