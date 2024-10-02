import { FAQ } from '../interfaces/asks'

class FAQService {
  public static getFAQs(): FAQ[] {
    return [
      {
        id: 1,
        question: '¿Qué es un FAQ?',
        answer:
          'FAQ es un acrónimo de Frequently Asked Questions, que en español significa Preguntas Frecuentes.',
      },
      {
        id: 2,
        question: '¿Para qué sirve un FAQ?',
        answer:
          'Un FAQ sirve para responder preguntas comunes que los usuarios suelen hacer.',
      },
      {
        id: 3,
        question: '¿Cómo se hace un FAQ?',
        answer:
          'Un FAQ se hace recopilando preguntas frecuentes y sus respuestas.',
      },
    ]
  }
}

export default FAQService
