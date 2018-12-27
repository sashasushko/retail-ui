module.exports = {
  idle(client) {
    // client
    //   .url("http://github.com/nightwatchjs/nightwatch")
    //   .waitForElementVisible("body", 1000)
    //   .waitForElementVisible(".container h1 strong a")
    //   .assert.containsText(
    //     ".container h1 strong a",
    //     "nightwatch",
    //     "Checking project title is set to nightwatch"
    //   );
    client
      .url(
        "http://10.34.0.154:6060/iframe.html?selectedKind=Button&selectedStory=playground"
      )
      .saveScreenshot("./foo.png")
      .waitForElementVisible("#test-element", 1000)
      .expect.element("#test-element").to.be.visible;
    // .assert.containsText("#test-element", "123123")
    // client.expect.element("#test-element").to.be.visible;
    // client.click("#main", function(result) {
    //   console.log(result);
    // });
    // client.getValue("#main", function(result) {
    //   console.log(result);
    // });
    client
      .execute(
        function() {
          document.getElementById("test-element").innerHTML = "123";
          return document.documentElement.innerHTML;
        },
        function(result) {
          console.log(result);
        }
      )
      .saveScreenshot("./bar.png");
  }
};
