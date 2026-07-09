
import {test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test.describe ('Form Layouts page', () => {

    test.beforeEach( async ({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()

    })

    test ('radio buttons', async({page}) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})

        
        await usingTheGridForm.getByLabel('Option 1').check({force: true})

        //in this case .check() will not work because the button is 'visually-hidden' and so we need to set ({force: true})
        
        await usingTheGridForm.getByRole('radio', {name: "Option 1"}).check({force: true}) 

        //generi assertions
        const radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()
        expect (radioStatus).toBeTruthy()
        
        //locator assertions
        await expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).toBeChecked()

        await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force: true})       
        expect(usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy()

    })
})


