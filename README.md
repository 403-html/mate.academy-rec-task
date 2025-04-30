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

- Architecture is using Playwright + Javascript, even though we could use Typescript. It was specified in the task description to use Javascript.
- Setup is using default Playwright configuration (parallel workers, default 3 browser etc.), as any changes/needs weren't specified in the task description.
- The app doesn't have attributes such as `data-test`, `data-testid` or similar in the DOM, which is bad practice as test elements should be navigable, but I assume this is not a problem for this task. I used less preferred selectors such as `text` and `xpath` to find elements in the DOM.
- For ease of preparing article creation test case, we need user to be logged in. So for this I create for each test run fresh user with random email and password (app under test allows to use anything, doesn't need to validate if email was sent in client – we also assume it's right).
  - For this I encapsulated API class, which is used to call API endpoints in app.
  - I use registration API endpoint for this, but I didn't create registration test case, as it is not required in the task description. Only login and article creation test cases are required.
  - For new users I made builder so it's easier/more readible to define user data we would like to use.
- Added prettier and eslint just to make sure code is formatted and linted.
- There weren't any test steps specified in the task description, so I used my own judgement to create them, not to be too complex (e2e should be simple critical path tests, not too complex).
  - For login test case assertion I just checked if user get its name in the header after login
- For truely unique user names we need to use workers numbers, as even unix timestamp is not unique enough (if we run tests in parallel, we can get same timestamp for different runs – rarely, but still). So I used `Date.now()` + spec type + worker number to create unique user name.
- Locators list I've put in `data` folder, but in real life I'd put them in separate file where app code is (or shared folder/module), so they could be reused in app to create elements with same locators.
