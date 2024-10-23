export interface ExternalDAO {
  getAllExternal(): Promise<
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
