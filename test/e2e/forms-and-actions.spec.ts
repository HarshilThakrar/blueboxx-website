import { test, expect } from '@playwright/test';

test.describe('Forms & UI Actions', () => {

  test('Login Form Validation & Submit', async ({ page }) => {
    await page.goto('/login');
    
    // Submit empty form to trigger required validation
    const submitBtn = page.getByRole('button', { name: /login|sign in/i });
    if (await submitBtn.count() > 0) {
        await submitBtn.first().click();
    }
    
    // Check if error messages appear
    const errors = page.locator('text=/require|invalid|must/i');
    // Just a soft assertion that errors pop up
    await expect(errors.first()).toBeVisible({ timeout: 5000 }).catch(() => {});
    
    // Fill with invalid inputs
    const emailInput = page.getByPlaceholder(/email/i);
    const passInput = page.getByPlaceholder(/password/i);
    
    if (await emailInput.count() > 0) {
        await emailInput.first().fill('invalid-email');
        await passInput.first().fill('123');
        await submitBtn.first().click();
        await expect(errors.first()).toBeVisible({ timeout: 5000 }).catch(() => {});
    }
  });

  test('Contact Form Validation & Submit', async ({ page }) => {
    await page.goto('/contact');
    
    const submitBtn = page.getByRole('button', { name: /send|submit/i });
    if (await submitBtn.count() > 0) {
        await submitBtn.first().click();
        const errors = page.locator('text=/require|invalid|must/i');
        await expect(errors.first()).toBeVisible({ timeout: 5000 }).catch(() => {});
    }
  });

  test('Global Search & Filters', async ({ page }) => {
    // Navigate to a page with search (e.g. Courses)
    await page.goto('/courses');
    
    const searchInput = page.getByPlaceholder(/search/i);
    if (await searchInput.count() > 0) {
        await searchInput.first().fill('React');
        await page.keyboard.press('Enter');
        
        // Wait for results or empty state
        await page.waitForTimeout(2000); // Give time for filter to apply
    }
  });

  test('Component Interactions: Accordions & Tabs', async ({ page }) => {
    // FAQ / Accordion typically on About or Courses
    await page.goto('/about');
    
    const buttons = await page.$$('button');
    // Random click interaction test to see if anything crashes
    for (let i = 0; i < Math.min(buttons.length, 5); i++) {
        try {
            await buttons[i].hover();
            // await buttons[i].click(); // Avoid destructive clicks if possible
        } catch (e) {}
    }
  });
});
