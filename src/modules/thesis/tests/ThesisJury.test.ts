import { describe, test, expect } from 'bun:test'
import { ThesisJuryRoute } from '../routes'

describe('ThesisJuryController', () => {
  const { router: app } = new ThesisJuryRoute()

  test('can get all thesis jury requests', async () => {
    const res = await app.request('/', {
      method: 'GET',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      success: true,
      message: 'Jury request retrieved',
      data: expect.any(Array),
    })
  })

  test('can get thesis juries by thesis code', async () => {
    const res = await app.request('/1416025999/juries', {
      method: 'GET',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      success: true,
      message: 'Juries retrieved',
      data: expect.any(Array),
    })
  })

  test('can get thesis by student code', async () => {
    const res = await app.request('/search/71547331', {
      method: 'GET',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      success: true,
      message: 'Thesis retrieved',
      data: expect.any(Object),
    })
  })
})
