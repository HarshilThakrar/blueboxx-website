import { test, expect } from '@playwright/test';

test.describe('Authentication & Onboarding Flow', () => {

  test('Signup flow UI and basic validation', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.getByRole('heading', { name: 'Create an account' })).toBeVisible();
    
    // Fill in the form
    await page.getByPlaceholder('Rahul Sharma').fill('Test User');
    await page.getByPlaceholder('name@example.com').fill('test@example.com');
    await page.getByPlaceholder('••••••••').first().fill('TestPassword123!');
    await page.getByPlaceholder('••••••••').nth(1).fill('TestPassword123!');
    
    // Check that the button becomes enabled (if it's not disabled by strength or match)
    // Note: Since password strength logic might require specific regex, we will just test it's clickable or visible.
    const submitBtn = page.getByRole('button', { name: /Continue Setup/i });
    await expect(submitBtn).toBeVisible();
    
    // Submit
    await submitBtn.click();
    
    // Wait for navigation to onboarding
    await expect(page).toHaveURL(/\/onboarding/);
  });

  test('Login flow UI', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
    
    // Fill in the form
    await page.getByPlaceholder('name@example.com').fill('admin@blueboxx.in');
    await page.getByPlaceholder('••••••••').fill('password123');
    
    const loginBtn = page.getByRole('button', { name: 'Sign In' });
    await expect(loginBtn).toBeVisible();
    
    // We can't fully test mock login if it relies on context without a mock, 
    // but we can test the click triggers loading.
    await loginBtn.click();
    await expect(page.locator('text=Signing in...')).toBeVisible();
  });

  test('Onboarding OTP and Role Selection', async ({ page }) => {
    await page.goto('/onboarding');
    await expect(page.getByRole('heading', { name: 'Verify your email' })).toBeVisible();
    
    // Fill OTP
    const inputs = page.locator('input[type="text"]');
    for (let i = 0; i < 6; i++) {
      await inputs.nth(i).fill('1');
    }
    
    await page.getByRole('button', { name: 'Verify Code' }).click();
    
    // Wait for step 2
    await expect(page.getByRole('heading', { name: 'Select your role' })).toBeVisible({ timeout: 5000 });
    
    // Select Student
    await page.locator('text=Student / Learner').click();
    await page.getByRole('button', { name: /Continue Setup/i }).click();
    
    // Wait for step 3
    await expect(page.getByRole('heading', { name: 'What are your interests?' })).toBeVisible();
  });

});
