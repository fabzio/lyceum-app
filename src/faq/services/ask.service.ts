import { FAQ } from '../interfaces/asks'

class FAQService {
  public static getFAQs(): Promise<FAQ[]> {
    const mock: FAQ[] = [
      {
        id: 1,
        question: '¿Qué es un FAQ?',
        answer:
          'FAQ es un acrónimo de Frequently Asked Questions, que en español significa Preguntas Frecuentes.',
        category: 'General',
      },
      {
        id: 2,
        question: '¿Para qué sirve un FAQ?',
        answer:
          'Un FAQ sirve para responder preguntas comunes que los usuarios suelen hacer.',
        category: 'General',
      },
      {
        id: 3,
        question: '¿Cómo se hace un FAQ?',
        answer:
          'Un FAQ se hace recopilando preguntas frecuentes y sus respuestas.',
        category: 'Matricula',
      },
    ]

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mock)
      }, 1000)
    })
  }
}

export default FAQService
