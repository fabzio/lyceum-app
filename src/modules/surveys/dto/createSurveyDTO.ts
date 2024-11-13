import { z } from 'zod'

export const createSurveyDTO = z.object({
  name: z.string().min(1, 'Survey name is required'), // Nombre de la encuesta
  questions: z
    .array(
      z.object({
        questionText: z.string().min(1, 'Question text is required'), // Texto de la pregunta
        type: z.enum(['singleChoice', 'multipleChoice']), // Tipo de pregunta
        options: z
          .array(z.string().min(1, 'Option cannot be empty'))
          .optional(), // Opciones para las preguntas (si las hay)
      })
    )
    .min(1, 'At least one question is required'), // Al menos una pregunta
})
