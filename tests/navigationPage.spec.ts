import { test} from '@playwright/test';
import { NavigationPage } from '../page-objects/navigation-page';
import { FormLayoutsPage} from'../page-objects/form-layout-page';


test.beforeEach(async({page})=> {
    await page.goto('http://localhost:4200/')
});

test('Navigate to form layouts pages', async({page})=>{
    const navigateTo = new NavigationPage(page);
    await navigateTo.formLayouts();
    await navigateTo.datePickerPage();
    await navigateTo.toasterPage();
    await navigateTo.tooltipPage();
    await navigateTo.smartTablePage();
});

test('Parameterized page object methods', async({page})=>{
    const navigateTo = new NavigationPage(page);
    const formLayoutsPage = new FormLayoutsPage(page);
    await navigateTo.formLayouts();
    await formLayoutsPage.submitUsingTheGridForm("test@example.com", "password123", "Option 1");
   // await formLayoutsPage.submitInlineForm("Anna Smith", "test@example.com", true);
        
});
test('Parameterized page object methods - inline form', async({page})=>{
    const navigateTo = new NavigationPage(page);
    const formLayoutsPage= new FormLayoutsPage(page);
    await navigateTo.formLayouts();
    await formLayoutsPage.submitInlineForm("Anna Smith", "test@example.com", true);
});