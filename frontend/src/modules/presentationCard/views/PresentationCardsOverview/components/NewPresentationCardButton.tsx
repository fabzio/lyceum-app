import Need from '@frontend/components/Need'
import { Button } from '@frontend/components/ui/button'
import { ThesisPermissionsDict } from '@frontend/interfaces/enums/permissions/Thesis'
import { Link } from '@tanstack/react-router'

export default function NewPresentationCardButton() {
  return (
    //LETTER: Actualizar permisos
    <Need permissions={ThesisPermissionsDict.CREATE_THESIS}>
      <Link to="/carta-de-presentacion/nueva-solicitud">
        <Button>Nueva solicitud</Button>
      </Link>
    </Need>
  )
}
