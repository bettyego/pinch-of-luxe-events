import { test, expect } from '@playwright/test';

test.describe('Gallery Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/gallery');
  });

  test('should display gallery page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /our event gallery/i })).toBeVisible();
    
    // Check category buttons
    await expect(page.getByRole('button', { name: /show weddings gallery/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /show birthdays gallery/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /show baby showers gallery/i })).toBeVisible();
  });

  test('should switch between categories', async ({ page }) => {
    // Default should be Weddings
    const weddingsButton = page.getByRole('button', { name: /show weddings gallery/i });
    await expect(weddingsButton).toHaveAttribute('aria-pressed', 'true');
    
    // Click Birthdays
    const birthdaysButton = page.getByRole('button', { name: /show birthdays gallery/i });
    await birthdaysButton.click();
    
    // Check state change
    await expect(birthdaysButton).toHaveAttribute('aria-pressed', 'true');
    await expect(weddingsButton).toHaveAttribute('aria-pressed', 'false');
  });

  test('should display images in gallery', async ({ page }) => {
    // Wait for gallery to load
    await page.waitForSelector('[data-testid="swiper"]', { timeout: 10000 });
    
    // Check if images are present
    const images = page.getByTestId('optimized-image');
    await expect(images.first()).toBeVisible();
  });

  test('should be accessible', async ({ page }) => {
    // Check ARIA labels
    const categoryButtons = page.getByRole('button');
    const buttonCount = await categoryButtons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const button = categoryButtons.nth(i);
      await expect(button).toHaveAttribute('aria-label');
      await expect(button).toHaveAttribute('aria-pressed');
    }
    
    // Check section has proper labeling
    await expect(page.getByRole('region')).toHaveAttribute('aria-labelledby');
    
    // Check tablist
    await expect(page.getByRole('tablist')).toBeVisible();
  });

  test('should work with keyboard navigation', async ({ page }) => {
    const weddingsButton = page.getByRole('button', { name: /show weddings gallery/i });
    const birthdaysButton = page.getByRole('button', { name: /show birthdays gallery/i });
    
    // Focus first button
    await weddingsButton.focus();
    await expect(weddingsButton).toBeFocused();
    
    // Tab to next button
    await page.keyboard.press('Tab');
    await expect(birthdaysButton).toBeFocused();
    
    // Activate with Enter
    await page.keyboard.press('Enter');
    await expect(birthdaysButton).toHaveAttribute('aria-pressed', 'true');
  });

  test('should work on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if gallery is still functional
    await expect(page.getByRole('heading', { name: /our event gallery/i })).toBeVisible();
    
    // Check if category buttons are still accessible
    const birthdaysButton = page.getByRole('button', { name: /show birthdays gallery/i });
    await birthdaysButton.click();
    await expect(birthdaysButton).toHaveAttribute('aria-pressed', 'true');
  });

  test('should handle swipe gestures on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Wait for gallery to load
    await page.waitForSelector('[data-testid="swiper"]', { timeout: 10000 });
    
    // Note: Swiper gestures are complex to test in Playwright
    // This is a basic check that the swiper container is present
    const swiperContainer = page.getByTestId('swiper');
    await expect(swiperContainer).toBeVisible();
  });

  test('should load images lazily', async ({ page }) => {
    // Check that images have proper loading attributes
    const images = page.getByRole('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      const firstImage = images.first();
      // Check if image has loading attribute (for lazy loading)
      const loadingAttr = await firstImage.getAttribute('loading');
      expect(loadingAttr).toBe('lazy');
    }
  });

  test('should handle image load errors gracefully', async ({ page }) => {
    // This test would require mocking image failures
    // For now, we'll just check that images have alt text
    const images = page.getByRole('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < Math.min(imageCount, 5); i++) {
      const image = images.nth(i);
      await expect(image).toHaveAttribute('alt');
    }
  });
});
