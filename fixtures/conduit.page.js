import { locators } from "../data/locators";
import { config } from "dotenv";
config();

export class ConduitPage {
  constructor(page, browser) {
    if (!page) {
      throw new Error("Page is required");
    }
    if (!browser) {
      throw new Error("Browser is required");
    }
    this.page = page;
    this.browser = browser;
    this.locators = {
      login: {},
      article: {},
      nav: {},
    }
    this.setupLocators();
  }

  setupLocators() {
    this.locators.login.header = this.page.locator(locators.login.header);
    this.locators.login.emailInput = this.page.locator(
      locators.login.emailInput
    );
    this.locators.login.passwordInput = this.page.locator(
      locators.login.passwordInput
    );
    this.locators.login.signInButton = this.page.locator(
      locators.login.signInButton
    );
    this.locators.login.errorMessageList = this.page.locator(
      locators.login.errorMessageList
    );
    this.locators.login.errorMessage = this.page.locator(
      locators.login.errorMessage
    );

    this.locators.article.titleInput = this.page.locator(locators.article.titleInput);
    this.locators.article.aboutInput = this.page.locator(locators.article.aboutInput);
    this.locators.article.contentInput = this.page.locator(
      locators.article.contentInput
    );
    this.locators.article.tagsInput = this.page.locator(locators.article.tagsInput);
    this.locators.article.publishButton = this.page.locator(
      locators.article.publishButton
    );
    this.locators.nav.profileLink = this.page.locator(locators.nav.profileLink);
    
  }

  async goto(slug = "") {
    const url = `${process.env.BASE_URL}${slug}`;
    await this.page.goto(url);
  }

  async saveStorage(userData) {
    if (!userData) {
      throw new Error("User data is required to save session");
    }
    await this.browser.newContext({
      storageState: {
        origin: process.env.BASE_URL,
        localStorage: [
          {
            name: "user",
            value: JSON.stringify(userData),
          },
        ],
      },
    });
  }
}
