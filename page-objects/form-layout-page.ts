import {Page} from "@playwright/test";
import { step } from "../helpers/test-step-decorator";
import { HelperBase } from "./helper-base";

export class FormLayoutsPage extends HelperBase{
    
    constructor(page: Page){
        super(page);
    }

    @step
    async submitUsingTheGridForm(email:string, password: string, optionText: string){

        const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the Grid"});
        await usingTheGridForm.getByRole('textbox', {name: "Email"}).fill(email);
        await usingTheGridForm.getByRole('textbox', {name: "Password"}).fill(password);
        await usingTheGridForm.getByLabel('Option 1').check({force: true});
        await usingTheGridForm.getByRole('button', {name: "Sign in"}).click();
        const toasterMessage = await this.getToastrMessage();
        console.log(toasterMessage);
    }
/**
 * This method submits the inline form with the provided full name, email and remember me checkbox can be selected.
 * @param fullName Valid test user full name (first and last name) 
 * @param email Valid test user email
 * @param rememberMeCheckbox Pass `true` to select the "Remember Me" checkbox or `false` to leave it unchecked.
 */
    @step
    async submitInlineForm(fullName: string, email: string, rememberMeCheckbox: boolean){
        const inlineForm = this.page.locator('nb-card', {hasText: "Inline form"});
        await inlineForm.getByRole('textbox', {name:"Jane Doe"}).fill(fullName);
        await inlineForm.getByRole('textbox', {name: "Email"}).fill(email);
        if(rememberMeCheckbox){
             await inlineForm.getByRole('checkbox', {name: "Remember me"}).check({force: true});
        }
        await inlineForm.getByRole('button', {name: "Submit"}).click();

    }

}
