// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Teste2', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('Teste2', async function() {
    // Test name: Teste2
    // Step # | name | target | value
    // 1 | open | https://www.google.com/ | 
    await driver.get("https://www.google.com/")
    // 2 | setWindowSize | 1374x1074 | 
    await driver.manage().window().setRect({ width: 1374, height: 1074 })
    // 3 | click | id=APjFqb | 
    await driver.findElement(By.id("APjFqb")).click()
    // 4 | click | id=APjFqb | 
    await driver.findElement(By.id("APjFqb")).click()
    // 5 | type | id=APjFqb | iphone pro max 15
    await driver.findElement(By.id("APjFqb")).sendKeys("iphone pro max 15")
    await driver.findElement(By.id("APjFqb")).sendKeys(Keys.ENTER)
    // 6 | click | css=.g:nth-child(13) .LC20lb | 
    await driver.findElement(By.css(".g:nth-child(13) .LC20lb")).click()
    // 7 | click | css=#\3Ar6\3A_label .form-selector-left-col | 
    await driver.findElement(By.css("#\\3Ar6\\3A_label .form-selector-left-col")).click()
    // 8 | click | css=.colornav-item:nth-child(4) .colornav-swatch | 
    await driver.findElement(By.css(".colornav-item:nth-child(4) .colornav-swatch")).click()
    // 9 | runScript | window.scrollTo(0,502) | 
    await driver.executeScript("window.scrollTo(0,502)")
    // 10 | click | id=:rg:_label | 
    await driver.findElement(By.id(":rg:_label")).click()
    // 11 | runScript | window.scrollTo(0,1218) | 
    await driver.executeScript("window.scrollTo(0,1218)")
    // 12 | click | css=.label | 
    await driver.findElement(By.css(".label")).click()
    // 13 | mouseOver | css=.label | 
    {
      const element = await driver.findElement(By.css(".label"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
  })
})
