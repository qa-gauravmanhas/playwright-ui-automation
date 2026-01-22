import type { Page } from "@playwright/test";

// Represents the left navigation bar and exposes high-level navigation actions
// Tests should not interact with nav locators directly

export class NavigationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async formLayoutsPage() {
    await this.selectGroupMenyItem("Forms")
    await this.page.getByText("Form Layouts").click();
  }

  async datepickerPage() {
    await this.selectGroupMenyItem("Forms")
    await this.page.getByText("Datepicker").click();
  }

  async toasterPage() {
    await this.selectGroupMenyItem("Modal & Overlays")
    await this.page.getByText("Toastr").click();
  }

  async smartTablePage() {
    await this.selectGroupMenyItem("Tables & Data")
    await this.page.getByText("Smart Table").click();
  }

  async tooltipPage() {
    await this.selectGroupMenyItem("Modal & Overlays")
    await this.page.getByText("Tooltip").click();
  }

  private async selectGroupMenyItem(groupItemTitle: string){
    const groupMenuItem = this.page.getByTitle(groupItemTitle)
    const expandedState = await groupMenuItem.getAttribute('aria-expanded')
    if (expandedState === 'false'){
        await groupMenuItem.click()
    }
  }

}
