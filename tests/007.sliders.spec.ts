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
        test("sliders- Mouse movement - 1", async({page})=>{
        await page.getByText("IoT Dashboard").click();
        
        const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');
        await tempBox.scrollIntoViewIfNeeded();

        const box = await tempBox.boundingBox();

        const x = box!.x + box!.width / 2;
         const y = box!.y + box!.height / 2;
        await page.mouse.move(x, y);
        await page.mouse.down();
        await page.mouse.move(x+100, y);
        await page.mouse.move(x + 100, y + 100);
        await page.mouse.up();
        await expect(tempBox).toContainText('30');
    })
            test("sliders- Mouse movement - 2", async({page})=>{
        await page.getByText("IoT Dashboard").click();
        
        const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');
        await tempBox.scrollIntoViewIfNeeded();

        const box = await tempBox.boundingBox();

        const x = box!.x + box!.width / 2;
         const y = box!.y + box!.height / 2;
        await page.mouse.move(x, y);
        await page.mouse.down();
        await page.mouse.move(x -100, y);
        await page.mouse.move(x -100, y +100);
        await page.mouse.up();
        await expect(tempBox).toContainText('13');
    })

})