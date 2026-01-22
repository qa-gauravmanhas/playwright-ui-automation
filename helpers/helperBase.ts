import { Page, Locator } from '@playwright/test'
import { expect } from '../fixtures/customFixtures'

export abstract class HelperBase {
  protected readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  // -------------------
  // Logging Methods
  // -------------------
  protected logInfo(message: string) {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`)
  }

  protected logError(message: string) {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`)
  }

  // -------------------
  // Core Playwright Helpers
  // -------------------

  /**
   * Wait for page to finish loading
   */
  protected async waitForPageReady(): Promise<void> {
    this.logInfo('Waiting for page to be ready')
    await this.page.waitForLoadState('domcontentloaded')
  }

  /**
   * Assert that the page URL matches
   */
  protected async assertOnPage(url: string | RegExp): Promise<void> {
    this.logInfo(`Asserting page URL matches: ${url}`)
    await expect(this.page).toHaveURL(url)
  }

  /**
   * Assert that a locator is visible
   */
  protected async expectVisible(locator: Locator, description?: string): Promise<void> {
    if (description) this.logInfo(`Checking visibility of: ${description}`)
    await expect(locator).toBeVisible()
  }

  /**
   * Get trimmed text content from a locator
   */
  protected async getText(locator: Locator): Promise<string> {
    return (await locator.textContent())?.trim() ?? ''
  }

  /**
   * Scope locators inside a root element
   */
  protected within(root: Locator) {
    return {
      locator: (selector: string) => root.locator(selector)
    }
  }
}
