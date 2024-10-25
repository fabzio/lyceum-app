export interface ExternalDAO {
  getAllExternals(): Promise<
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
