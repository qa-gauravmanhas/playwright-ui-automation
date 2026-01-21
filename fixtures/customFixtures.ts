import { test as base } from '@playwright/test'
import { PageManager } from '../managers/pageManager'

type Fixtures = {
  pm: PageManager
}

export const test = base.extend<Fixtures>({
  pm: async ({ page }, use) => {
    const pm = new PageManager(page)
    await use(pm)
  }
})

export { expect } from '@playwright/test'