import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,

} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { SquareMinus, Plus, SearchIcon } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Mail } from './data'
import { useEffect } from 'react'

const schema = z.object({
  alumnos: z.array(z.object({
    code: z.string().min(1, 'Por favor, indicar código'),
    name: z.string().min(1, 'Por favor, indicar nombre'),
  })),
  carrera: z.string(),
  title: z.string(),
  area: z.string(),
  asesorCodigo: z.string().optional(),
  asesores: z.array(z.object({
    code: z.string(),
    name: z.string(),
  })),
  jurado: z.array(z.object({
    code: z.string(),
    name: z.string(),
  })),
})

export default function ThesisJuryRequestForm({mail}:{mail: Mail}) {
  const thesis = mail.thesis
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      alumnos: [{ code: '',name: ''}],
      carrera: '',
      title: '',
      area: '',
      asesores: [{ code: '',name:''}],
      jurado: [{ code: '',name:''}],
    },
  })

  const { fields: studentFields, replace: replaceStudents } = useFieldArray({
    control: form.control,
    name: "alumnos",
  });

  const { fields: advisorFields, replace: replaceAdvisors } = useFieldArray({
    control: form.control,
    name: "asesores",
  });

  const { fields: juryFields, append: appendTeacher, remove: removeTeacher, replace: replaceJury } = useFieldArray({
    control: form.control,
    name: "jurado",
  });

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values)
  }

  const traerTesis = () => {
    console.log('hola')
  }
  useEffect(() => {
  replaceStudents(mail.thesis.students)
  replaceAdvisors(thesis.advisors)
  replaceJury(mail.jury)
  form.setValue('alumnos', mail.thesis.students)
  form.setValue('carrera', "INFORMATICA")
  form.setValue('title', mail.thesis.title)
  form.setValue('area', mail.thesis.area)
  }, [mail])
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            {/* <h2 className="bg-red-50">{JSON.stringify(mail)}</h2> */}
            <h4 className="text-xl font-bold">Información de tema de tesis</h4>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="self-stretch">
              <div className="space-y-2">
                <FormLabel>Alumno(s)</FormLabel>
                {studentFields.map((studentField, index) => (
                  <div key={studentField.id} className="flex space-x-2" >
                    <FormField
                      control={form.control}
                      name={`alumnos.${index}.code`}
                      render={({ field }) => (
                        <>
                        <FormLabel>
                          <Button variant={'outline'} formNoValidate onClick={traerTesis}>
                            <SearchIcon className="h-4 w-4" />
                          </Button>
                        </FormLabel>
                        <FormItem className='w-28'>
                          <FormControl>
                            <Input placeholder="Código" maxLength={8}  {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        </>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`alumnos.${index}.name`}
                      render={({ field }) => (
                        <FormItem className='grow'>
                          <FormControl>
                            <Input
                              placeholder="Nombre del estudiante"
                              disabled
                              maxLength={8}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>

            </div>
            <div className="self-stretch">
              <div className="space-y-2 col-span-2" >
                <FormLabel>Título</FormLabel>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea className='grow overflow-y-auto resize-none' disabled placeholder="Título del trabajo de tésis" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className='self-stretch flex gap-x-2'>
            <div className="grow space-y-2">
                <FormLabel>Área</FormLabel>
                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input disabled placeholder="Área del tema" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grow space-y-2">
                <FormLabel>Carrera</FormLabel>
                <FormField
                  control={form.control}
                  name="carrera"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled
                          placeholder="Carrera del/los alumno(s)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              </div>
            <div className="space-y-2">
              <FormLabel>Asesor</FormLabel>
              {advisorFields.map((advisorField, index) => (
                <div key={advisorField.id} className="flex gap-x-2 gap-y-2">
                  <FormField
                    control={form.control}
                    name={`asesores.${index}.code`}
                    render={({ field }) => (
                      <FormItem className='shrink-0 w-28'>
                        <FormControl>
                          <Input placeholder="Código" maxLength={8} className="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`asesores.${index}.name`}
                    render={({ field }) => (
                      <FormItem className='grow'>
                        <FormControl>
                          <Input
                            className='min-w-10 flex-grow'
                            placeholder="Nombre del asesor"
                            disabled
                            maxLength={8}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>              
            <div className="self-stretch flex">
                <Button type="submit" className='self-stretch grow'>Enviar solicitud de jurado de tesis</Button>
              </div>
          </CardContent>
        </Card>
        <br></br>
        
        <Card>
          <CardHeader>
            <h4 className="text-xl font-bold">
              Jurado propuesto
            </h4>
          </CardHeader>
          <CardContent className="gap-y-2">
            <div className="flex flex-col items-start gap-y-2">
              <FormLabel>Profesores</FormLabel>
              {juryFields.map((juryField, index) => (
                <div key={juryField.id} className="self-stretch flex gap-x-2 gap-y-2">
                  <FormField
                    control={form.control}
                    name={`jurado.${index}.code`}
                    render={({ field }) => (
                      <FormItem className='shrink-0 w-28'>
                        <FormControl>
                          <Input placeholder="Código" maxLength={8} className='grow' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className=' grow flex items-center gap-x-2'>
                  <FormField
                    control={form.control}
                    name={`jurado.${index}.name`}
                    render={({ field }) => (
                      <FormItem className='grow'>
                        <FormControl>
                          <Input
                            className='grow'
                            placeholder="Nombre del jurado"
                            disabled
                            maxLength={8}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                  key={index}
                  type="button"
                  onClick={() => removeTeacher(index)}
                  disabled={juryFields.length === 1}
                  variant="ghost"
                  size='icon'
                  className="h-5 w-5"
                >
                  <SquareMinus className="h-5 w-5 text-gray-500" />
                </Button>
                  </div>

                </div>
              ))}
              <Button
                type="button"
                onClick={() => appendTeacher({ code: '', name:''})}
                disabled={juryFields.length >= 3}
                variant="ghost"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Añadir Juez
              </Button>
              <div className="self-stretch flex">
                <Button type="submit" className='grow'>Proponer jurado</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}