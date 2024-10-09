import { useState } from 'react'
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

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { SquareMinus } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ThesisJuryRequest } from './data'

const schema = z.object({
  alumno: z.string().min(1, 'Por favor, indicar alumno'),
  student2: z.string().min(1, 'Student name is required'),
  carrera: z.string().min(1, 'Por favor, indicar la carrera'),
  title: z.string().min(1, 'Thesis title is required'),
  area: z.string().min(1, 'Concentration area is required'),
  advisorCode: z.string().optional(),
  advisorName: z.string().optional(),
})

export default function ThesisJuryRequestForm({mail}: {mail: ThesisJuryRequest}) {
  

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {},
  })

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <br></br>
        <Card>
          <CardHeader>
            <h2 className='bg-red-50'>Prueba {mail.id}</h2>
            <h3 className="text-3xl font-bold">Información de tema de tesis</h3>
            <h4 className="text-xl text-gray-400">
              Se cargará el tema de tesis asociado
            </h4>
            <br></br>
          </CardHeader>
          <CardContent className="form-grid gap-10">
            <div className="grid grid-cols-2 gap-10 ">
              <div className="flex flex-col">
                <FormLabel className="mb-2">Alumno(s)</FormLabel>
                <DynamicForm />
                <br></br>
              </div>
              <div className="flex flex-col">
                <FormLabel className="mb-2">Carrera</FormLabel>
                <FormField
                  control={form.control}
                  name="carrera"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
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
            <br></br>
            <div className="grid grid-cols-2 gap-10">
              <div className="flex flex-col">
                <FormLabel className="mb-2">Título</FormLabel>
                <Textarea placeholder="Título del trabajo de tésis"></Textarea>
              </div>
              <div className="flex flex-col">
                <FormLabel className="mb-2">Área</FormLabel>
                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Área del tema" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <br></br>
            <div className="grid grid-cols-2 gap-10 ">
              <div>
                <FormLabel className="mb-2">Asesor</FormLabel>
                <div
                  style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}
                >
                  <Input
                    placeholder="Código"
                    maxLength={8}
                    style={{ width: '85px' }}
                  />
                  <FormField
                    name="asesor"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input disabled placeholder="Nombre" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <div className="flex justify-end mt-4">
            <Button type="submit">Enviar solicitud</Button>
          </div>
        </Card>
      </form>
    </Form>
  )
}

export function DynamicForm() {
  const { control } = useForm()
  const [fields, setFields] = useState<string[]>([''])
  const maxFields = 5

  const handleAddField = () => {
    if (fields.length < maxFields) {
      setFields([...fields, ''])
    }
  }

  const handleRemoveField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index)
    setFields(newFields)
  }

  const handleInputChange = (index: number, value: string) => {
    const newFields = fields.map((field, i) => (i === index ? value : field))
    setFields(newFields)
  }

  return (
    <div>
      {fields.map((_, index) => (
        <div
          key={index}
          style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}
        >
          <Input
            placeholder="Código"
            maxLength={8}
            style={{ width: '85px' }}
            value={fields[index]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          <FormField
            control={control}
            name={`alumno-${index}`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input disabled placeholder="Nombre de Alumno" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            onClick={() => handleRemoveField(index)}
            disabled={fields.length === 1}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              margin: 0,
            }}
          >
            <SquareMinus color="grey" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={handleAddField}
        disabled={fields.length >= maxFields}
      >
        Añadir Alumno
      </Button>
    </div>
  )
}
