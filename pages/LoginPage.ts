import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

  private readonly pageUrl: string = '/login';

  constructor(page: Page) {
    super(page);
  }

  get emailInput(): Locator {
    return this.page.locator('#Email');
  }

  get passwordInput(): Locator {
    return this.page.locator('#Password');
  }

  get loginButton(): Locator {
    return this.page.locator('input[value="Log in"]');
  }

  get errorMessage(): Locator {
    return this.page.locator('.validation-summary-errors');
  }

  get accountLink(): Locator {
    return this.page.locator('.account');
  }

  async goto() {
    await this.navigateTo(this.pageUrl);
  }

  async login(email: string, password: string) {
    await this.enterText(this.emailInput, email);
    await this.enterText(this.passwordInput, password);
    await this.clickElement(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }


  async verifyLoginSuccessful(email: string) {
    await this.verifyElementVisible(this.accountLink);
    await this.verifyText(this.accountLink, email);
  }

  async verifyLoginFailed() {
    await this.verifyElementVisible(this.errorMessage);
    await this.verifyText(this.errorMessage, 'Login was unsuccessful');
  }

}