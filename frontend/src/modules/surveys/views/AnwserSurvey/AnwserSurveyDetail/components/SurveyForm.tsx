import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@frontend/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Textarea } from '@frontend/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@frontend/components/ui/radio-group'
import { Button } from '@frontend/components/ui/button'
import { Question } from '@frontend/modules/surveys/interfaces/SuerveyQuestions'
import { useMutation } from '@tanstack/react-query'
import AnwserSurveyService from '@frontend/modules/surveys/services/AnswerSurvey.service'
import { useSessionStore } from '@frontend/store'
import { Loader2 } from 'lucide-react'

interface Props {
  questions: Question[]
}
export default function SurveyForm({ questions }: Props) {
  const { session } = useSessionStore()
  const { mutate, isPending } = useMutation({
    mutationFn: AnwserSurveyService.insertAnswers,
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questions,
    },
  })
  const { fields: questionsFields } = useFieldArray({
    control: form.control,
    name: 'questions',
  })
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate({
      ...data,
      evaluatorAccountId: session!.id,
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full md:w-2/3 flex flex-col justify-center px-3"
      >
        {questionsFields.map((qField, i) => (
          <FormField
            key={qField.id}
            control={form.control}
            name={`questions.${i}.answer`}
            render={({ field }) => (
              <>
                {qField.type === 'text' ? (
                  <FormItem>
                    <FormLabel>{qField.questionText}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ingrese su respuesta"
                        className="resize-none"
                        value={field.value as string}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                ) : qField.type === 'multiple' ? (
                  <FormItem className="space-y-3">
                    <FormLabel>{qField.questionText}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value as string}
                        className="flex flex-col space-y-1"
                      >
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FormItem
                            key={i}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={(i + 1).toString()} />
                            </FormControl>
                            <FormLabel>{i + 1}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                ) : qField.type === 'boolean' ? (
                  <FormItem>
                    <FormLabel>{qField.questionText}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value as string}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="true" />
                          </FormControl>
                          <FormLabel>Si</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="false" />
                          </FormControl>
                          <FormLabel>No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                ) : null}
              </>
            )}
          />
        ))}
        <div className="mt-2 flex justify-end gap-2">
          <Button type="button" variant="secondary" disabled={isPending}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : 'Enviar'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

const formSchema = z.object({
  questions: z.array(
    z.object({
      id: z.number(),
      questionText: z.string(),
      type: z.union([
        z.literal('text'),
        z.literal('multiple'),
        z.literal('boolean'),
      ]),
      answer: z.union([
        z
          .string({
            required_error: 'Debes responder la pregunta',
          })
          .min(1),
        z.boolean({
          required_error: 'Debes responder la pregunta',
        }),
      ]),
    })
  ),
})

export type SurveyFormValues = z.infer<typeof formSchema>
