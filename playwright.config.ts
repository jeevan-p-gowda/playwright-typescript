import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
    timeout: 60000, // 60 seconds
    workers: 1,
    reporter: [
        [
            "html",
            {
                open: "never",
            },
        ],
    ],
    projects: [
        {
            name: "setup",
            testDir: "./globals",
            testMatch: "setup.ts",
            teardown: "teardown",
        },
        {
            name: "teardown",
            testDir: "./globals",
            testMatch: "teardown.ts",
        },
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"], headless: false, channel: "chrome", testIdAttribute: "data-test-id" }, // Executing in the Chrome channel
            dependencies: ["setup"], // Important for chromium project to use setup process as dependency before initiating the tests in chromium suite
        },
        {
            name: "mobile_emulation",
            use: {
                ...devices["iPhone 12 Mini"],
                headless: false
            },
            testMatch: ["**/*.me.spec.ts"]
        }
    ],
});
