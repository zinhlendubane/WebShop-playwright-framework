import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { TEST_USER } from '../src/test-data/users';

test.describe('Login', () => {

  test('should show login form elements', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate to login page', async () => {
      await loginPage.goto();
    });

    await test.step('Verify form elements are visible', async () => {
      await loginPage.verifyElementVisible(loginPage.emailInput);
      await loginPage.verifyElementVisible(loginPage.passwordInput);
      await loginPage.verifyElementVisible(loginPage.loginButton);
    });
  });

  test('should fail with wrong credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate to login page', async () => {
      await loginPage.goto();
    });

    await test.step('Enter wrong credentials', async () => {
      await loginPage.login('wrong@email.com', 'wrongpassword');
    });

    await test.step('Verify error message', async () => {
      await loginPage.verifyLoginFailed();
    });
  });

  test('should login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate to login page', async () => {
      await loginPage.goto();
    });

    await test.step('Enter valid credentials', async () => {
      await loginPage.login(TEST_USER.email, TEST_USER.password); // 👈 from users.ts
    });

    await test.step('Verify login was successful', async () => {
      await loginPage.verifyLoginSuccessful();
    });
  });

});