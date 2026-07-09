 import{expect, test} from '@playwright/test'

test.beforeEach(async({page})=> {
        await page.goto('http://localhost:4200/');
       
    });

test.describe('suite1', ()=> {
    test.beforeEach(async({page})=> {
        // await page.goto('http://localhost:4200/');
        await page.getByText('Modal & Overlays').click();
       
    });

 test('the first test ', async({page})=> { 
     await page.getByText('Dialog').click();
 

  });

 test('navigate to Datepicker page', async({page})=> {
     await page.getByText('Window').click();
      
         });
    });

test.describe('suite2', ()=> {
    test.beforeEach(async({page})=> {
     await page.getByText('Forms').click();
       
    });

 test('the first test ', async({page})=> { 
     await page.getByText('Form Layouts').click();
 

  });

 test('navigate to Datepicker page', async({page})=> {
     await page.getByText('Datepicker').click();
      
         });
    });


