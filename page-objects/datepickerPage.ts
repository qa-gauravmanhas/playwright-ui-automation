import type { Page } from "@playwright/test";
import { expect } from "../fixtures/customFixtures";
import { HelperBase } from "../helpers/helperBase";

export class DatepickerPage extends HelperBase {

  constructor(page: Page) {
    super(page);
  }

  /**
   * This method selects a date in the common date picker calendar based on the number of days from today
   * @param numberOfDaysFromToday : should be a valid positive integer
   */
  async selectDateInCommonDatePicker(numberOfDaysFromToday: number) {
    const commonDatePickerInput = this.page.getByPlaceholder("Form Picker");
    this.logInfo('Clicking on common date picker input')
    await commonDatePickerInput.click();
    const dateToAssert = await this.selectDateInCalendar(numberOfDaysFromToday)
    this.logInfo(`Asserting input value is ${dateToAssert}`)
    await expect(commonDatePickerInput).toHaveValue(dateToAssert);
  }

  /**
   * This method selects a date range in the datepicker with range calendar based on the number of days from today
   * @param startDate : should be a valid positive integer
   * @param endDate : should be a valid positive integer and greater than startDate
   */
  async selectDatesInDatepickerWithRange(startDate: number, endDate: number) {

    const datepickerWithRangeInput = this.page.getByPlaceholder("Range Picker");
    this.logInfo('Clicking on date range picker input')
    await datepickerWithRangeInput.click();
    const startdateToAssert = await this.selectDateInCalendar(startDate)
    const endDateToAssert = await this.selectDateInCalendar(endDate)
    const dateRangeToAssert = `${startdateToAssert} - ${endDateToAssert}`
    this.logInfo(`Asserting range input value is "${dateRangeToAssert}`)
    await expect(datepickerWithRangeInput).toHaveValue(dateRangeToAssert)
  }

  /**
   * This method selects a date from "Datepicker With Disabled Min Max Values" calendar 
   * based on the number of days from today
   * @param dateWithInRange : should be an integer between -5 to +5
   */
  async datepickerWithDisabledMinMaxValue(dateWithInRange:number){
    const minMaxPickerInput = this.page.getByPlaceholder("Min Max Picker");
    this.logInfo('Clicking on Min-Max date picker input')
    await minMaxPickerInput.click();
    console.log('====Make sure to pass value between -5 and +5====')
    const dateToAssert = await this.selectDateInCalendar(dateWithInRange)
    this.logInfo(`Asserting Min-Max input value is ${dateToAssert}`)
    await expect(minMaxPickerInput).toHaveValue(dateToAssert)
  }

  /**
   * Helper Method to select a date from the calendar
   * @param numberOfDaysFromToday 
   * @returns 
   */
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

    this.logInfo(`Navigating calendar to month/year: ${monthYearToAssert.trim()}`)

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

    this.logInfo(`Clicking on day: ${expectedDate}`)

    await this.page.locator('.day-cell.ng-star-inserted:not(.bounding-month)').getByText(expectedDate, { exact: true }).click();
    return dateToAssert;
  }
}

