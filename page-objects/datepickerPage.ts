import type { Page } from "@playwright/test";
import { expect } from "../fixtures/customFixtures";

export class DatepickerPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectDateInCommonDatePicker(numberOfDaysFromToday: number) {
    const commonDatePickerInput = this.page.getByPlaceholder("Form Picker");
    await commonDatePickerInput.click();
    const dateToAssert = await this.selectDateInCalendar(numberOfDaysFromToday)
    await expect(commonDatePickerInput).toHaveValue(dateToAssert);
  }

  async selectDatesInDatepickerWithRange(startDate: number, endDate: number) {

    const datepickerWithRangeInput = this.page.getByPlaceholder("Range Picker");
    await datepickerWithRangeInput.click();
    const startdateToAssert = await this.selectDateInCalendar(startDate)
    const endDateToAssert = await this.selectDateInCalendar(endDate)
    const dateRangeToAssert = `${startdateToAssert} - ${endDateToAssert}`
    await expect(datepickerWithRangeInput).toHaveValue(dateRangeToAssert)

  }

  async datepickerWithDisabledMinMaxValue(dateWithInRange:number){
    const minMaxPickerInput = this.page.getByPlaceholder("Min Max Picker");
    await minMaxPickerInput.click();
    console.log('====Make sure to pass value between -5 and +5')
    const dateToAssert = await this.selectDateInCalendar(dateWithInRange)
    await expect(minMaxPickerInput).toHaveValue(dateToAssert)

  }

  private async selectDateInCalendar(numberOfDaysFromToday:number){

    const date = new Date();
    date.setDate(date.getDate() + numberOfDaysFromToday);
    const expectedDate = date.getDate().toString();
    const expectedMonthShort = date.toLocaleString("En-US", { month: "short" });
    const expectedMonthLong = date.toLocaleString("En-US", { month: "long" });
    const expectedYear = date.getFullYear().toString();
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;
    const monthYearToAssert = ` ${expectedMonthLong} ${expectedYear} `;

    const calendarMonthYear = this.page.locator("nb-calendar-view-mode");

    // while(await calendarMonthYear.textContent() != monthYearToAssert){
    //   await page.locator('[data-name="chevron-right"]').click()
    // }

    await expect
      .poll(
        async () => {
          const currentMonthYear = await calendarMonthYear.textContent();
          if (currentMonthYear != monthYearToAssert) {
            await this.page.locator('[data-name="chevron-right"]').click();
          }
          return currentMonthYear;
        },
        { timeout: 15000 }, // can be used with interval like : { timeout: 15000, intervals: [200] },
      )
      .toBe(monthYearToAssert);

    await this.page.locator('.day-cell.ng-star-inserted:not(.bounding-month)').getByText(expectedDate, { exact: true }).click();
    return dateToAssert;
  }
}

