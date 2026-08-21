import { test} from '@playwright/test';
import { PageManager } from '../page-objects/page-manager';


test.beforeEach(async({page})=> {
    await page.goto('http://localhost:4200/')
});

test('Navigate to form layouts pages', async({page})=>{
    const pom = new PageManager(page);
    await pom.navigateTo.formLayouts();
    await pom.navigateTo.datePickerPage();
    await pom.navigateTo.toasterPage();
    await pom.navigateTo.tooltipPage();
    await pom.navigateTo.smartTablePage();
});

test('Parameterized page object methods', async({page})=>{
    const pom = new PageManager(page);
    await pom.navigateTo.formLayouts();
    await pom.formLayoutsPage.submitUsingTheGridForm("test@example.com", "password123", "Option 1");
    await pom.formLayoutsPage.submitInlineForm("Anna Smith", "test@example.com", true);
    await pom.navigateTo.datePickerPage();
    await pom.datеpickerPage.selectCommonDatepickerDateFromToday(5);
    await pom.datеpickerPage.selectDatepickerWithRangeFromToday(5, 10);
});


