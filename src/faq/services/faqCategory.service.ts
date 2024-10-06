import { FAQCategory } from '../interfaces/FAQCategory'

class FAQCategoryService {
  public static getFAQCategories(): Promise<FAQCategory[]> {
    const mock: FAQCategory[] = [
      {
        id: 1,
        name: 'General',
      },
      {
        id: 2,
        name: 'Pagos',
      },
      {
        id: 3,
        name: 'Cuenta',
      },
    ]

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mock)
      }, 1000)
    })
  }

  public static updateFAQCategory(category: FAQCategory): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  }

  public static deleteFAQCategory(
    FAQCategoryId: FAQCategory['id']
  ): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  }

  public static createFAQCategory(
    FAQCategoryName: FAQCategory['name']
  ): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  }
}

export default FAQCategoryService
