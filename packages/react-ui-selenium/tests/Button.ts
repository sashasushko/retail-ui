// import { it, describe } from "mocha";
import { expect } from "chai";
import { Builder, WebDriver, until, By } from "selenium-webdriver";

// Browsers

describe("Button", () => {
  let driver: WebDriver | null = null;
  before(async () => {
    console.log(Date.now());
    driver = await new Builder()
      .usingServer("http://screen-dbg:shot@grid.testkontur.ru/wd/hub")
      .withCapabilities({ browserName: "chrome" })
      .build();
    console.log(Date.now());
  });

  it("idle", async () => {
    await driver!.get(
      "http://10.35.2.16:6060/iframe.html?selectedKind=Button&selectedStory=playground"
    );
    await driver!.wait(until.elementLocated(By.id("test-element")));
    const text = await driver!
      .findElement(By.id("test-element"))
      .findElement(By.tagName("button"))
      .getText();
    // driver!.findElement(By.id("test-element")).takeScreenshot();
    // // diff?
    expect(text).to.equal("Hello", "Expected one to equal two.");
  });
});
