// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: "./tests",
  retries: 2,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName: "chromium",
    headless: true,
    screenshot: "on",
    trace: "retain on failure", //on off and retain on failure'
  },
};
module.exports = config;
