const puppeteer = require('puppeteer');

describe('Todo React', () => {
    let browser
    let page

    beforeAll(async () => {
        browser = await puppeteer.launch({headless:false})
    })

    afterEach(async () => {
        await page.close()
      })
    
      afterAll(async () => {
        await browser.close()
      })

      describe('add task on the list', () => {
        beforeEach(async () => {
          page = await browser.newPage()
          await page.goto('http://localhost:3000')
        })

      it('should be possible to add task to the list', async () => {
          const taskInputField = await page.$x('//input[@placeholder="Enter task"]')
          const taskToAdd = "New Task"
          await taskInputField[0].click() 
          await taskInputField[0].type(taskToAdd)

          await page.keyboard.press('Enter')

          const lists = await page.$x("//div[@class='list']/p/input");

          let toDo;

          for( let list of lists ) {
            toDo = await page.evaluate(el => el.getAttribute("value"), list);
          }
          
          expect(toDo).toBe(taskToAdd)
        })
      })
})