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

     test("Date picker - exersize 3 - select date from calendar + 1 day", async({page})=> {
        await page.getByText("Forms").click();
        await page.getByText("Datepicker").click();

        const calendarInputField = page.getByPlaceholder("Form Picker");
        await calendarInputField.click();

        let date = new Date();
        date.setDate(date.getDate() + 1); // Add 1 day to the current date
        const expectedDate = date.getDate().toString();
        const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' });
        const expectedYear = date.getFullYear();
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

        await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click();
        await expect(calendarInputField).toHaveValue(dateToAssert);
     })

     test("Date picker - exersize 4- select date from calendar + days in the next month", async({page})=> {
        await page.getByText("Forms").click();
        await page.getByText("Datepicker").click();

        const calendarInputField = page.getByPlaceholder("Form Picker");
        await calendarInputField.click();

        let date = new Date();
        date.setDate(date.getDate() + 19); // Add days to the current date in the next month
        const expectedDate = date.getDate().toString();
        const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' });
         const expectedMontLong = date.toLocaleString('En-US', { month: 'long' });
        const expectedYear = date.getFullYear();

        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

        let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
        const expectedMonthAndYear = `${expectedMontLong} ${expectedYear}`;

        while(!calendarMonthAndYear?.includes(expectedMonthAndYear)){
            await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
            calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
        }

        await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click();
        await expect(calendarInputField).toHaveValue(dateToAssert);
  })
})