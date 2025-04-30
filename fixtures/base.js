import { test as base } from "@playwright/test";
import { ConduitPage } from "./conduit.page";
import { ArticlePage } from "./article.page";
import { LoginPage } from "./login.page";

import { config } from "dotenv";
config();

export const test = base.extend({
  conduitPage: async ({ page }, use) => {
    const conductPage = new ConduitPage(page);
    await use(conductPage);
  },
  articlePage: async ({ page }, use) => {
    const articlePage = new ArticlePage(page);
    await use(articlePage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});
