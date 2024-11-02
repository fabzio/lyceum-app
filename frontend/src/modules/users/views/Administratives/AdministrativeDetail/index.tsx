import { useSuspenseQuery } from '@tanstack/react-query'

import { QueryKeys } from '@frontend/constants/queryKeys'
import { useParams } from '@tanstack/react-router'
import AdministrativeService from '@frontend/modules/users/services/Administrative.service'
import ActionButton from './components/ActionButton'
import { useRef } from 'react'
import GeneralInfo from './components/GeneralInfo'

export default function AdministrativeDetail() {
  const { code } = useParams({
    from: '/_auth/usuarios/administativos/$code',
  })
  const { data: administative } = useSuspenseQuery({
    queryKey: [QueryKeys.users.ADMINISTRATIVES, code],
    queryFn: () => AdministrativeService.getAdministrativeDetail(code),
  })

  const ref = useRef(null)
  return (
    <div>
      <ActionButton refSubmitButtom={ref} />
      <GeneralInfo administative={administative} refSubmitButtom={ref} />
    </div>
  )
}
