export interface ProfessorDAO {
    getProfessorDetail(params: { code: string }): Promise<{
        code: string
        name: string
        firstSurname: string
        secondSurname: string
        email: string
        state: 'active' | 'inactive' | 'deleted'
        speciallity: string
      }>

    getAllProfessors(): Promise<
      Array<{
        code: string
        name: string
        firstSurname: string
        secondSurname: string
        email: string
        state: 'active' | 'inactive' | 'deleted'
        speciallity: string
      }>
    >
  }
  