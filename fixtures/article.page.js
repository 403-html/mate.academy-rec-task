import { locators } from "../data/locators";
import { config } from "dotenv";
config();

export class ArticlePage {
  constructor(page) {
    if (!page) {
      throw new Error("Page is required");
    }
    this.page = page;
    this.locators = {
      article: {},
    };
    this.setupLocators();
  }

  setupLocators() {
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
  }

  async goto(slug = "/editor") {
    const url = `${process.env.BASE_URL}${slug}`;
    await this.page.goto(url);
  }
}
