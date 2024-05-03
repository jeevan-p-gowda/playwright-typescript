import { defineConfig, devices } from '@playwright/test';
import dotenv from "dotenv";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();
dotenv.config({
    path: `${process.cwd()}/env/${process.env.ENV}.env`,
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
    timeout: 60000, // 60 seconds
    workers: 1,
    reporter: [
        [
            "html", //https://playwright.dev/docs/test-reporters
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
        },
        {
            name: "parallel",
            use: {
                ...devices["Desktop Chrome"],
                channel: "chrome",
            },
            fullyParallel: true,
            testDir: './tests/parallel',
            testMatch: "test.suite*.spec.ts",
        },
        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"],
                headless: true
             },
        },
        // {
        //     name: "safari",
        //     use: { ...devices["Desktop Safari"] },
        // },
    ],
    use: {
        // baseURL: process.env.BASE_URL,
        baseURL : "https://web-playground.ultralesson.com/"
        // Other use property fields...
    },
});
