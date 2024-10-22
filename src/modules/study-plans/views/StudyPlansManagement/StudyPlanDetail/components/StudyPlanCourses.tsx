import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useDroppable } from '@dnd-kit/core'

export default function StudyPlanCourses() {
  const { setNodeRef } = useDroppable({
    id: 'study-plan-courses',
  })
  return (
    <Tabs defaultValue="1">
      <TabsList className="mb-4">
        <TabsTrigger value="1">Obligatorios</TabsTrigger>
        <TabsTrigger value="0">Electivos</TabsTrigger>
      </TabsList>
      <TabsContent value="1">
        <div
          ref={setNodeRef}
          className="h-32 w-46 outline outline-red-400"
        ></div>
      </TabsContent>
      <TabsContent value="0">
        <div className="border rounded-lg p-4">
          <div className="flex items-center p-2 gap-2">
            <h3 className="text-lg font-semibold mb-4">Cursos Electivos</h3>
            <br></br>
            <Button variant="default" className="mb-3">
              Agregar Curso
            </Button>
          </div>
          <div className="overflow-y-auto max-h-[600px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"></div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
