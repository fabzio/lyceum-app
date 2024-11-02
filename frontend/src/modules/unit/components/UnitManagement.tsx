import { Tabs, TabsList, TabsTrigger } from '@frontend/components/ui/tabs'
import { ValidRoutes } from '@frontend/constants/paths'
import { useTabs } from '@frontend/hooks/useTabs'

import { Outlet, useParams } from '@tanstack/react-router'
import { useEffect } from 'react'

type Tab = {
  path: ValidRoutes
  label: string
}

// this results in for examples/react/kitchen-sink/src/main.ts
const tabs: Tab[] = [
  {
    path: '/unidad/$name/',
    label: 'General',
  },
  {
    path: '/unidad/$name/subunidades',
    label: 'Subunidades',
  },
  {
    path: '/unidad/$name/roles',
    label: 'Roles',
  },
  {
    path: '/unidad/$name/usuarios',
    label: 'Usuarios',
  },
]
export default function UnitManagement() {
  const { name } = useParams({
    from: '/_auth/unidad/$name',
  })
  const { activeTab, handleChangeTab } = useTabs(tabs[0].path)
  useEffect(() => {
    handleChangeTab(tabs[0].path)
  }, [name])

  return (
    <div>
      <Tabs
        className="w-[700]"
        value={activeTab}
        onValueChange={handleChangeTab}
      >
        <TabsList className="grid grid-cols-4 w-full">
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
