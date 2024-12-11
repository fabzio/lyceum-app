import { useState, useEffect } from 'react'
import PageLayout from '@frontend/layouts/PageLayout'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@frontend/components/ui/tabs'
import FirstFilterTable from './FirstFilterTable'
import { useSearch } from '@tanstack/react-router'
import { useSessionStore } from '@frontend/store'
import { HiringPermissionsDict } from '@frontend/interfaces/enums/permissions/Hiring'
import { Loader2 } from 'lucide-react'

export default function HiringProcess() {
  const { courseName } = useSearch({
    from: '/_auth/contrataciones/seleccion-docentes/$hiringId',
  })

  const { havePermission } = useSessionStore()
  const [activeTab, setActiveTab] = useState<string>('primera-etapa')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500) // Adjust this value to match your actual data loading time

    return () => clearTimeout(timer)
  }, [activeTab])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <PageLayout name="Proceso de Contratación">
      <h1 className="ml-6 mb-4 text-xl font-bold">{courseName}</h1>
      <div className="ml-5 relative">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList>
            {havePermission(
              HiringPermissionsDict.VIEW_ALL_CANDIDATES_PHASE_1
            ) && <TabsTrigger value="primera-etapa">Primera Etapa</TabsTrigger>}
            {havePermission(
              HiringPermissionsDict.VIEW_ALL_CANDIDATES_PHASE_2
            ) && <TabsTrigger value="segunda-etapa">Segunda Etapa</TabsTrigger>}
            <TabsTrigger value="seleccionados">Seleccionados</TabsTrigger>
          </TabsList>

          {havePermission(
            HiringPermissionsDict.VIEW_ALL_CANDIDATES_PHASE_1
          ) && (
            <TabsContent value="primera-etapa">
              <FirstFilterTable step="first" courseName={courseName} />
            </TabsContent>
          )}

          {havePermission(
            HiringPermissionsDict.VIEW_ALL_CANDIDATES_PHASE_2
          ) && (
            <TabsContent value="segunda-etapa">
              <FirstFilterTable step="second" courseName={courseName} />
            </TabsContent>
          )}

          <TabsContent value="seleccionados">
            <FirstFilterTable step="selected" courseName={courseName} />
          </TabsContent>
        </Tabs>

        {isLoading && (
          <div className="absolute inset-0 bg-background/80 dark:bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
      </div>
    </PageLayout>
  )
}
