import { locators } from "../data/locators";
import { config } from "dotenv";
config();

export class LoginPage {
  constructor(page) {
    if (!page) {
      throw new Error("Page is required");
    }
    this.page = page;
    this.locators = {
      login: {},
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
  }

  async goto(slug = "/user/login") {
    const url = `${process.env.BASE_URL}${slug}`;
    await this.page.goto(url);
  }
}
