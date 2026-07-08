import{expect, test} from '@playwright/test'

test.beforeEach(async({page})=> {
        await page.goto('http://localhost:4200/');
        await page.getByText('Forms').click();
         await page.getByText('Form Layouts').click();
       
       
    });
    test('Locator sintax Rules', async ({page})=> {

        //by Tag name
        page.locator('input');

        //by ID
        page.locator('#inputEmail1');

        //by Class value
        page.locator('.shape-rectangle');

        //by Attribute name
        page.locator('[placeholder="Email"]');

        //combine dfferent selectors => важно е да не оставяме интервал между различните...
        page.locator('input[placeholder="Email"][nbinput]')

        //by XPath (NOT RECOMMENDED)
        page.locator('//*[@id="inputEmail1"]')

        //by partial text match => частично съвпдение на текст
        page.locator(':text("Using")')
        
        //by exact text match => пълно съвпдение на текст
        page.locator(':text-is("Using the Grid")')

});
    test('User facing locators', async({page}) => {
    await page.getByRole("textbox", {name: "Email"}).first().click();

    await page.getByRole("button", {name: "Sign in"}).first().click();

    await page.getByLabel("Email").first().click();

    await page.getByPlaceholder('Jane Doe').click();

    await page.getByText('Using the Grid').click();

    await page.getByTestId("SignIn").click();
    
    await page.getByTitle('Iot Dashboard').click();
})
test('Lokcating child elements', async({page}) => {
    
await page.locator('nb-card nb-radio :text-is("Option 1")').click();

//Or by chaining the elements:
await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();

// This is a combination:
// we can use combinatins from regular locators and userface locators
//nb-card in this case is not necessary, only if we are looking for child different elements
await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click();

// The least preferred method for finding child elements is by index: .nth(3) this is the fourth element on the page is the "Submit" button
await page.locator('nb-card').nth(3).getByRole('button').click();
})




