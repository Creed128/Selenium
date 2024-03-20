require("chromedriver");
const { Builder, By, Key, until } = require("selenium-webdriver");
var assert = require("chai").assert;

describe("add note", function () {
    it("should add a note and display on the page", async function () {
        let driver = await new Builder().forBrowser("chrome").build();
        try {
            await driver.get("http://localhost:3000/");

            // Warten, bis das Eingabefeld sichtbar ist, und dann die Notiz eingeben
            let inputField = await driver.wait(until.elementLocated(By.xpath('//input')), 10000);
            await inputField.sendKeys("Hello Selenium", Key.RETURN);

            // Warten, bis die Notiz angezeigt wird, und den Text überprüfen
            let note = await driver.wait(until.elementLocated(By.xpath('//div[@class="note-name"]')), 10000);
            let noteText = await note.getText();
            assert.equal(noteText, "Hello Selenium");

            console.log("TEST PASSED");
        } finally {
            await driver.quit();
        }
    });
});
