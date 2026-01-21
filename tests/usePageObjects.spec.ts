import {test, expect} from '../fixtures/customFixtures'

test.beforeEach(async ({page}) =>{
    await page.goto("https://playground.bondaracademy.com/")
})

test('Navigate to Forms Page', async ({pm}) => {
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().toasterPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().tooltipPage()
    
})

test('Parameterized method', async ({pm}) => {
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredAndOptions('test@test.com', 'test@123', 'Option 1')
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox('test', 'test@test.com', true)
})

test('useDatepickerPage', async ({pm}) => {
    await pm.navigateTo().datepickerPage()
    await pm.onDatepickerPage().selectDateInCommonDatePicker(100)
    await pm.onDatepickerPage().selectDatesInDatepickerWithRange(100, 110)
    await pm.onDatepickerPage().datepickerWithDisabledMinMaxValue(4)
})