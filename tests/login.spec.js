import { test } from "../fixtures/base.js";
import { expect } from "playwright/test";
import { UserBuilder } from "../utils/user.builder.js";

test.describe("Login", () => {
  let user;
  test.beforeEach(async ({ loginPage }, testInfo) => {
    const userString = `testuser-${Date.now()}-login-${testInfo.workerIndex}`;
    user = await new UserBuilder()
      .withUsername(userString)
      .withEmail(`${userString}@example.com`)
      .withPassword("password")
      .build();
    await loginPage.goto("/user/login");
    await expect(loginPage.locators.login.header).toBeVisible();
    await expect(loginPage.locators.login.header).toHaveText("Sign in");
  });

  test("should login with valid credentials", async ({
    conduitPage,
    loginPage,
  }) => {
    await loginPage.locators.login.emailInput.fill(user.init.email);
    await loginPage.locators.login.passwordInput.fill(user.init.password);
    await loginPage.locators.login.signInButton.click();
    await expect(loginPage.locators.login.header).not.toBeVisible();
    await expect(conduitPage.locators.nav.profileLink).toBeVisible();
    await expect(conduitPage.locators.nav.profileLink).toHaveAttribute(
      "href",
      `/profile/${user.init.username}`,
    );
  });

  test("should not login with missing credentials", async ({ loginPage }) => {
    await loginPage.locators.login.emailInput.fill(user.init.email);
    await loginPage.locators.login.signInButton.click();
    await expect(loginPage.locators.login.errorMessage).toHaveText(
      "password:can't be blank",
    );
  });
});
