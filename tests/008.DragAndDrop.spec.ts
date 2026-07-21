import {test} from '@playwright/test'

test('Drag and Drop inside iframe', async({page})=>{

    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/');

    const dialog = page.locator('.fc-dialog.fc-choice-dialog');
   
    try {
        await dialog.waitFor({ state: 'visible', timeout: 3000 });
        await dialog.getByRole('button', { name: 'Consent' }).click();
    } catch {
       // Cookie dialog did not appear.
    }

    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe'); 
    await frame.getByText('High Tatras', { exact: true }).click();




})