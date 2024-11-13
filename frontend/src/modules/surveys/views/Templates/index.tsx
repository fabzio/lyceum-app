import { Button } from '@frontend/components/ui/button'
import { useNavigate } from '@tanstack/react-router'

export default function SurveyTemplates() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col my-6 p-2">
      <div className="w-full flex flex-col md:flex-row justify-between gap-2">
        <div className="flex gap-2">
          <Button
            onClick={() => navigate({ to: '/encuestas/plantillas/nuevo' })}
          >
            Crear nueva plantilla
          </Button>
        </div>
      </div>
      <div>
        <p>Acá se listan las plantillas existentes</p>
      </div>
    </div>
  )
}
