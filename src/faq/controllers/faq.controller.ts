import { Hono } from 'hono'
import { FAQService } from '../services'
import { zValidator } from '@hono/zod-validator'
import { faqsSchema } from '@/database/schema/faqs'
import { FaqDAO } from '../dao/FaqDAO'
import { z } from 'zod'

class FAQsController {
  private router = new Hono()
  private faqService: FaqDAO = new FAQService()

  public getFAQs = this.router.get('/', async (c) => {
    const response: ResponseAPI = {
      data: await this.faqService.getFAQs(),
      message: 'FAQ Categories retrieved',
      success: true,
    }
    return c.json(response)
  })

  public createFAQ = this.router.post(
    '/',
    zValidator(
      'json',
      z.object({
        question: z.string(),
        answer: z.string(),
        category: z.number(),
      })
    ),
    async (c) => {
      const faq = c.req.valid('json')
      const response: ResponseAPI = {
        data: await this.faqService.createFAQ({
          ...faq,
          faqCategoryId: faq.category,
        }),
        message: 'FAQ Category created',
        success: true,
      }
      return c.json(response)
    }
  )

  public updateFAQ = this.router.put(
    '/',
    zValidator(
      'json',
      z.object({
        id: z.number(),
        question: z.string(),
        answer: z.string(),
        category: z.number(),
      })
    ),
    async (c) => {
      const faq = c.req.valid('json')
      const response: ResponseAPI = {
        data: await this.faqService.updateFAQ(faq.id, {
          ...faq,
          faqCategoryId: faq.category,
        }),
        message: 'FAQ Category updated',
        success: true,
      }
      return c.json(response)
    }
  )

  public deleteFAQ = this.router.delete('/:id', async (c) => {
    const { id } = c.req.param()
    const response: ResponseAPI = {
      data: await this.faqService.deleteFAQ(parseInt(id)),
      message: 'FAQ Category deleted',
      success: true,
    }
    return c.json(response)
  })
}
export default FAQsController
