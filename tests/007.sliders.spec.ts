import { test, expect } from "@playwright/test";


test.describe("Sliders",()=> {
    test.beforeEach("Open page", async({page})=> {
        await page.goto("http://localhost:4200/pages/modal-overlays/tooltip");
    })

    test("sliders- Update attribute", async({page})=>{
          await page.getByText("IoT Dashboard").click();
        //Update attribute
        const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle');
        await tempGauge.evaluate( node =>{
            node.setAttribute('cx', '232.630')
            node.setAttribute('cy', '232.630')
        })
        await tempGauge.click();
    })

})