import { test as base } from "@playwright/test";
import { ConduitPage } from "./conduit.page";

import { config } from "dotenv";
config()

export const test = base.extend({
  conduitPage: async ({ page, browser }, use) => {
    const conductPage = new ConduitPage(page, browser);
    await use(conductPage);
  },
});
