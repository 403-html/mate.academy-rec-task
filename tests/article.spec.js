import { test } from "../fixtures/base.js";
import { expect } from "playwright/test";
import { UserBuilder } from "../utils/user.builder.js";

test.describe("Article", () => {
  test.beforeEach(async ({ conduitPage, context }) => {
    const user = await new UserBuilder()
      .withUsername(`testuser-${Date.now()}`)
      .withEmail(`test-${Date.now()}@example.com`)
      .withPassword("password")
      .build();

    await conduitPage.goto();
    await context.addCookies([
      {
        name: "auth",
        value: user.user.token,
        url: process.env.BASE_URL,
      },
    ]);
    await conduitPage.page.evaluate(
      ([key, value]) => {
        localStorage.setItem(key, value);
      },
      ["user", JSON.stringify(user.user)],
    );

    await conduitPage.goto("/editor");
    await expect(conduitPage.locators.nav.profileLink).toBeVisible();
    await expect(conduitPage.locators.nav.profileLink).toHaveAttribute(
      "href",
      `/profile/${user.user.username}`,
    );
  });

  test("should create an article with valid data", async ({ conduitPage }) => {
    const article = {
      title: `Test Article ${Date.now()}`,
      about: "This is a test article",
      content: "This is the content of the test article",
      tags: ["test"],
    };

    await conduitPage.locators.article.titleInput.fill(article.title);
    await conduitPage.locators.article.aboutInput.fill(article.about);
    await conduitPage.locators.article.contentInput.fill(article.content);
    await conduitPage.locators.article.tagsInput.fill(article.tags.join(","));
    await conduitPage.locators.article.tagsInput.blur();
    await expect(conduitPage.locators.article.tagsPill).toHaveCount(1);
    await conduitPage.locators.article.publishButton.click();
    const response = await conduitPage.page.waitForResponse(
      (response) =>
        response.url().includes("/articles") && response.request().method() === "POST",
    );
    expect(response.ok()).toBeTruthy();
    await expect(
      conduitPage.locators.article.titleHeader,
    ).toHaveText(article.title);
  });

  test("should not create an article with missing title", async ({
    conduitPage,
  }) => {
    const article = {
      about: "This is a test article",
      content: "This is the content of the test article",
      tag: "test",
    };

    await conduitPage.locators.article.aboutInput.fill(article.about);
    await conduitPage.locators.article.contentInput.fill(article.content);
    await conduitPage.locators.article.tagsInput.fill(article.tag);
    await conduitPage.locators.article.tagsInput.blur();
    await expect(conduitPage.locators.article.tagsPill).toHaveCount(1);
    await conduitPage.locators.article.publishButton.click();
    await expect(conduitPage.locators.article.errorMessage).toHaveText(
      "0:Article title cannot be empty",
    );
  });

  test("should not create an article with missing content", async ({
    conduitPage,
  }) => {
    const article = {
      title: `Test Article ${Date.now()}`,
      about: "This is a test article",
      tag: "test",
    };

    await conduitPage.locators.article.titleInput.fill(article.title);
    await conduitPage.locators.article.aboutInput.fill(article.about);
    await conduitPage.locators.article.tagsInput.fill(article.tag);
    await conduitPage.locators.article.tagsInput.blur();
    await expect(conduitPage.locators.article.tagsPill).toHaveCount(1);
    await conduitPage.locators.article.publishButton.click();
    await expect(conduitPage.locators.article.errorMessage).toHaveText(
      "0:Article body cannot be empty",
    );
  });
});
