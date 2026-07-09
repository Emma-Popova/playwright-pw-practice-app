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
});

test('Locating child elements', async({page}) => {
    
await page.locator('nb-card nb-radio :text-is("Option 1")').click();

//Or by chaining the elements:
await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();

// This is a combination:
// we can use combinatins from regular locators and userface locators
// nb-card in this case is not necessary, only if we are looking for child different elements
await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click();

// The least preferred method for finding child elements is by index: .nth(3) this is the fourth element on the page is the "Submit" button
await page.locator('nb-card').nth(3).getByRole('button').click();

});

test('locating parents element', async({page})=>{
    //To find a parent element we can use a text-filter or a locator-filter
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox',{name: "Email"}).click();
    await page.locator('nb-card',{has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click();

    //To find a unique parent element we can chain a filter... 
    await page.locator('nb-card').filter({hasText:"Basic form"}).getByRole('textbox',{name: "Email"}).click();
    await page.locator('nb-card').filter({has: page.locator('.status0danger')}).getByRole('textbox',{name: "Email"}).click();

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"})
        .getByRole('textbox',{name: "Email"}).click();

   // With .. we go up one level in the DOM to find a parent element with XPath and then - the child element
  //not recommended
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox',{name: "Email"}).click();
});

test('Reusing the locators', async({page})=> {

    //Initial version:

    await page.locator('nb-card').filter({hasText:"Basic form"}).getByRole('textbox',{name: "Email"}).fill('test@test.com');
    await page.locator('nb-card').filter({hasText:"Basic form"}).getByRole('textbox',{name: "Password"}).fill('Welcome123');
    await page.locator('nb-card').filter({hasText:"Basic form"}).getByRole('button').click();


    //Clear version:
    
    // const basicForm = page.locator('nb-card').filter({hasText:"Basic form"});

    // await basicForm.getByRole('textbox',{name: "Email"}).fill('test@test.com');
    // await basicForm.getByRole('textbox',{name: "Password"}).fill('Welcome123');
    // await basicForm.locator('nb-checkbox').click();
    // await basicForm.getByRole('button').click();

     //Even more Clean version:
    const basicForm = page.locator('nb-card').filter({hasText:"Basic form"});
    const emailField = basicForm.getByRole('textbox',{name: "Email"});

    await emailField.fill('test@test.com');
    await basicForm.getByRole('textbox',{name: "Password"}).fill('Welcome123');
    await basicForm.locator('nb-checkbox').click();
    await basicForm.getByRole('button').click();
    
    //And finally - expect 
    await expect (emailField).toHaveValue('test@test.com');


});

    test('extrating values',async({page})=>{
        //string text value => with the method: .textContent(); 
        const basicForm = page.locator('nb-card').filter({hasText:"Basic form"});
        const butonText = await basicForm.locator('button').textContent();
        expect(butonText).toEqual('Submit');

    //all text value -> and we validate that at least one of these radio buttons has the value "option 2"
        const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents(); //returns the entire content as an array
        expect(allRadioButtonsLabels).toContain("Option 1");  // confirms that there is at least one with this content

     //input value => for fields where we enter input data => inputValue()
        const emailField = basicForm.getByRole('textbox', {name: "Email"});
        await emailField.fill('test@test.com');
        const emailValue = await emailField.inputValue();
        expect (emailValue).toEqual('test@test.com');

    //to find the content of an attribute - placeholder is with "Email"
        const placeholderValue = await emailField.getAttribute('placeholder');
        expect (placeholderValue).toEqual('Email');

    });






