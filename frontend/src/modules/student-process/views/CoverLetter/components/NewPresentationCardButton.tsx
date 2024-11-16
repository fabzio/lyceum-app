import Need from '@frontend/components/Need'
import { Button } from '@frontend/components/ui/button'
import { StudentProcessPermissionsDict } from '@frontend/interfaces/enums/permissions/StudentProcess'
import { Link } from '@tanstack/react-router'

export default function NewPresentationCardButton() {
  return (
    <Need
      permissions={StudentProcessPermissionsDict.CREATE_PRESENTATION_LETTER}
    >
      <Link to="/procesos-de-estudiantes/cartas-de-presentacion/nueva-solicitud">
        <Button>Nueva solicitud</Button>
      </Link>
    </Need>
  )
}
