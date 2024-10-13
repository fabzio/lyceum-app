import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { StudyPlanCourse } from '../interfaces/StudyPlanCourse'
import { useParams } from '@tanstack/react-router'
import { Course } from '@/interfaces/models/Course'

type CycleWithCourses = {
  name: string
  courses: (Course & { type: 'Obligatorio' | 'Electivo' })[]
}

const initialCourses: Course[] = [
  {
    id: 1,
    code: '1INF27',
    name: 'Algoritmia y Estructura de Datos',
    credits: 5.0,
    speciality: 'Computer Science',
  },
  {
    id: 2,
    code: '1INF28',
    name: 'Fundamentos de Sistemas de Información',
    credits: 3.5,
    speciality: 'Information Systems',
  },
  {
    id: 3,
    code: '1INF25',
    name: 'Programación 2',
    credits: 5.0,
    speciality: 'Computer Science',
  },
  {
    id: 4,
    code: '1INF33',
    name: 'Base de Datos',
    credits: 5.0,
    speciality: 'Database Systems',
  },
  {
    id: 5,
    code: '1INF48',
    name: 'Ingeniería de Requisitos',
    credits: 5.0,
    speciality: 'Software Engineering',
  },
  {
    id: 6,
    code: '1IND90',
    name: 'Empresa y su Entorno',
    credits: 5.0,
    speciality: 'Business',
  },
  {
    id: 7,
    code: '1GES92',
    name: 'Taller de Habilidades Interpersonales',
    credits: 2.5,
    speciality: 'Soft Skills',
  },
  {
    id: 8,
    code: '1EST22',
    name: 'Probabilidad y Estadística',
    credits: 5.0,
    speciality: 'Statistics',
  },
  {
    id: 9,
    code: '1ELE01',
    name: 'Arquitectura de Computadoras',
    credits: 5.0,
    speciality: 'Computer Architecture',
  },
  {
    id: 10,
    code: '1INF29',
    name: 'Sistemas Operativos',
    credits: 5.0,
    speciality: 'Operating Systems',
  },
  {
    id: 11,
    code: '1INF30',
    name: 'Programación 3',
    credits: 5.0,
    speciality: 'Computer Science',
  },
  {
    id: 12,
    code: '1INF31',
    name: 'Arquitectura de Software',
    credits: 5.0,
    speciality: 'Software Engineering',
  },
  {
    id: 13,
    code: '1INF32',
    name: 'Algoritmos Avanzados',
    credits: 5.0,
    speciality: 'Computer Science',
  },
  {
    id: 14,
    code: '1CON27',
    name: 'Contabilidad y Finanzas',
    credits: 5.0,
    speciality: 'Finance',
  },
  {
    id: 15,
    code: '1EST14',
    name: 'Experimentación Numérica',
    credits: 5.0,
    speciality: 'Numerical Methods',
  },
  {
    id: 16,
    code: 'IND231',
    name: 'Ingeniería Económica',
    credits: 5.0,
    speciality: 'Economics',
  },
  {
    id: 17,
    code: 'INF238',
    name: 'Redes de Computadoras',
    credits: 5.0,
    speciality: 'Computer Networks',
  },
  {
    id: 18,
    code: '1INF50',
    name: 'Diseño de Software',
    credits: 5.0,
    speciality: 'Software Engineering',
  },
  {
    id: 19,
    code: '1INF24',
    name: 'Inteligencia Artificial',
    credits: 5.0,
    speciality: 'Artificial Intelligence',
  },
  {
    id: 20,
    code: '1INF34',
    name: 'Modelado y Automatización de Procesos',
    credits: 5.0,
    speciality: 'Process Automation',
  },
  {
    id: 21,
    code: '1INF35',
    name: 'Administración de Sistemas Operativos',
    credits: 5.0,
    speciality: 'System Administration',
  },
  {
    id: 22,
    code: '1INF26',
    name: 'Formulación de Proyecto de Fin de Carrera',
    credits: 5.0,
    speciality: 'Project Management',
  },
  {
    id: 23,
    code: '1INF36',
    name: 'Ética y RSU en Ingeniería Informática',
    credits: 5.0,
    speciality: 'Ethics',
  },
  {
    id: 24,
    code: '1INF37',
    name: 'Ingeniería de Software',
    credits: 5.0,
    speciality: 'Software Engineering',
  },
  {
    id: 25,
    code: '1INF38',
    name: 'Innovación y Emprendimiento con Tecnología',
    credits: 5.0,
    speciality: 'Innovation',
  },
  {
    id: 26,
    code: '1INF39',
    name: 'Gobierno y Gestión de Tecnologías de Información',
    credits: 5.0,
    speciality: 'IT Management',
  },
  {
    id: 27,
    code: '1INF40',
    name: 'Tecnologías de Información para los Negocios',
    credits: 5.0,
    speciality: 'Business IT',
  },
  {
    id: 28,
    code: '1INF41',
    name: 'Seguridad de Información',
    credits: 5.0,
    speciality: 'Information Security',
  },
]
const initialStudyPlanCourses: StudyPlanCourse[] = [
  { studyPlanId: '1', courseId: '1', level: '5to Ciclo', type: 'Obligatorio' },
  { studyPlanId: '1', courseId: '2', level: '5to Ciclo', type: 'Obligatorio' },
  { studyPlanId: '1', courseId: '3', level: '5to Ciclo', type: 'Obligatorio' },
  { studyPlanId: '1', courseId: '4', level: '5to Ciclo', type: 'Obligatorio' },
  { studyPlanId: '1', courseId: '5', level: '5to Ciclo', type: 'Obligatorio' },
  { studyPlanId: '1', courseId: '6', level: '5to Ciclo', type: 'Obligatorio' },
  { studyPlanId: '1', courseId: '7', level: '5to Ciclo', type: 'Obligatorio' },
  { studyPlanId: '1', courseId: '8', level: '6to Ciclo', type: 'Obligatorio' },
  { studyPlanId: '1', courseId: '9', level: '6to Ciclo', type: 'Obligatorio' },
  { studyPlanId: '1', courseId: '10', level: '6to Ciclo', type: 'Obligatorio' },
  { studyPlanId: '1', courseId: '11', level: '6to Ciclo', type: 'Obligatorio' },
  { studyPlanId: '1', courseId: '12', level: '6to Ciclo', type: 'Obligatorio' },
  { studyPlanId: '1', courseId: '13', level: '6to Ciclo', type: 'Obligatorio' },
  { studyPlanId: '1', courseId: '14', level: '6to Ciclo', type: 'Obligatorio' },
  { studyPlanId: '1', courseId: '15', level: '7mo Ciclo', type: 'Obligatorio' },
  { studyPlanId: '1', courseId: '16', level: '7mo Ciclo', type: 'Obligatorio' },
  { studyPlanId: '1', courseId: '17', level: '7mo Ciclo', type: 'Obligatorio' },
  { studyPlanId: '1', courseId: '18', level: '7mo Ciclo', type: 'Obligatorio' },
  { studyPlanId: '1', courseId: '19', level: '7mo Ciclo', type: 'Obligatorio' },
  { studyPlanId: '1', courseId: '20', level: '7mo Ciclo', type: 'Obligatorio' },
  { studyPlanId: '1', courseId: '21', level: '7mo Ciclo', type: 'Obligatorio' },
  { studyPlanId: '1', courseId: '22', level: '8vo Ciclo', type: 'Obligatorio' },
  { studyPlanId: '1', courseId: '23', level: '8vo Ciclo', type: 'Obligatorio' },
  { studyPlanId: '1', courseId: '24', level: '8vo Ciclo', type: 'Obligatorio' },
  { studyPlanId: '1', courseId: '25', level: '8vo Ciclo', type: 'Obligatorio' },
  { studyPlanId: '1', courseId: '26', level: '8vo Ciclo', type: 'Obligatorio' },
  { studyPlanId: '1', courseId: '27', level: '8vo Ciclo', type: 'Obligatorio' },
  { studyPlanId: '1', courseId: '28', level: '8vo Ciclo', type: 'Obligatorio' },
  { studyPlanId: '1', courseId: '25', level: '8vo Ciclo', type: 'Electivo' },
  { studyPlanId: '1', courseId: '26', level: '8vo Ciclo', type: 'Electivo' },
  { studyPlanId: '1', courseId: '27', level: '8vo Ciclo', type: 'Electivo' },
  { studyPlanId: '1', courseId: '28', level: '8vo Ciclo', type: 'Electivo' },
  { studyPlanId: '1', courseId: '26', level: '8vo Ciclo', type: 'Electivo' },
  { studyPlanId: '1', courseId: '27', level: '8vo Ciclo', type: 'Electivo' },
  { studyPlanId: '1', courseId: '28', level: '8vo Ciclo', type: 'Electivo' },
  { studyPlanId: '1', courseId: '26', level: '8vo Ciclo', type: 'Electivo' },
  { studyPlanId: '1', courseId: '27', level: '8vo Ciclo', type: 'Electivo' },
  { studyPlanId: '1', courseId: '28', level: '8vo Ciclo', type: 'Electivo' },
]

