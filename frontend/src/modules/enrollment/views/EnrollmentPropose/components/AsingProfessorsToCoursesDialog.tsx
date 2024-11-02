import { Button } from '@frontend/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@frontend/components/ui/dialog'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@frontend/components/ui/form'
import { Input } from '@frontend/components/ui/input'
import { useState } from 'react'
import { z } from 'zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'

// Mock de datos para profesores
const mockProfessors = [
  { code: '19987080', name: 'Rony Cueva Moscoso' },
  { code: '19962356', name: 'Manuel Tupia Anticona' },
  { code: '19703421', name: 'Miguel Guanira Erazo' },
  { code: '20035698', name: 'Freddy Paz Espinoza' },
]

export default function AsingProfessorsToCoursesDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [notFound, setNotFound] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'professors',
  })

  // Filtrar profesores basados en el término de búsqueda
  const filteredProfessors =
    searchTerm.length >= 1
      ? mockProfessors.filter(
          (prof) =>
            prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prof.code.includes(searchTerm)
        )
      : []

  // Manejar búsqueda no exitosa
  const handleSearchChange = (e: any) => {
    const value = e.target.value
    setSearchTerm(value)
    // Mostrar "Profesor no encontrado" solo si hay al menos 3 caracteres y no hay coincidencias en la búsqueda
    setNotFound(value.length >= 2 && filteredProfessors.length === 0)
  }

  // Obtener el nombre de un profesor con base en el código
  const getProfessorName = (code: string) => {
    const professor = mockProfessors.find((prof) => prof.code === code)
    return professor ? professor.name : 'Profesor no encontrado'
  }

  // Agregar profesor a la lista seleccionada
  const handleSelectProfessor = (professor: any) => {
    const isAlreadySelected = fields.some(
      (field) => field.code === professor.code
    )
    if (!isAlreadySelected) {
      append({ code: professor.code })
    }
  }

  const onSubmit = ({}: z.infer<typeof formSchema>) => {
    //Aqui se deberia guardar la asignación de profesores
    // Cerrar el diálogo al guardar
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Asignar Docentes</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Asignar Docentes</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
            // Prevenir que el diálogo se cierre con Enter
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
              }
            }}
          >
            <div className="mb-4">
              <Input
                placeholder="Buscar profesor por nombre o código"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {/* Mostrar mensaje de no encontrado solo si hay 3 o más caracteres en la búsqueda */}
              {notFound && (
                <p className="text-red-600 mt-2">Profesor no encontrado</p>
              )}
            </div>

            <ul>
              {filteredProfessors.map((prof, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-2 cursor-pointer"
                  onClick={() => handleSelectProfessor(prof)}
                >
                  <span>{prof.name}</span>
                  <span>{prof.code}</span>
                </li>
              ))}
            </ul>

            <FormField
              name="professors"
              //@ts-ignore
              render={({ field, fieldState }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>Profesores Seleccionados</FormLabel>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {fields.map((field, index) => (
                      <li key={field.id} className="flex gap-1 items-center">
                        <Input
                          {...form.register(`professors.${index}.code`)}
                          placeholder="Código"
                          readOnly
                          className="w-1/3"
                        />
                        <Input
                          value={getProfessorName(
                            form.watch(`professors.${index}.code`)
                          )}
                          readOnly
                          placeholder="Nombre del profesor"
                          className="w-2/3"
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => remove(index)}
                        >
                          <X />
                        </Button>
                      </li>
                    ))}
                  </ul>
                  {/* Verifica si hay un error de validación y muestra un mensaje adecuado */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 mt-4">
              <Button type="submit">Guardar</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

// Schema de validación de formulario
const formSchema = z.object({
  professors: z
    .array(
      z.object({
        code: z.string().regex(/^[0-9]{8}$/),
      })
    )
    .nonempty('Debe ingresar al menos un profesor'),
})
