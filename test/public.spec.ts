import { test, expect } from '@playwright/test';

test.describe('Public Pages', () => {

  test('Homepage loads and contains key elements', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/BlueBoxx/i);
    // Wait for the hero section to load
    await expect(page.locator('text=Build your future').first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Explore Programs' }).first()).toBeVisible();
  });

  test('About page renders correctly', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('text=Where Creativity')).toBeVisible();
    await expect(page.locator('text=Our Journey')).toBeVisible();
  });

  test('Courses page works', async ({ page }) => {
    await page.goto('/courses');
    await expect(page.locator('text=Explore Premium')).toBeVisible();
    await expect(page.getByPlaceholder('Search courses by title, category, or skills...')).toBeVisible();
  });

  test('Jobs page works', async ({ page }) => {
    await page.goto('/jobs');
    await expect(page.locator('text=Find Your Next Big Opportunity')).toBeVisible();
    // Check if job cards exist (we mock data usually, so checking for the search bar is safer)
    await expect(page.getByPlaceholder('Search jobs by role or company...')).toBeVisible();
  });

  test('Contact page form rendering', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.locator('text=Get in Touch')).toBeVisible();
    await expect(page.getByPlaceholder('John', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send Message' })).toBeVisible();
  });

  test('Privacy Policy renders', async ({ page }) => {
    await page.goto('/privacy-policy');
    await expect(page.locator('h1').filter({ hasText: 'Privacy Policy' })).toBeVisible();
  });

});
