const puppeteer = require("puppeteer");

describe("Simple Puppeteer Test", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  it("should open the page and check the title", async () => {
    // Navigate to the desired URL
    await page.goto("http://localhost:3001");
    await page.waitForSelector(".logoLink");
    const text = await page.$eval(".logoLink", (e) => e.textContent);
    expect(text).toContain("LiveStyleWeb");
  });

  it("should open the page and check the title", async () => {
    // Navigate to the desired URL
    await page.goto("http://localhost:3001");
    await page.waitForSelector(".login");
    const text = await page.$eval(".login", (e) => e.textContent);
    expect(text).toContain("Logowanie");
  });

  it("should login successfully with valid credentials", async () => {
    // Assume your login screen has fields with IDs 'login', 'password', and a 'passwordButton'
    await page.goto("http://localhost:3001");

    const loginInput = await page.$("#login");
    await loginInput.type("test999@gmail.com");

    const passwordInput = await page.$("#password");
    await passwordInput.type("test123");

    const passwordButton = await page.$("#passwordButton");
    await Promise.all([passwordButton.click(), page.waitForNavigation()]);

    // Wait for the next screen or any indicator that login was successful.
    await page.waitForSelector(".addMovie");

    const text = await page.$eval(".addMovie", (e) => e.textContent);
    expect(text).toContain("Dodaj Przepis");
  });

  /*
  it("should login successfully with valid credentials", async () => {
    // Assume your login screen has fields with testIDs 'loginInput', 'passwordInput', and a 'loginButton'
    await page.goto("http://localhost:3001");

    const login = await page.$("#login");
    await login.type("test999@gmail.com");

    const password = await page.$("#password");
    await password.type("test123");

    const passwordButton = await page.$("#passwordButton");
    await passwordButton.click("#passwordButton");

    // Wait for the next screen or any indicator that login was successful.
    await page.waitForSelector(".addMovie");
    const text = await page.$eval(".addMovie", (e) => e.textContent);
    expect(text).toContain("Dodaj Przepis");
  });
  */
});
