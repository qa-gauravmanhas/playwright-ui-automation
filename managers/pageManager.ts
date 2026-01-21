import type {Page} from "@playwright/test";
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
import { DatepickerPage } from '../page-objects/datepickerPage'

export class PageManager{

    private readonly page: Page
    private navigationPage!: NavigationPage
    private formLayoutsPage!: FormLayoutsPage
    private datepickerPage!: DatepickerPage

    constructor(page: Page){
        this.page = page
    }

    navigateTo(): NavigationPage {
        if(!this.navigationPage){
            this.navigationPage = new NavigationPage(this.page)
        }
        return this.navigationPage
    }

    onFormLayoutsPage(): FormLayoutsPage {
        if(!this.formLayoutsPage){
            this.formLayoutsPage = new FormLayoutsPage(this.page)
        }
        return this.formLayoutsPage
    }

    onDatepickerPage(): DatepickerPage {
        if(!this.datepickerPage){
            this.datepickerPage = new DatepickerPage(this.page)
        }
        return this.datepickerPage
    }

    // these function are not async because they are not performing any async operation and not returning any promise
    // They are only returning already created page object instances
    // This PageManager is following lazy initialization pattern as we are not creating 
    // all page objects at once in the constructor 
    // rather than we are creating them only when they are requested for the first time using the respective methods

}