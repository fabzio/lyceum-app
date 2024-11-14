import { Button } from '@frontend/components/ui/button'
import { BaseRoles } from '@frontend/interfaces/enums/BaseRoles'
import { Link } from '@tanstack/react-router'

interface Props {
  surveyId: number
  scheduleId: number
  account: {
    id: string
    name: string
    roleId: number
  }
}

export default function AccountSurvey({
  account,
  scheduleId,
  surveyId,
}: Props) {
  return (
    <div className="ml-8 w-2/5 flex items-center gap-5 justify-between">
      <div>
        <h4 className="font-semibold">{account.name}</h4>
        <p>
          {account.roleId === BaseRoles.TEACHER
            ? 'Docente'
            : 'Jefe de practica'}
        </p>
      </div>
      <Link
        to="/encuestas/listado/responder"
        search={{
          subjetAccountId: account.id,
          surveyId,
          scheduleId,
        }}
      >
        <Button variant="outline">Responder</Button>
      </Link>
    </div>
  )
}
