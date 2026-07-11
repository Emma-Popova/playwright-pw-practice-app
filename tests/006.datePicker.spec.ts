import { test, expect } from "@playwright/test";

test.describe("Test date picker- exersize 1",()=> {
    test.beforeEach("Open page", async({page})=> {
        await page.goto("http://localhost:4200/pages/modal-overlays/tooltip");
    })

    test("Datepicker" ,async({page})=>{
        await page.getByText("Forms").click();
        await page.getByText("Datepicker").click();

        const calendarInputField = page.getByPlaceholder("Form Picker");
        await calendarInputField.click();
        await calendarInputField.fill("02/02/2024");
        await calendarInputField.press("Enter");

    })

})