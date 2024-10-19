import { Outlet, useLocation } from '@tanstack/react-router'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ValidRoutes } from '@/constants/paths'
import { useTabs } from '@/hooks/useTabs'

export default function StudentProcessManagement() {
  const { pathname } = useLocation()
  const { activeTab, handleChangeTab } = useTabs(pathname as ValidRoutes)

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={handleChangeTab}>
        <TabsList className="grid grid-cols-1 md:grid-cols-3 h-full md:w-full">
          {tabs.map((tab) => (
            <TabsTrigger value={tab.path} key={tab.path}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <section className="mt-2">
          <Outlet />
        </section>
      </Tabs>
    </div>
  )
}

type Tab = {
  path: ValidRoutes
  label: string
}

const tabs: Tab[] = [
  {
    path: '/cursos',
    label: 'Cartas de Presentación',
  },
  {
    path: '/cursos/alumnos-riesgo',
    label: 'Alumnos en Riesgo',
  },
  {
    path: '/cursos/retiro-alumnos',
    label: 'Retiro de Alumnos',
  },
]