export default function StudyPlanEdit() {
  const [courses] = useState<Course[]>(initialCourses)
  const [studyPlanCourses, setStudyPlanCourses] = useState<StudyPlanCourse[]>(
    []
  )
  const [startCycle, setStartCycle] = useState('')
  const [endCycle, setEndCycle] = useState('')
  const [status, setStatus] = useState('Vigente')

  const { planId } = useParams({
    from: '/_auth/plan-de-estudios/gestion-plan/$planId',
  })

  useEffect(() => {
    // Filter study plan courses based on the provided studyPlanId
    const filteredStudyPlanCourses = initialStudyPlanCourses.filter(
      (spc) => spc.studyPlanId === planId
    )
    setStudyPlanCourses(filteredStudyPlanCourses)
  }, [planId])

  const cyclesWithCourses: CycleWithCourses[] = studyPlanCourses.reduce(
    (acc, spc) => {
      const course = courses.find((c) => c.id === +spc.courseId)
      if (!course) return acc

      const cycleIndex = acc.findIndex((cycle) => cycle.name === spc.level)
      if (cycleIndex === -1) {
        acc.push({
          name: spc.level,
          courses: [{ ...course, type: spc.type }],
        })
      } else {
        acc[cycleIndex].courses.push({ ...course, type: spc.type })
      }
      return acc
    },
    [] as CycleWithCourses[]
  )

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Plan de estudios</h1>
      <h2 className="text-xl mb-6">Especialidad de Ingeniería Informática</h2>

      <div className="flex items-end justify-between mb-6 gap-4">
        <div className="flex items-end gap-4 flex-grow">
          <div className="flex-grow">
            <p className="font-semibold mb-2">Vigencia</p>
            <div className="flex gap-2">
              <Input
                placeholder="Ciclo de Inicio"
                value={startCycle}
                onChange={(e) => setStartCycle(e.target.value)}
                className="w-48"
              />
              <br></br>
              <Input
                placeholder="Ciclo de Fin / Ahora"
                value={endCycle}
                onChange={(e) => setEndCycle(e.target.value)}
                className="w-48"
              />
            </div>
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Vigente">Vigente</SelectItem>
              <SelectItem value="No Vigente">No Vigente</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="default" className="hover:bg-gray-800">
          Nuevo Plan de Estudios
        </Button>
      </div>

      <Tabs defaultValue="Obligatorios">
        <TabsList className="mb-4">
          <TabsTrigger value="Obligatorios">Obligatorios</TabsTrigger>
          <TabsTrigger value="Electivos">Electivos</TabsTrigger>
        </TabsList>
        <TabsContent value="Obligatorios">
          <div className="space-y-8">
            {cyclesWithCourses.map((cycle, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center p-2 gap-2">
                  <h3 className="text-lg font-semibold mb-4">{cycle.name}</h3>
                  <br></br>
                  <Button variant="default" className="hover:bg-gray-800 mb-3">
                    Agregar Curso
                  </Button>
                </div>
                <div className="overflow-x-auto pb-4">
                  <div
                    className="flex space-x-4"
                    style={{ minWidth: 'max-content' }}
                  >
                    {cycle.courses
                      .filter((course) => course.type === 'Obligatorio')
                      .map((course, courseIndex) => (
                        <div
                          key={courseIndex}
                          className="bg-gray-200 p-4 rounded-lg w-48 h-48 flex flex-col justify-between flex-shrink-0"
                        >
                          <div>
                            <h4 className="text-black font-semibold mb-2 text-sm">
                              {course.name}
                            </h4>
                            <p className="text-xs text-gray-600">
                              {course.code}
                            </p>
                          </div>
                          <p className="text-xs text-gray-600 mt-2">
                            {course.credits.toFixed(2)} créditos
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="Electivos">
          <div className="border rounded-lg p-4">
            <div className="flex items-center p-2 gap-2">
              <h3 className="text-lg font-semibold mb-4">Cursos Electivos</h3>
              <br></br>
              <Button variant="default" className="hover:bg-gray-800 mb-3">
                Agregar Curso
              </Button>
            </div>
            <div className="overflow-y-auto max-h-[600px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {cyclesWithCourses.flatMap((cycle) =>
                  cycle.courses
                    .filter((course) => course.type === 'Electivo')
                    .map((course, courseIndex) => (
                      <div
                        key={`${cycle.name}-${courseIndex}`}
                        className="bg-gray-200 p-4  rounded-lg flex flex-col justify-between h-48"
                      >
                        <div>
                          <h4 className="text-black font-semibold mb-2 text-sm">
                            {course.name}
                          </h4>
                          <p className="text-xs text-gray-600">{course.code}</p>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                          {course.credits.toFixed(2)} créditos
                        </p>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
