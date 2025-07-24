import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    // Check if the page loads
    await expect(page).toHaveTitle(/Pinch of Luxe Events/);
    
    // Check for main navigation
    await expect(page.getByRole('navigation')).toBeVisible();
    
    // Check for hero section
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    // Test navigation links
    await page.getByRole('link', { name: 'About Us' }).click();
    await expect(page).toHaveURL(/.*about/);
    
    await page.getByRole('link', { name: 'Services' }).click();
    await expect(page).toHaveURL(/.*services/);
    
    await page.getByRole('link', { name: 'Gallery' }).click();
    await expect(page).toHaveURL(/.*gallery/);
    
    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL(/.*contact/);
  });

  test('should have working mobile navigation', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Open mobile menu
    await page.getByRole('button', { name: /open navigation menu/i }).click();
    
    // Check if mobile menu is visible
    await expect(page.getByRole('navigation', { name: /mobile navigation/i })).toBeVisible();
    
    // Test mobile navigation link
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/.*about/);
  });

  test('should have accessible elements', async ({ page }) => {
    // Check for proper heading hierarchy
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();
    
    // Check for alt text on images
    const images = page.getByRole('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const image = images.nth(i);
      await expect(image).toHaveAttribute('alt');
    }
    
    // Check for proper button labels
    const buttons = page.getByRole('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const ariaLabel = await button.getAttribute('aria-label');
      const textContent = await button.textContent();
      
      expect(ariaLabel || textContent).toBeTruthy();
    }
  });

  test('should load hero images', async ({ page }) => {
    // Wait for hero section to load
    await page.waitForSelector('[data-testid="hero-section"]', { timeout: 10000 });
    
    // Check if hero images are loaded
    const heroImages = page.locator('img').first();
    await expect(heroImages).toBeVisible();
  });

  test('should have working Book Now button', async ({ page }) => {
    const bookNowButton = page.getByRole('link', { name: /book now/i });
    await expect(bookNowButton).toBeVisible();
    
    await bookNowButton.click();
    await expect(page).toHaveURL(/.*inquiryform/);
  });
});
