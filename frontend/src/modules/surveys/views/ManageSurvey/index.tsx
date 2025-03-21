import { Button } from '@frontend/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import SurveyTable from './components/SurveyTable'
import Need from '@frontend/components/Need'

export default function ManageSurvey() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col my-6 p-2">
      <div className="w-full flex flex-col md:flex-row justify-end gap-2">
        <div className="flex gap-2">
          <Need permissions={['CREATE_SURVEY']}>
            <Button
              onClick={() => navigate({ to: '/encuestas/gestionar/nuevo' })}
            >
              Crear nueva encuesta
            </Button>
          </Need>
        </div>
      </div>
      <div>
        <SurveyTable />
      </div>
    </div>
  )
}
