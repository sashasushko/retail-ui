import { Builder, WebDriver } from "selenium-webdriver";
import Mocha, { Suite } from "mocha";

interface Config {
  gridUrl: string;
  hostUrl: string;
  browsers: { [key: string]: { browserName: string } };
}

const config: Config = {
  gridUrl: "http://screen-dbg:shot@grid.testkontur.ru/wd/hub",
  hostUrl: "http://10.34.0.154:6060/iframe.html",
  browsers: {
    chrome: { browserName: "chrome" },
    firefox: { browserName: "firefox" },
    ie11: { browserName: "internet explorer" }
  }
};

console.log("init");

// @ts-ignore
module.exports = Mocha.interfaces.selenium = function(suite: Suite) {
  console.log("suite");

  // // @ts-ignore
  // const common = require("mocha/lib/interfaces/common")([suite], context);
  // // @ts-ignore
  // context.run = mocha.options.delay && common.runWithSuite(suite);

  const browsers: Array<{ name: string; browser: WebDriver }> = [];

  suite.beforeAll(async () => {
    console.log("beforeAll");
    // tslint:disable-next-line: forin
    for (const name in config.browsers) {
      const browser = await new Builder()
        .usingServer(config.gridUrl)
        .withCapabilities(config.browsers[name])
        .build();
      browsers.push({ name, browser });
    }
  });

  suite.on("pre-require", context => {
    console.log("pre-require");
    const { describe } = context;
    // @ts-ignore
    context.log = msg => console.log(msg);
    // @ts-ignore
    context.describe = function() {
      console.log("describe", arguments[0]);
      // @ts-ignore
      return describe.apply(this, arguments);
    };
  });
};

// browsers
// parallel
// TODO react-selenium-testing

// simple API
/*

describe("Button", () => {
  describe("Story", browser => {
    it("scenario", () => {
      // click
      // hover
      // type
    });

    it("idle", () => {
      browser
        .getElement("#test-element")
        .capture("hover", { ignore: "loader" })
        .capture("click", '[class^="123"]')
        .capture("type", "1234") // type 1
        .capture("type", "1234"); // type 2
    });

    it("");
  });
});

*/

// Draft

/*
class Browser {
  constructor(config) {
    this.config = config;
    this.context = [];
  }

  async setStory(story) {
    this.driver = await new Builder()
      .usingServer(this.config.gridUrl)
      .withCapabilities(this.config.capabilities)
      .build();
    await this.driver.get(
      this.config.hostUrl +
        `?selectedKind=${this.config.kind}&selectedStory=${story}`
    );
  }

  getElement(selector) {
    this.queue.push({
      selector: [...(this.queue.slice(-1)[0].selector || []), selector]
    });
    this.context.push(selector);
    return this;
  }

  async flush() {}
}
*/

/*
const { describe, it } = context;

    context.describe = function(title, fn) {
      describe.call(this, title, async function() {
        if (fn.length == 1) {
          if (!this.browser) {
            throw new Error("You can't use `browser` on root level describe");
          }
          await this.browser.setStory(title);

          return fn.call(this, this.browser);
        }
        this.browser = new Browser({ ...config, kind: title });
        return fn.call(this);
      });
    };

    context.it = function(title, fn) {
      it.call(this, title, async function() {
        fn.call(this);

        await browser.flush();
      });
    };
    */
