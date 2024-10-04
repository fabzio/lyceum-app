import { Outlet, useLocation } from '@tanstack/react-router'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ValidRoutes } from '@/constants/paths'
import { useTabs } from '@/hooks/useTabs'

export default function TesisManagement() {
  const { pathname } = useLocation()
  console.log("pathname:", pathname)
  const { activeTab, handleChangeTab } = useTabs(pathname as ValidRoutes)

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={handleChangeTab}>
        <TabsList className="grid grid-cols-1 md:grid-cols-2 h-full md:w-full">
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
    path: '/tesis',
    label: 'Tema de tesis',
  },
  {
    path: '/tesis/prop-jurados',
    label: 'Jurado de tesis',
  }
]
