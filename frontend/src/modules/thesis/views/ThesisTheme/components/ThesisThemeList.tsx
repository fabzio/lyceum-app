import { ThesisThemeRequest } from '@/modules/thesis/interfaces/ThesisThemeRequest'
import ThesisThemeElement from './ThesisThemeRequestElement'

interface Props {
  thesisThemeRequests?: ThesisThemeRequest[]
}
export default function ThesisThemeList({ thesisThemeRequests = [] }: Props) {
  if (thesisThemeRequests.length === 0)
    return (
      <p className="text-center py-3">
        No se encontraron solicitudes de temas de tesis
      </p>
    )
  return (
    <div>
      {thesisThemeRequests?.map((thesisThemeRequest) => (
        <ThesisThemeElement
          key={thesisThemeRequest.code}
          {...thesisThemeRequest}
        />
      ))}
    </div>
  )
}
