module.exports = {
  preset: "jest-puppeteer",
  testMatch: ["**/tests/*.e2e.test.js"],
  verbose: true,
  testEnvironment: "jsdom",
  useESM: true,
};
