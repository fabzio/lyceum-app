import { Input } from '@/components/ui/input'
import ThesisThemeSelectFilter from './ThesisThemeRequestFilter'
import ThesisThemeElement from './ThesisThemeRequestElement'

export default function ThesisTheme() {
  return (
    <div className="flex flex-col my-6 p-2">
      <div className="w-full flex flex-col md:flex-row justify-between gap-2">
        <div className="md:flex-grow">
          <Input type="search" placeholder="🔎 Buscar" />
        </div>
        <div className="flex gap-3">
          <ThesisThemeSelectFilter />
        </div>
      </div>
      <div>
        <ThesisThemeElement
          id="39457392"
          title="Desarrollo de un Sistema de Gestión de Proyectos Basado en Metodologías Ágiles para Mejorar la Productividad en Equipos de Trabajo Remotos"
          owner="Sebastián Meléndez"
          date="22/09/2024"
          status="Aprobado por coordinador de área"
        />

        <ThesisThemeElement
          id="39457393"
          title="Estudio de las soluciones actuales para la escalabilidad en redes blockchain, como la fragmentación (sharding) y las cadenas laterales (sidechains), y su efectividad en diferentes escenarios."
          owner="Piero Esparza"
          date="22/09/2024"
          status="Aprobado por coordinador de área"
        />
      </div>
    </div>
  )
}

/*const assigments: Assigment[] = [
  {
    user: 'Fabrizio',
    roles: [
      {
        key: 'Admin',
        value: 'PUCP',
      },
    ],
  },
  {
    user: 'Ricardo',
    roles: [
      {
        key: 'Director de carrera',
        value: 'Ingeniería de Software',
      },
      {
        key: 'Admin',
        value: 'PUCP',
      },
    ],
  },
]*/
