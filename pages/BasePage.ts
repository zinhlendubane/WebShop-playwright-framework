import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }


  async navigateTo(url: string) {
    console.log(`Navigating to: ${url}`);
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  async clickElement(locator: Locator) {
    console.log(`Clicking: ${locator}`);
    await locator.click();
  }

  async enterText(locator: Locator, text: string) {
    console.log(`Typing "${text}" into: ${locator}`);
    await locator.fill(text);
  }

  async selectOption(locator: Locator, value: string) {
    console.log(`Selecting "${value}" from: ${locator}`);
    await locator.selectOption(value);
  }

  async checkCheckbox(locator: Locator) {
    console.log(`Checking checkbox: ${locator}`);
    await locator.check();
  }

  async verifyElementVisible(locator: Locator) {
    console.log(`Verifying visible: ${locator}`);
    await expect(locator).toBeVisible();
  }

  async verifyElementHidden(locator: Locator) {
    console.log(`Verifying hidden: ${locator}`);
    await expect(locator).toBeHidden();
  }

  async verifyText(locator: Locator, text: string) {
    console.log(`Verifying text "${text}" in: ${locator}`);
    await expect(locator).toContainText(text);
  }

  async verifyUrl(pattern: string | RegExp) {
    console.log(`Verifying URL matches: ${pattern}`);
    await expect(this.page).toHaveURL(pattern);
  }

  async getText(locator: Locator): Promise<string> {
    const text = (await locator.textContent())?.trim() ?? '';
    console.log(`Got text: "${text}" from: ${locator}`);
    return text;
  }


  get notification(): Locator {
    return this.page.locator('#bar-notification');
  }
}