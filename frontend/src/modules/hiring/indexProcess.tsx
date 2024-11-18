import PageLayout from '@frontend/layouts/PageLayout'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@frontend/components/ui/tabs'
import FirstFilterTable from './views/TeacherSelection/HiringProcess/FirstFilterTable'

interface HiringProcessProps {
  courseName?: string
}

export default function HiringProcess({ courseName }: HiringProcessProps) {
  const tabItems = [
    { value: 'primera-etapa', label: 'Primera Etapa' },
    { value: 'segunda-etapa', label: 'Segunda Etapa' },
    { value: 'seleccionados', label: 'Seleccionados' },
  ]

  return (
    <PageLayout name="Proceso de Contratación">
      <h1 className="ml-6 mb-4 text-xl font-bold">
        {(courseName || '').replace(/\+/g, ' ')}
      </h1>
      <div className="ml-5">
        <Tabs defaultValue="primera-etapa" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 max-w-[600px]">
            {tabItems.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:bg-muted/50 data-[state=active]:text-foreground"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="primera-etapa">
            <FirstFilterTable step="first" courseName={courseName} />
          </TabsContent>

          <TabsContent value="segunda-etapa">
            <FirstFilterTable step="second" courseName={courseName} />
          </TabsContent>

          <TabsContent value="seleccionados">
            <FirstFilterTable step="selected" courseName={courseName} />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
