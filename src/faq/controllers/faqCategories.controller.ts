import { Hono } from 'hono'
import { FaqCategoriesService } from '../services'
import { FaqCategoriesDAO } from '../dao/FaqCategoriesDAO'
import { zValidator } from '@hono/zod-validator'
import { faqCategoriesSchema } from '@/database/schema/faqCategories'

class FAQCategoriesController {
  private router = new Hono()
  private faqCategoriesService: FaqCategoriesDAO = new FaqCategoriesService()
  public getFAQCategories = this.router.get('/', async (c) => {
    const response: ResponseAPI = {
      data: await this.faqCategoriesService.getFaqCategories(),
      message: 'FAQ Categories retrieved',
      success: true,
    }
    return c.json(response)
  })

  public createFAQCategory = this.router.post(
    '/',
    zValidator('json', faqCategoriesSchema),
    async (c) => {
      const category = c.req.valid('json')
      const response: ResponseAPI = {
        data: await this.faqCategoriesService.createFaqCategory(category),
        message: 'FAQ Category created',
        success: true,
      }
      return c.json(response)
    }
  )

  public updateFAQCategory = this.router.put(
    '/',
    zValidator('json', faqCategoriesSchema),
    async (c) => {
      const category = c.req.valid('json')
      const response: ResponseAPI = {
        data: await this.faqCategoriesService.updateFaqCategory(category),
        message: 'FAQ Category updated',
        success: true,
      }
      return c.json(response)
    }
  )

  public deleteFAQCategory = this.router.delete('/:id', async (c) => {
    const { id } = c.req.param()
    const response: ResponseAPI = {
      data: await this.faqCategoriesService.deleteFaqCategory(parseInt(id)),
      message: 'FAQ Category deleted',
      success: true,
    }
    return c.json(response)
  })
}
export default FAQCategoriesController
