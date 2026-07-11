import { test, expect } from "@playwright/test";

test.describe("Test date picker- exersize",()=> {
    test.beforeEach("Open page", async({page})=> {
        await page.goto("http://localhost:4200/pages/modal-overlays/tooltip");
    })

    test("Date picker-exersize 1 - fill" ,async({page})=>{
        await page.getByText("Forms").click();
        await page.getByText("Datepicker").click();

        const calendarInputField = page.getByPlaceholder("Form Picker");
        await calendarInputField.click();
        await calendarInputField.fill("02/02/2024");
        await calendarInputField.press("Enter");

    })

     test("Date picker - exersize 2 - select date" ,async({page})=>{
        await page.getByText("Forms").click();
        await page.getByText("Datepicker").click();

        const calendarInputField = page.getByPlaceholder("Form Picker");
        await calendarInputField.click();

        //select "15"
        //await page.locator('[class="day-cell ng-star-inserted"]').getByText("15").click();

        //select "1"
        await page.locator('[class="day-cell ng-star-inserted"]').getByText("1", {exact: true}).click();
        await expect(calendarInputField).toHaveValue("Jul 1, 2026");

         
     })
})