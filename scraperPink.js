const puppeteer = require("puppeteer");

(async function main() {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    submitMultiple(browser, page);
  } catch (e) {
    // console.log('our error', e);
  }
})();

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 900;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 500);
    });
  });
}

async function submitMultiple(browser, page) {
  await page.goto(`https://peticija.pink.rs/`);

  await autoScroll(page);

  await page.waitForSelector(".purple");

  await page.type("input[id=firstName]", "John");
  await page.type("input[id=surname]", "Peric");
  await page.type("input[id=email]", "pera@gmail.com");
  await page.type("input[id=postalNumber]", "465422");
  await page.type("input[id=phone]", "465422");

  await page.click("#noButton");

  await page.click("#conditions");

  const buttons = await page.$$(".purple");

  const submit = await buttons[1].click();

  for (let index = 0; index < 5000; index++) {
    await submitMultiple(browser, page);
  }
}
