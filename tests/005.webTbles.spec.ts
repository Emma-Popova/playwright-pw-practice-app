import { test, expect } from "@playwright/test";
import { link } from "fs";

test.describe("Test table - exersize 1", () => {
  test.beforeEach("Open page", async ({ page }) => {
    await page.goto("http://localhost:4200/pages/modal-overlays/tooltip");
  });

  test("Web Tables", async ({ page }) => {
    await page.getByRole("link", { name: "Tables & Data" }).click();
    await page.getByRole("link", { name: "Smart Table" }).click();

    const targetRow = page.getByRole("row", { name: "twitter@outlook.com" });
    await targetRow.locator(".nb-edit").click();

    await page.locator("input-editor").getByPlaceholder("Age").clear();
    await page.locator("input-editor").getByPlaceholder("Age").fill("35");
    await page.locator(".nb-checkmark").click();

   
    //get the row based on the value in the specific column 
    //by id ... and filter by first column....
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click();

    const targetRowById = page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')});
    await targetRowById.locator('.nb-edit').click();
    await page.locator('input-editor').getByPlaceholder('E-mail').clear();
    await page.locator('input-editor').getByPlaceholder('E-mail').fill("test@test.com");
    await page.locator('.nb-checkmark').click();
    await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com');

    //test filter of the table
    const ages =["20", "30", "40"];

    for(let age of ages){

        await page.locator('input-filter').getByPlaceholder("Age").clear();
        await page.locator('input-filter').getByPlaceholder("Age").fill(age);
        //due to data delay we are adding timeout
        await page.waitForTimeout(500);
        const ageRows = page.locator('tbody tr');

        for(let row of await ageRows.all()){
            const cellValue = await row.locator('td').last().textContent();
            
            expect(cellValue).toEqual(age);
        }
    }

        });

   });
