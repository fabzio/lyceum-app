//Se debe de crear una interfaz para el modelo de datos de la tabla ThesisJuryRequest
export interface ThesisJuryRequest {
  student: string,
  thesis: {
    title: string
  },
    jury: string[], //Por ahora solo nombres, se puede cambiar a un objeto con los datos de los jurados
    status: string,
}
