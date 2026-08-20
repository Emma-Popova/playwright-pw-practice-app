import { Page, expect } from "@playwright/test";

export class DatePickerPage {
    
    private readonly page: Page;
    
    constructor(page: Page){
        this.page = page;
    }

    async selectCommonDatepickerDateFromToday(daysFromToday: number){
        
       
               const calendarInputField = this.page.getByPlaceholder("Form Picker");
               await calendarInputField.click();
       
               const date = new Date();
               date.setDate(date.getDate() + daysFromToday); 
               const expectedDay = date.getDate().toString();
               const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' });
               const expectedMontLong = date.toLocaleString('En-US', { month: 'long' });
               const expectedYear = date.getFullYear();
               const expectedDate = `${expectedMonthShort} ${expectedDay}, ${expectedYear}`;
       
               let currentMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
               const expectedMonthAndYear = `${expectedMontLong} ${expectedYear}`;
       
               while(!currentMonthAndYear?.includes(expectedMonthAndYear)){
                   await this.page.locator('.next-month').click();
                   currentMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
               }
       
               await this.page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDay, {exact: true}).click();
               await expect(calendarInputField).toHaveValue(expectedDate);
    }
}