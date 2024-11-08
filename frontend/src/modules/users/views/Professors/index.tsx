import MasiveProfessorsDialog from './components/MasiveProfessorsDialog'
import SearchProfessorInput from './components/SearchProfessorInput'
import ProfessorTable from './components/ProfessorTable'
import Need from '@frontend/components/Need'
import { UserPermissionsDict } from '@frontend/interfaces/enums/permissions/Users'

export default function ProfessorManagement() {
  return (
    <div className="flex flex-col my-6 p-4 gap-2 rounded-lg shadow-md">
      <div className="w-full flex flex-col md:flex-row justify-between gap-4">
        <SearchProfessorInput />
        <Need permissions={[UserPermissionsDict.WRITE_PROFESSORS]}>
          <div className="flex gap-2">
            <MasiveProfessorsDialog />
          </div>
        </Need>
      </div>
      <Need permissions={[UserPermissionsDict.READ_PROFESSORS]}>
        <ProfessorTable />
      </Need>
    </div>
  )
}
