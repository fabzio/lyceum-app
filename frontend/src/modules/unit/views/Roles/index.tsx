import { Separator } from '@frontend/components/ui/separator'
import ManageRoles from './ManageRoles'
import { useState } from 'react'
import AsingRoles from './AsingRoles'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@frontend/components/ui/tabs'

const options = [
  {
    label: 'Gestionar roles',
    value: 'manage',
    component: () => <ManageRoles />,
  },
  {
    label: 'Asignar roles',
    value: 'assing',
    component: () => <AsingRoles />,
  },
]
export default function Roles() {
  const [activeOption, setActiveOption] = useState(options[0].value)
  return (
    <div>
      <Tabs
        className="flex"
        orientation="vertical"
        value={activeOption}
        onValueChange={(t) => setActiveOption(t)}
      >
        <TabsList className="grid grid-rows-2 h-full">
          {options.map((option) => (
            <TabsTrigger
              className="row-span-1"
              value={option.value}
              key={option.value}
            >
              {option.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <Separator orientation="vertical" />
        {options.map((option) => (
          <TabsContent value={option.value} key={option.value}>
            {option.component()}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
