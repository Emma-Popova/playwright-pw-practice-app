import {test, expect} from '@playwright/test'

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
    await frame.getByText('High Tatras', { exact: true }).dragTo(frame.locator('#trash'));

    //more precice controle
    await frame.locator('li', {hasText: "High Tatras 4"}).hover();
    await page.mouse.down();
    await frame.locator('#trash').hover();
    await page.mouse.up();

    await expect(frame.locator('#trash li h5')).toHaveText(["High Tatras", "High Tatras 4"]);



})