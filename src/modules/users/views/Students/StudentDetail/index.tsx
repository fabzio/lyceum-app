import { useSuspenseQuery } from '@tanstack/react-query'
import GeneralInfo from './components/GeneralInfo'
import { QueryKeys } from '@/constants/queryKeys'
import { useParams } from '@tanstack/react-router'
import StudentService from '@/modules/users/services/Student.service'
import ActionButton from './components/ActionButton'
import { useRef } from 'react'

export default function StudentDetail() {
  const { code } = useParams({
    from: '/_auth/usuarios/estudiantes/$code',
  })
  const { data: student } = useSuspenseQuery({
    queryKey: [QueryKeys.users.STUDENTS, code],
    queryFn: () => StudentService.getStudentDetail(code),
  })

  const ref = useRef(null)
  return (
    <div>
      <ActionButton refSubmitButtom={ref} />
      <GeneralInfo student={student} refSubmitButtom={ref} />
    </div>
  )
}
