import type {Page} from '@playwright/test'

export class FormLayoutsPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    /**
     * This method will fill out using the grid form with credentials and options
     * @param email : should be a valid email
     * @param password : should be a balid password
     * @param option : name of the radio button option
     */
    async submitUsingTheGridFormWithCredAndOptions(email:string, password: string, option: string){
        const usingTheGrid = this.page.locator('nb-card', {hasText:'Using the Grid'})
        await usingTheGrid.locator('#inputEmail1').pressSequentially(email, {delay:100})
        await usingTheGrid.locator('#inputPassword2').fill(password)
        await usingTheGrid.getByText(option).click()
        await usingTheGrid.locator('button').click()
    }

    /**
     * This method will fill out the inlineForm with user details
     * @param name : should be firstname and lastname
     * @param email : should be a valid email
     * @param rememberMe : should be true if you want to save the session, else false
     */
    async submitInlineFormWithNameEmailAndCheckbox(name:string, email:string, rememberMe:boolean){
        const inlineForm = this.page.locator('nb-card', {hasText:'Inline form'})
        await inlineForm.locator('[placeholder="Jane Doe"]').pressSequentially(name, {delay:100})
        await inlineForm.locator('[placeholder="Email"]').fill(email)
        if(rememberMe){
            await inlineForm.getByText('Remember me').check({force:true})
        }
        await inlineForm.getByRole('button').click()
    }
}