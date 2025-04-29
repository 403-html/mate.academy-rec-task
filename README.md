# mate.academy-rec-task

Technical evaluation task for QA mentor role in mate.academy

## Task

Create two positive test cases:

- Login (https://conduit.mate.academy/user/login)
- Article Creation (https://conduit.mate.academy/editor)

> *Optional:* Add negative test cases for both scenarios.

## Project setup

> *Prerequisites:* Node.js (at least `v18, v20` or `v22`) and npm should be installed on your machine. You can download it from [Node.js official website](https://nodejs.org/)), or use nvm (Node Version Manager) to install and manage Node.js versions.

1. Clone the repository:
   ```bash
   $ git clone git@github.com:403-html/mate.academy-rec-task.git
   ```
2. Navigate to the project directory:
   ```bash
   $ cd mate.academy-rec-task
   ```
3. Install the dependencies:
   ```bash
   $ npm install
   ```
4. Install Playwright browsers:
   ```bash
   $ npx playwright install
   ```
5. Run the tests:
   ```bash
   $ npm run tests
   ```

## Assumptions/Notes

- Architecture is using Playwright + Javascript, even though we could use Typescript. It was specified in the task description to use Javascript.
- Setup is using default Playwright configuration (parallel workers, default 3 browser etc.), as any changes/needs weren't specified in the task description.
- For ease of preparing article creation test case, we need user to be logged in. So for this I create for each test run fresh user with random email and password (app under test allows to use anything, doesn't need to validate if email was sent in client – we also assume it's right).
  - For this I encapsulated API class, which is used to call API endpoints in app.
  - I use registration API endpoint for this, but I didn't create registration test case, as it is not required in the task description. Only login and article creation test cases are required.
  - For new users I made builder so it's easier/more readible to define user data we would like to use.
- Added prettier and eslint just to make sure code is formatted and linted.