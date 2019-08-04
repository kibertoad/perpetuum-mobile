import '../types/window-types'
const PATH = 'http://localhost:1234'

describe('integration tests', () => {
  beforeEach(async () => {
    await page.goto(PATH, { waitUntil: 'load' })
  })
})
