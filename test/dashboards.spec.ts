import { test, expect } from '@playwright/test';

test.describe('Dashboards', () => {

  test('Admin Dashboard Overview', async ({ page }) => {
    // Assuming the page is accessible directly without complex mock auth state, 
    // or the mock auth passes locally without context.
    await page.goto('/admin/dashboard');
    
    // Check Sidebar
    await expect(page.locator('text=Admin Profile')).toBeVisible();
    await expect(page.getByRole('link', { name: 'User Directory' }).or(page.getByRole('link', { name: 'Dashboard' }))).toBeVisible();
    
    // Check Top Nav
    await expect(page.getByPlaceholder('Global search')).toBeVisible();
    
    // Check Dashboard Stats
    await expect(page.locator('text=Active Users').first()).toBeVisible();
  });

  test('Admin Verifications Page', async ({ page }) => {
    await page.goto('/admin/verifications');
    await expect(page.locator('h1').filter({ hasText: 'Verifications' })).toBeVisible();
    
    // Check tabs
    await expect(page.getByRole('button', { name: 'All Pending' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'experts' })).toBeVisible();
  });

  test('Student Dashboard Overview', async ({ page }) => {
    await page.goto('/student/dashboard');
    
    // Check Sidebar Profile
    await expect(page.locator('text=Student').first()).toBeVisible();
    
    // Check main content
    await expect(page.locator('text=Welcome back').first()).toBeVisible();
    await expect(page.locator('text=Continue Learning').first()).toBeVisible();
  });

  test('Company Jobs Page', async ({ page }) => {
    await page.goto('/company/jobs');
    
    // Check Header and buttons
    await expect(page.locator('text=My Postings')).toBeVisible();
    await expect(page.locator('text=Post New')).toBeVisible();
  });

});
