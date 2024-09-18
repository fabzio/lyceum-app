import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ValidRoutes } from '@/constants/paths'

import {
  Outlet,
  useNavigate,
  useParams,
} from '@tanstack/react-router'
import { useEffect, useState } from 'react'

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
    from: '/unidad/$name',
  })
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState(tabs[0].path)

  const handleChange = (value: string) => {
    const route = value as ValidRoutes
    setActiveTab(route)
    navigate({
      to: route,
    })
  }
  useEffect(() => {
    setActiveTab(tabs[0].path)
  }, [name])

  return (
    <div>
      <Tabs className="w-[700]" value={activeTab} onValueChange={handleChange}>
        <TabsList className="grid grid-cols-4 w-full">
          {tabs.map((tab) => (
            <TabsTrigger value={tab.path} key={tab.path}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <main className="mt-2">
          <Outlet />
        </main>
      </Tabs>
    </div>
  )
}
