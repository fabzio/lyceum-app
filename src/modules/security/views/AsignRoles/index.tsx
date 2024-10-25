import { Input } from '@/components/ui/input'
import AssigmentAccordion from './components/AssigmentAccordion'
import SelectFilter from './components/SelectFilter'
import NewAssigment from './components/NewAssignmentDialog'
import { useSuspenseQuery } from '@tanstack/react-query'
import RoleAccountsService from '../../services/RoleAccounts.service'
import { QueryKeys } from '@/constants/queryKeys'

export default function AsignRoles() {
  const { data } = useSuspenseQuery({
    queryKey: [QueryKeys.security.ROLE_ACCOUNTS],
    queryFn: RoleAccountsService.getRoleAccounts,
  })
  return (
    <div className="flex flex-col my-6 p-2">
      <div className="w-full flex flex-col md:flex-row justify-between gap-2">
        <div className="md:flex-grow">
          <Input type="search" placeholder="🔎 Buscar asignación" />
        </div>
        <div className="flex gap-2">
          <SelectFilter />
          <NewAssigment />
        </div>
      </div>
      <div>
        <AssigmentAccordion assigments={data} />
      </div>
    </div>
  )
}