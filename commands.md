# Objective
Enhance your expertise in Playwright by mastering its Command Line Interface (CLI). This task focuses on exploring various Playwright CLI commands and options, providing practical examples and scenarios to illustrate their usage and benefits. You'll learn how to adapt these commands to fit different testing requirements, optimizing your test automation workflows in Playwright.


## Instructions
1. **Running Tests**:
- Run all tests: Execute every test script in your project with `npx playwright test`
- Run a single test file: Target a specific file, e.g., `npx playwright test tests/login-page.spec.ts`
- Run a set of test files: Group multiple test files, e.g., `npx playwright test tests/user-flow/ tests/auth/`

2. **Filtering and Specifying Tests**:
- Run files by name pattern: Use patterns to target tests, e.g., `npx playwright test user-registration* login*`
- Run tests at a specific line: Target a test at a certain line in a file, e.g., `npx playwright test user-registration.spec.ts:42`
- Run tests by title: Execute tests with a specific title, e.g., `npx playwright test -g "should log in successfully"`

3. **Browser and Visualization Options**:
- Run tests in headed browsers: For visual debugging, use `npx playwright test --headed`
- Run tests in a specific browser: To test in a single browser, e.g., `npx playwright test --browser=firefox`

4. **Parallel Execution and Debugging**:
- Disable parallelization: For linear execution, use `npx playwright test --workers=1`
- Debug tests: Launch tests in debug mode with `npx playwright test --debug` to enable Playwright Inspector.

5. **Interactive Testing and Help**:
- Interactive UI mode: Run tests interactively with `npx playwright test --ui`, ideal for developing new tests.
- Help command: Access detailed command options with `npx playwright test --help`.

### Practical Examples:
- Combining Commands for Specific Scenarios:
    - Debugging a Specific Test in Headed Mode: `npx playwright test --headed --debug tests/login-page.spec.ts`
    - Running Tests in All Browsers: `npx playwright test --browser=all`
    - Running a Subset of Tests in Parallel: `npx playwright test --workers=4 tests/user-flow/`

- Advanced Options:
  - Custom Configuration File: Use a specific config file with `npx playwright test -c config/integration-tests-config.ts`
  - Running Tests with Custom Reporter: Set a custom reporter, e.g., `npx playwright test --reporter=json`
  - Sharding Tests for Distributed Execution: Divide tests into shards using `npx playwright test --shard=1/3`

## Tips and Hints
- Experiment with different CLI commands to tailor test runs according to your needs.

- Use environment variables alongside CLI commands for more dynamic test configurations.

- Regularly review Playwright's documentation for updates on CLI options.

## Expected Output
By the end of this task, you'll be adept at using Playwright's CLI for a wide range of testing scenarios. You will understand how to effectively utilize different commands and options to control test execution, debug issues, and optimize test performance in Playwright.