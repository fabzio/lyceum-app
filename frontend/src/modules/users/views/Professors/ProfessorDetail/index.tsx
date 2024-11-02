import { useSuspenseQuery } from '@tanstack/react-query'
import GeneralInfo from './components/Generalnfo'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { useParams } from '@tanstack/react-router'
import ProfessorService from '@frontend/modules/users/services/Professor.service'
import ActionButton from './components/ActionButton'
import { useRef } from 'react'

export default function ProfessorDetail() {
  const ref = useRef(null)

  const { code } = useParams({
    from: '/_auth/usuarios/docentes/$code',
  })
  const { data: professor } = useSuspenseQuery({
    queryKey: [QueryKeys.users.PROFESSORS, code],
    queryFn: () => ProfessorService.getProfessorDetail(code),
  })
  return (
    <div>
      <ActionButton refSubmitButtom={ref} />
      <GeneralInfo refSubmitButtom={ref} professor={professor} />
    </div>
  )
}
