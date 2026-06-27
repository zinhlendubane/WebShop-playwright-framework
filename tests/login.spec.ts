import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {

  test('should show login form elements', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.verifyElementVisible(loginPage.emailInput);
    await loginPage.verifyElementVisible(loginPage.passwordInput);
    await loginPage.verifyElementVisible(loginPage.loginButton);
  });

  test('should fail with wrong credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('wrong@email.com', 'wrongpassword');

    await loginPage.verifyLoginFailed();
  });

  test('should login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('your@email.com', 'yourpassword'); // 👈 your real account

    await loginPage.verifyLoginSuccessful('your@email.com');
  });

});
