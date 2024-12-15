import Need from '@frontend/components/Need'
import { useSessionStore } from '@frontend/store'
import SearchDelegateInput from './components/SearchStudentInput'
import DelegatesTable from './components/DelegatesTable'
import { StudentProcessPermissionsDict } from '@frontend/interfaces/enums/permissions/StudentProcess'

export default function DelegatesOverview() {
  const { session, getRoleWithPermission } = useSessionStore()
  const specialityId = getRoleWithPermission(
    StudentProcessPermissionsDict.MANAGE_DELEGATE
  )?.unitId?.toString()
  const idTerm = session?.term.id?.toString()
  return (
    <div className="flex flex-col my-6 p-4 gap-2 rounded-lg shadow-md">
      <div className="w-full flex flex-col md:flex-row justify-between gap-4">
        <SearchDelegateInput />
      </div>
      <Need permissions={[StudentProcessPermissionsDict.MANAGE_DELEGATE]}>
        <DelegatesTable
          specialityId={specialityId ?? ''}
          idTerm={idTerm ?? ''}
        />
      </Need>
    </div>
  )
}
