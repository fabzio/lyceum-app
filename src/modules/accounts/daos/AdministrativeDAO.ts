interface AdministrativeDAO {
  getAdministrativeDetail(params: { code: string }): Promise<{
    code: string
    name: string
    firstSurname: string
    secondSurname: string
    email: string
    state: 'active' | 'inactive' | 'deleted'
    unit: string
  }>
}

export default AdministrativeDAO
