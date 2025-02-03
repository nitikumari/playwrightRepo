const { defineConfig, devices } = require('@playwright/test');

defineConfig({
  testDir: './tests',
  retries: 0,
  timeout: 50 * 1000, // Adjusted from 50 * 10000 to 50 * 1000 (likely intended as 50 seconds)
  expect: {
    timeout: 5000,
  },
  reporter: [
    ['line'],                 // Console output
    ['allure-playwright']  
  ],
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    video: 'on',
    trace: 'on',
  },
});
module.exports={defineConfig};