import { describe, test, expect } from 'bun:test'
import { ThesisThemeRoute } from '../routes'

describe('ThesisThemeController', () => {
  const { router: app } = new ThesisThemeRoute()
  test('can get all thesis themes requests', async () => {
    const res = await app.request('/', {
      method: 'GET',
    })
    expect(res.status).toBe(200)
  })

  test('can get thesis theme detail', async () => {
    const res = await app.request('/1416025999', {
      method: 'GET',
    })
    expect(res.status).toBe(200)
  })

  test('can get thesis theme history', async () => {
    const res = await app.request('/1416025999/history', {
      method: 'GET',
    })
    expect(res.status).toBe(200)
  })
})
