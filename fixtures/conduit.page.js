import { locators } from "../data/locators";
import { config } from "dotenv";
config();

export class ConduitPage {
  constructor(page, browser, context) {
    if (!page) {
      throw new Error("Page is required");
    }
    if (!browser) {
      throw new Error("Browser is required");
    }
    if (!context) {
      throw new Error("Context is required");
    }
    this.context = context;
    this.page = page;
    this.browser = browser;
    this.locators = {
      login: {},
      article: {},
      nav: {},
    };
    this.setupLocators();
  }

  setupLocators() {
    this.locators.login.header = this.page.locator(locators.login.header);
    this.locators.login.emailInput = this.page.locator(
      locators.login.emailInput,
    );
    this.locators.login.passwordInput = this.page.locator(
      locators.login.passwordInput,
    );
    this.locators.login.signInButton = this.page.locator(
      locators.login.signInButton,
    );
    this.locators.login.errorMessage = this.page.locator(
      locators.login.errorMessage,
    );

    this.locators.article.titleInput = this.page.locator(
      locators.article.titleInput,
    );
    this.locators.article.aboutInput = this.page.locator(
      locators.article.aboutInput,
    );
    this.locators.article.contentInput = this.page.locator(
      locators.article.contentInput,
    );
    this.locators.article.tagsInput = this.page.locator(
      locators.article.tagsInput,
    );
    this.locators.article.tagsPill = this.page.locator(
      locators.article.tagsPill,
    );
    this.locators.article.publishButton = this.page.locator(
      locators.article.publishButton,
    );
    this.locators.article.titleHeader = this.page.locator(
      locators.article.titleHeader,
    );
    this.locators.article.errorMessage = this.page.locator(
      locators.article.errorMessage,
    );

    this.locators.nav.profileLink = this.page.locator(locators.nav.profileLink);
  }

  async goto(slug = "") {
    const url = `${process.env.BASE_URL}${slug}`;
    await this.page.goto(url);
  }
}