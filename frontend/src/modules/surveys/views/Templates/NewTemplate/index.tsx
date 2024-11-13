import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@frontend/components/ui/button'
import { Input } from '@frontend/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@frontend/components/ui/form'
import { Plus, Trash } from 'lucide-react'
import { Checkbox } from '@frontend/components/ui/checkbox'

// Definimos un esquema de Zod para validar los datos del formulario
const schema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  choices: z
    .array(
      z.object({
        label: z.string().min(1, 'La pregunta es obligatoria'),
        options: z
          .array(z.string().min(1, 'La opción no puede estar vacía'))
          .min(2, 'Debe tener al menos 2 opciones')
          .max(7, 'No puede tener más de 7 opciones'),
      })
    )
    .optional(),
  texts: z
    .array(
      z.object({
        label: z.string().min(1, 'La pregunta es obligatoria'),
        required: z.boolean().optional(),
      })
    )
    .optional(),
})

// Definimos el tipo inferido del formulario a partir del esquema
type FormData = z.infer<typeof schema>

export default function CreateTemplate() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      choices: [],
      texts: [],
    },
  })

  const {
    fields: choiceFields,
    append: appendChoice,
    remove: removeChoice,
  } = useFieldArray({ control: form.control, name: 'choices' })
  const {
    fields: textFields,
    append: appendText,
    remove: removeText,
  } = useFieldArray({ control: form.control, name: 'texts' })

  const onSubmit = (data: FormData) => {
    console.log(data)
    // Aquí irá la lógica de envío a la API cuando esté lista
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="my-6 p-4">
          <h2 className="text-2xl font-semibold mb-4">
            Crear Nueva Plantilla de Encuesta
          </h2>
          <h3 className="text-lg font-medium mt-6">Nombre de la plantilla</h3>
          {/* Campo para el nombre de la plantilla */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Ingrese el nombre de la plantilla"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Sección de preguntas de elección (Radio) */}
          <h3 className="text-lg font-medium mt-6">Preguntas de Elección</h3>
          {choiceFields.map((field, index) => (
            <FormItem key={field.id} className="relative mb-6">
              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name={`choices.${index}.label`}
                  render={({ field }) => (
                    <>
                      <FormControl>
                        <Input
                          placeholder="Ingrese la pregunta de elección"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </>
                  )}
                />
                {/* Botón de eliminar pregunta */}
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeChoice(index)}
                  className="mt-1"
                >
                  <Trash className="w-5 h-5" />
                </Button>
              </div>

              {/* Opciones de elección */}
              <div className="mt-2 ml-8">
                {form.watch(`choices.${index}.options`)?.map((_, optIndex) => (
                  <FormField
                    key={optIndex}
                    control={form.control}
                    name={`choices.${index}.options.${optIndex}`}
                    render={({ field }) => (
                      <div className="flex items-center gap-2 mb-2">
                        <FormControl>
                          <Input
                            className="w-1/2"
                            placeholder="Opción"
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          onClick={() =>
                            form.setValue(
                              `choices.${index}.options`,
                              form
                                .getValues(`choices.${index}.options`)
                                .filter((_, i) => i !== optIndex)
                            )
                          }
                          variant="ghost"
                          className="p-1"
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  />
                ))}
                {form.watch(`choices.${index}.options`)?.length < 7 && (
                  <Button
                    type="button"
                    onClick={() =>
                      form.setValue(`choices.${index}.options`, [
                        ...(form.getValues(`choices.${index}.options`) || []),
                        '',
                      ])
                    }
                    variant="outline"
                    className="mt-2"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Agregar Opción
                  </Button>
                )}
              </div>
            </FormItem>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => appendChoice({ label: '', options: [] })}
            className="mt-2"
          >
            <Plus className="mr-2 h-4 w-4" /> Agregar Pregunta de Elección
          </Button>

          {/* Sección de preguntas escritas (Input) */}
          <h3 className="text-lg font-medium mt-6">Preguntas Escritas</h3>
          {textFields.map((field, index) => (
            <FormItem key={field.id} className="relative mb-6">
              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name={`texts.${index}.label`}
                  render={({ field }) => (
                    <>
                      <FormControl>
                        <Input
                          placeholder="Ingrese la pregunta de respuesta escrita"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeText(index)}
                  className="mt-1"
                >
                  <Trash className="w-5 h-5" />
                </Button>
              </div>

              <FormField
                control={form.control}
                name={`texts.${index}.required`}
                render={({ field }) => (
                  <div className="mt-2 flex items-center gap-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FormLabel>Obligatoria</FormLabel>
                  </div>
                )}
              />
            </FormItem>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => appendText({ label: '', required: false })}
            className="mt-2"
          >
            <Plus className="mr-2 h-4 w-4" /> Agregar Pregunta Escrita
          </Button>

          {/* Botón para enviar el formulario */}
          <div className="mt-6 flex justify-end gap-4">
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
            <Button type="submit">Guardar Plantilla</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
