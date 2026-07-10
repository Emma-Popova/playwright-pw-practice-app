
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

    test('Checkboxes', async({page})=>{
        await page.getByText("Modal & Overlays").click()
        await page.getByText('Toastr').click()

        await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true})
        await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force: true})

        const allBoxes = page.getByRole('checkbox')

        for (const box of await allBoxes.all()) {
            await box.check({force: true})

            expect(await box.isChecked()).toBeTruthy()

        }

    })

        test('List and Dropdawns', async ({page})=> {
        const dropDownMenu = page.locator('ngx-header nb-select') //parents el: ngx-header, child el: nb-select
        await dropDownMenu.click();

        page.getByRole('list') // when the list has UL tag -> parent container for the entire list "list"
        page.getByRole('listitem') // when the list has LI tag - all elements in an array or list of list elements...

    //   const optionList = page.getByRole('list').locator('nb-option')
    //but another approach is possible:
    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
    await optionList.filter({hasText: "Cosmic"}).click()// We choose from the array with el. to be "Cosmic"
    const header = page.locator('nb-layout-header')//to check the background color
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)',{ timeout: 8000 })


     })

        test("tooltips", async ({ page }) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByRole("link", { name: "Tooltip" }).click()
    //await page.getByText("Tooltip").click();

    const tooltipCard = page.locator("nb-card", {hasText: "Tooltip Placements"})

    await tooltipCard.getByRole("button", { name: "Top" }).hover()

    })

 })


