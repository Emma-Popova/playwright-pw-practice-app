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
    



