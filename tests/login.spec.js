import { test } from "../fixtures/base.js";
import { expect } from "playwright/test";
import { UserBuilder } from "../utils/user.builder.js";

test.describe("Login", () => {
  test.beforeEach(async ({ conduitPage }) => {
    await conduitPage.goto("/user/login");
    await expect(conduitPage.locators.login.header).toBeVisible();
    await expect(conduitPage.locators.login.header).toHaveText("Sign in");
  });

  test("should login with valid credentials", async ({ conduitPage }) => {
    const user = await new UserBuilder()
      .withUsername(`testuser-${Date.now()}-valid`)
      .withEmail(`test-${Date.now()}-valid@example.com`)
      .withPassword("password")
      .build();

    await conduitPage.locators.login.emailInput.fill(user.init.email);
    await conduitPage.locators.login.passwordInput.fill(user.init.password);
    await conduitPage.locators.login.signInButton.click();
    await expect(conduitPage.locators.login.header).not.toBeVisible();
    await expect(conduitPage.locators.nav.profileLink).toBeVisible();
    await expect(conduitPage.locators.nav.profileLink).toHaveAttribute(
      "href",
      `/profile/${user.init.username}`,
    );
  });

  test("should not login with missing credentials", async ({ conduitPage }) => {
    const user = await new UserBuilder()
      .withUsername(`testuser-${Date.now()}-missing`)
      .withEmail(`test-${Date.now()}-missing@example.com`)
      .withPassword("password")
      .build();
    await conduitPage.locators.login.emailInput.fill(user.init.email);
    await conduitPage.locators.login.signInButton.click();
    await expect(conduitPage.locators.login.errorMessageList).toBeVisible();
    await expect(conduitPage.locators.login.errorMessage).toHaveText(
      "password:can't be blank",
    );
  });
});
