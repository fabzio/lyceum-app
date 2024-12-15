import axios from 'axios'
import http from '@frontend/lib/http'

class SignInService {
  public static async postNewAccount(
    googleId: string,
    email: string,
    name?: string | undefined,
    firstSurname?: string | undefined,
    secondSurname?: string | undefined // Ensure you get the current form value
  ): Promise<string> {
    try {
      const res = await http.post(`/accounts/generic/sign-up/${googleId}`, {
        name: name,
        firstSurname: firstSurname,
        secondSurname: secondSurname,
        email: email,
      })
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as Promise<string>
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ResponseAPI
        if (errorResponse) {
          throw new Error(errorResponse.message)
        }
      }
      throw error
    }
  }

  public static async postContactInfo(
    accountId: string,
    name: string,
    firstSurname: string,
    phone: string,
    identityType: 'national' | 'foreign',
    CUI: string,
    secondaryPhone?: string | undefined,
    secondSurname?: string | undefined
  ): Promise<void> {
    try {
      console.log(secondSurname)
      const res = await http.post(`/accounts/generic/contact/${accountId}`, {
        name: name,
        firstSurname: firstSurname,
        phone: phone,
        identityType: identityType,
        CUI: CUI,
        secondaryPhone: secondaryPhone,
        secondSurname: secondSurname,
      })
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as Promise<void>
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as ResponseAPI
        if (errorResponse) {
          throw new Error(errorResponse.message)
        }
      }
      throw error
    }
  }
}

export default SignInService
