import { Input } from '@frontend/components/ui/input'
import { useFilters } from '@frontend/hooks/useFilters'
import { EnrollmentPermissionsDict } from '@frontend/interfaces/enums/permissions/Enrollment'
import { useSessionStore } from '@frontend/store'
import debounce from 'debounce'

export default function SearchEnrollmentInput() {
  const { setFilters } = useFilters('/_auth/matricula/modificacion-matricula')
  const { havePermission } = useSessionStore()

  const hasReviewAdditionalEnrollmentPermission = havePermission(
    EnrollmentPermissionsDict.REVIEW_ADDITIONAL_ENROLLMENT
  )

  const placeholderText = hasReviewAdditionalEnrollmentPermission
    ? '🔎 Buscar matrícula por alumno o curso'
    : '🔎 Buscar matrícula por curso'

  const onChangeFilter = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ q: e.target.value }) // Se actualiza el filtro de búsqueda
  }, 300)

  return (
    <Input
      type="search"
      placeholder={placeholderText}
      className="w-full md:w-2/4"
      onChange={onChangeFilter}
    />
  )
}
