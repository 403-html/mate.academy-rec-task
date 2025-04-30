import { locators } from "../data/locators";
import { config } from "dotenv";
config();

export class ConduitPage {
  constructor(page) {
    if (!page) {
      throw new Error("Page is required");
    }
    this.page = page;
    this.locators = {
      nav: {},
    };
    this.setupLocators();
  }

  setupLocators() {
    this.locators.nav.profileLink = this.page.locator(locators.nav.profileLink);
  }

  async goto(slug = "") {
    const url = `${process.env.BASE_URL}${slug}`;
    await this.page.goto(url);
  }
}
