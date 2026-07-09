
import {test, expect} from '@playwright/test'
import { delay } from 'rxjs-compat/operator/delay'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test.describe ('Form Layouts page', () => {

    test.beforeEach( async ({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()

    })

    test('Input fields', async({page})=>{
        
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox',{name: "Email"})

        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test2@test.com', {delay: 500})
        //await usingTheGridEmailInput.pressSequentially('test2@test.com')

                //await usingTheGridEmailInput.pressSequentially('test2@test.com')
        //to simulate slow form filling - pressing keys sequentially...delay 0.5
        //await usingTheGridEmailInput.pressSequentially('test2@test.com', {delay: 500})

        //generic assertion 
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect (inputValue).toEqual('test2@test.com')

          //Locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
    })

})
