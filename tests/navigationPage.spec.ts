import { test} from '@playwright/test';
import { NavigationPage } from '../page-objects/navigation-page';

test.beforeEach(async({page})=> {
    await page.goto('http://localhost:4200/')
});

test('Navigate to form layouts pages', async({page})=>{
    const navigateTo = new NavigationPage(page);
    await navigateTo.formLayouts();
})