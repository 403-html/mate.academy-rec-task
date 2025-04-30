export const locators = {
  login: {
    header: `//*[@id="__next"]/div/div/div/div/h1`,
    emailInput: `//*[@id="__next"]/div/div/div/div/form/fieldset/fieldset[1]/input`,
    passwordInput: `//*[@id="__next"]/div/div/div/div/form/fieldset/fieldset[2]/input`,
    signInButton: `//*[@id="__next"]/div/div/div/div/form/fieldset/button`,
    errorMessage: `//*[@id="__next"]/div/div/div/div/ul/li`,
  },
  article: {
    titleInput: `//*[@id="__next"]/div/div/div/div/form/fieldset/fieldset[1]/input`,
    aboutInput: `//*[@id="__next"]/div/div/div/div/form/fieldset/fieldset[2]/input`,
    contentInput: `//*[@id="__next"]/div/div/div/div/form/fieldset/fieldset[3]/textarea`,
    tagsInput: `//*[@id="__next"]/div/div/div/div/form/fieldset/fieldset[4]/input`,
    tagsPill: `//*[@id="__next"]/div/div/div/div/form/fieldset/fieldset[4]/div/span`,
    publishButton: `//*[@id="__next"]/div/div/div/div/form/fieldset/button`,
    errorMessage: `//*[@id="__next"]/div/div/div/div/ul/li`,
    titleHeader: `//*[@id="__next"]/div/div[1]/div/h1`,
  },
  nav: {
    profileLink: `//*[@id="__next"]/nav/div/ul/li[4]/a`,
  },
};