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

export default function HiringProcess() {
  const { courseName } = useSearch({
    from: '/_auth/contrataciones/seleccion-docentes/$hiringId',
  })

  const { havePermission } = useSessionStore()

  return (
    <PageLayout name="Proceso de Contratación">
      <h1 className="ml-6 mb-4 text-xl font-bold">{courseName}</h1>
      <div className="ml-5">
        <Tabs defaultValue="primera-etapa" className="w-full">
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
      </div>
    </PageLayout>
  )
}
