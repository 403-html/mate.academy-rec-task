# mate.academy-rec-task

Technical evaluation task for QA mentor role in mate.academy

## Task

Create two positive test cases:

- Login (<https://conduit.mate.academy/user/login>)
- Article Creation (<https://conduit.mate.academy/editor>)

> _Optional:_ Add negative test cases for both scenarios.

## Project setup

> _Prerequisites:_ Node.js (at least `v18, v20` or `v22`) and npm should be installed on your machine. You can download it from [Node.js official website](https://nodejs.org/)), or use nvm (Node Version Manager) to install and manage Node.js versions.

1. Clone repository and navigate to the project directory:

   ```bash
   $ git clone git@github.com:403-html/mate.academy-rec-task.git
   $ cd mate.academy-rec-task
   ```

2. Install the dependencies:

   ```bash
   $ npm install
   ```

3. Install Playwright browsers:

   ```bash
   $ npx playwright install
   ```

4. Run the tests:

   ```bash
   $ npm run tests
   ```

## Assumptions/Notes

- Architecture is using Playwright + Javascript *as specified in the task instructions*, although TypeScript could have been a viable alternative for enhanced type safety.
- Setup is using default Playwright configuration (parallel workers, default 3 browser etc.), as any changes/needs weren't specified in the task description.
- The application lacks testing-specific attributes like `data-test` or `data-testid`, which are generally considered best practice for testability. For the purpose of this task, `xpath` selectors were used to locate elements.
- For ease of preparing article creation test case, we need user to be logged in. So for this I create for each test run fresh user with random email and password (app under test allows to use anything, doesn't need to validate if email was sent in client – we also assume it's right).
  - For this I encapsulated API class, which is used to call API endpoints in app.
  - I use registration API endpoint for this, but I didn't create registration test case, as it is not required in the task description. Only login and article creation test cases are required.
  - For new users I made builder so it's easier/more readible to define user data we would like to use.
- Added prettier and eslint just to make sure code is formatted and linted.
- There weren't any test steps specified in the task description, so I used my own judgement to create them, not to be too complex (e2e should be simple critical path tests, not too complex).
  - For login test case assertion I just checked if user get its name in the header after login
- To ensure unique usernames, a combination of the Unix timestamp, spec type, and worker number is used, preventing conflicts during parallel test execution.
- Locators are stored in the `data` folder for simplicity. In a real-world scenario, they would ideally reside in a shared module to promote reusability across the application and test suites.