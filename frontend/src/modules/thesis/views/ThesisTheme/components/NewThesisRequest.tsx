import Need from '@frontend/components/Need'
import { Button } from '@frontend/components/ui/button'
import { ThesisPermissionsDict } from '@frontend/interfaces/enums/permissions/Thesis'
import { Link } from '@tanstack/react-router'

export default function NewThesisRequest() {
  return (
    <Need permissions={ThesisPermissionsDict.CREATE_THESIS}>
      <Link to="/tesis/nueva-solicitud">
        <Button>Nueva solicitud</Button>
      </Link>
    </Need>
  )
}
