import MasiveAdministrativesDialog from './components/MasiveAdministrativesDialog'
import SearchAdministrativeInput from './components/SearchAdministrativeInput'
import AdministrativeTable from './components/AdministrativeTable'
import Need from '@frontend/components/Need'
import { UserPermissionsDict } from '@frontend/interfaces/enums/permissions/Users'
import NewAdministrativeDialog from './components/NewAdministrativeDialog'

export default function AdministrativeManagement() {
  return (
    <div className="flex flex-col my-6 p-4 gap-2 rounded-lg shadow-md">
      <div className="w-full flex flex-col md:flex-row justify-between gap-4">
        <SearchAdministrativeInput />
        <Need permissions={UserPermissionsDict.WRITE_ADMINISTRIVES}>
          <div className="flex gap-2">
            <MasiveAdministrativesDialog />
            <NewAdministrativeDialog />
          </div>
        </Need>
      </div>
      <Need permissions={UserPermissionsDict.READ_ADMINISTRIVES}>
        <AdministrativeTable />
      </Need>
    </div>
  )
}
