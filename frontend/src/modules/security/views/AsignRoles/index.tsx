import { Input } from '@frontend/components/ui/input'
import AssigmentAccordion from './components/AssigmentAccordion'
//import SelectFilter from './components/SelectFilter'
import NewAssigment from './components/NewAssignmentDialog'
import { useSuspenseQuery } from '@tanstack/react-query'
import RoleAccountsService from '../../services/RoleAccounts.service'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { useState } from 'react'

export default function AsignRoles() {
  const { data } = useSuspenseQuery({
    queryKey: [QueryKeys.security.ROLE_ACCOUNTS],
    queryFn: RoleAccountsService.getRoleAccounts,
  })
  /*<SelectFilter />*/

  const [search, setSearch] = useState('')
  return (
    <div className="flex flex-col my-6 p-2">
      <div className="w-full flex flex-col md:flex-row justify-between gap-2">
        <div className="md:flex-grow">
          <Input
            type="search"
            placeholder="🔎 Buscar por usuario o rol"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        <div className="flex gap-2">
          <NewAssigment />
        </div>
      </div>
      <div>
        <AssigmentAccordion assigments={data} search={search} />
      </div>
    </div>
  )
}
