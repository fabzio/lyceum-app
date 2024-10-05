import { resolve } from 'bun'
import { RiskStudent } from '@/interfaces/models/RiskStudent'
class RiskStudentService {
  public getAllRiskStudent(): Promise<RiskStudent[]> {
    const mock: RiskStudent[] = [
      {
        id: 1,
        cuenta: {
          id: 1,
          codigo: '20200002',
          nombres: 'Juan',
          apellidos: 'Perez',
        },
        curso: 'Programación 2',
        motivo: 'Tercera',
        ultimaPuntuacion: 2,
        historialRiesgo: [
          {
            id: 1,
            fecha: '20/10/2022',
            puntuacion: 2,
            comentario: 'Muy bien, esta paradazo en el curso',
          },
        ],
      },
      {
        id: 2,
        cuenta: {
          id: 2,
          codigo: '20200002',
          nombres: 'María',
          apellidos: 'López',
        },
        curso: 'Programación 2',
        motivo: 'Tercera',
        ultimaPuntuacion: 3,
        historialRiesgo: [
          {
            id: 2,
            fecha: '21/10/2022',
            puntuacion: 2,
            comentario: 'Decente, falta por aprender',
          },
          {
            id: 3,
            fecha: '30/11/2022',
            puntuacion: 3,
            comentario: 'Esta que quiere remomtar, pero le falta habilidad',
          },
        ],
      },
      {
        id: 3,
        cuenta: {
          id: 3,
          codigo: '20200003',
          nombres: 'Carlos',
          apellidos: 'Gómez',
        },
        curso: 'Programación 2',
        motivo: 'Cuarta',
        ultimaPuntuacion: 4,
        historialRiesgo: [
          {
            id: 4,
            fecha: '30/10/2022',
            puntuacion: 2,
            comentario: 'Decente, falta por aprender',
          },
          {
            id: 5,
            fecha: '30/11/2022',
            puntuacion: 4,
            comentario: 'Imposible que jale este ciclo',
          },
        ],
      },
      {
        id: 4,
        cuenta: {
          id: 4,
          codigo: '20200004',
          nombres: 'Ana',
          apellidos: 'Martínez',
        },
        curso: 'Programación 2',
        motivo: 'Tercera',
        ultimaPuntuacion: 4,
        historialRiesgo: [
          {
            id: 6,
            fecha: '22/09/2022',
            puntuacion: 2,
            comentario: 'Decente, falta por aprender',
          },
          {
            id: 7,
            fecha: '30/11/2022',
            puntuacion: 4,
            comentario: 'Imposible que jale este ciclo',
          },
        ],
      },
      {
        id: 5,
        cuenta: {
          id: 5,
          codigo: '20200005',
          nombres: 'Martin',
          apellidos: 'Mendoza',
        },
        curso: 'Programación 3',
        motivo: 'Salud Mental',
        ultimaPuntuacion: 5,
        historialRiesgo: [
          {
            id: 8,
            fecha: '22/09/2022',
            puntuacion: 2,
            comentario: 'Decente, falta por aprender',
          },
          {
            id: 9,
            fecha: '30/11/2022',
            puntuacion: 4,
            comentario: 'Imposible que jale este ciclo',
          },
          {
            id: 10,
            fecha: '01/12/2022',
            puntuacion: 5,
            comentario: 'Ya aprobo el curso',
          },
        ],
      },
      {
        id: 6,
        cuenta: {
          id: 6,
          codigo: '20200006',
          nombres: 'Jose',
          apellidos: 'Quispe',
        },
        curso: 'Sistemas Operativos',
        motivo: 'Cuarta',
        ultimaPuntuacion: 3,
        historialRiesgo: [
          {
            id: 11,
            fecha: '22/09/2022',
            puntuacion: 2,
            comentario: 'Decente, falta por aprender',
          },
          {
            id: 12,
            fecha: '30/11/2022',
            puntuacion: 4,
            comentario: 'Imposible que jale este ciclo',
          },
          {
            id: 13,
            fecha: '01/12/2022',
            puntuacion: 3,
            comentario: 'Se esta confiando demasiado',
          },
        ],
      },
      {
        id: 7,
        cuenta: {
          id: 7,
          codigo: '20200007',
          nombres: 'Fabricio',
          apellidos: 'Castillo',
        },
        curso: 'Ingenieria de Software',
        motivo: 'Salud Mental',
        ultimaPuntuacion: 5,
        historialRiesgo: [
          {
            id: 14,
            fecha: '23/09/2022',
            puntuacion: 5,
            comentario: 'El estres le esta dando poderes',
          },
        ],
      },
      {
        id: 8,
        cuenta: {
          id: 8,
          codigo: '20200008',
          nombres: 'Daniel',
          apellidos: 'Vega',
        },
        curso: 'Tecnologias de informacion para los negocios',
        motivo: 'Cuarta',
        ultimaPuntuacion: 3,
        historialRiesgo: [
          {
            id: 15,
            fecha: '23/09/2022',
            puntuacion: 5,
            comentario: 'Si esta interasado en el curso',
          },
        ],
      },
    ]
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mock)
      }, 1000)
    })
  }
}

export default RiskStudentService
