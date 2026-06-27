import { test, expect } from '@playwright/test';

test('homepage loads successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Demo Web Shop/i);
});

test('homepage shows featured products', async ({ page }) => {
  await page.goto('/');
  const products = page.locator('.product-item');
  await expect(products.first()).toBeVisible();
});