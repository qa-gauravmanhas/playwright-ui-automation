import { test, expect } from '@playwright/test';

test('datepicker', async ({page}) => {
    await page.goto("https://playground.bondaracademy.com/")
    await page.getByTitle('Forms').click()
    await page.getByTitle('Datepicker').click()
    const commonDatePicketInput = page.getByPlaceholder('Form Picker')
    await commonDatePicketInput.click()
    await page.locator('[class="day-cell ng-star-inserted"]').getByText('28',{exact:true}).click()
    })

test('datepicker with random date', async ({page}) => {
    await page.goto("https://playground.bondaracademy.com/")
    await page.getByTitle('Forms').click()
    await page.getByTitle('Datepicker').click()
    const commonDatePicketInput = page.getByPlaceholder('Form Picker')
    await commonDatePicketInput.click()

    const date = new Date()
    date.setDate(date.getDate()+7)
    const expectedDate = date.getDate().toString()

    const expectedMonthShort = date.toLocaleString('En-US', {month:'short'})
    const expectedYear = date.getFullYear().toString()

    const expectedDateValue = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
    console.log(expectedDateValue)

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact:true}).click()
    console.log("============Doing Date Assertion============")
    await expect(commonDatePicketInput).toHaveValue(expectedDateValue)


})

test('datepicker change month', async ({page}) => {
    await page.goto("https://playground.bondaracademy.com/")
    await page.getByTitle('Forms').click()
    await page.getByTitle('Datepicker').click()
    const commonDatePicketInput = page.getByPlaceholder('Form Picker')
    await commonDatePicketInput.click()

    const date = new Date()
    date.setDate(date.getDate()+1000)

    const expectedDate = date.getDate().toString()
    const expectedMonthShort = date.toLocaleString('En-US', {month:'short'})
    const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
    const expectedYear = date.getFullYear().toString()
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
    const monthYearToAssert = ` ${expectedMonthLong} ${expectedYear} `

    const calendarMonthYear = page.locator('nb-calendar-view-mode') 

    // while(await calendarMonthYear.textContent() != monthYearToAssert){ 
    //   await page.locator('[data-name="chevron-right"]').click()
    // }

    await expect.poll(async () => {
      const currentMonthYear = await calendarMonthYear.textContent()
      if(currentMonthYear != monthYearToAssert){
        await page.locator('[data-name="chevron-right"]').click()
      }
      return currentMonthYear
    }, {timeout: 15000, intervals: [200]}
  
  ).toBe(monthYearToAssert)
    
    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact:true}).click()
    console.log("============Doing Date Assertion============")
    await expect(commonDatePicketInput).toHaveValue(dateToAssert)

})
