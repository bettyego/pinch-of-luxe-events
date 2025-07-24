import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display contact form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /get in touch/i })).toBeVisible();
    
    // Check form fields
    await expect(page.getByPlaceholder('Your Name')).toBeVisible();
    await expect(page.getByPlaceholder('you@example.com')).toBeVisible();
    await expect(page.getByPlaceholder('Tell us about your event...')).toBeVisible();
    await expect(page.getByRole('button', { name: /send message/i })).toBeVisible();
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    // Try to submit empty form
    await page.getByRole('button', { name: /send message/i }).click();
    
    // Check for validation errors
    await expect(page.getByText('Name is required')).toBeVisible();
    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Message is required')).toBeVisible();
  });

  test('should show email validation error', async ({ page }) => {
    // Fill invalid email
    await page.getByPlaceholder('you@example.com').fill('invalid-email');
    await page.getByRole('button', { name: /send message/i }).click();
    
    await expect(page.getByText('Email is invalid')).toBeVisible();
  });

  test('should handle form submission', async ({ page }) => {
    // Fill out the form
    await page.getByPlaceholder('Your Name').fill('John Doe');
    await page.getByPlaceholder('you@example.com').fill('john@example.com');
    await page.getByPlaceholder('+123 456 7890').fill('+1234567890');
    await page.getByPlaceholder('Tell us about your event...').fill('Test message for E2E testing');
    
    // Submit form
    await page.getByRole('button', { name: /send message/i }).click();
    
    // Check for loading state
    await expect(page.getByText('Sending...')).toBeVisible();
    
    // Note: In a real test, you might want to mock the EmailJS service
    // For now, we'll just check that the form submission is attempted
  });

  test('should be accessible', async ({ page }) => {
    // Check form labels
    await expect(page.getByText('Full Name')).toBeVisible();
    await expect(page.getByText('Email Address')).toBeVisible();
    await expect(page.getByText('Phone Number')).toBeVisible();
    await expect(page.getByText('Message')).toBeVisible();
    
    // Check form field associations
    const nameInput = page.getByPlaceholder('Your Name');
    await expect(nameInput).toHaveAttribute('id', 'name');
    
    const emailInput = page.getByPlaceholder('you@example.com');
    await expect(emailInput).toHaveAttribute('id', 'email');
    
    // Check required attributes
    await expect(nameInput).toHaveAttribute('required');
    await expect(emailInput).toHaveAttribute('required');
  });

  test('should work on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if form is still usable
    await expect(page.getByRole('heading', { name: /get in touch/i })).toBeVisible();
    
    // Fill form on mobile
    await page.getByPlaceholder('Your Name').fill('Mobile User');
    await page.getByPlaceholder('you@example.com').fill('mobile@example.com');
    
    // Check if inputs are properly sized for mobile
    const nameInput = page.getByPlaceholder('Your Name');
    const inputStyles = await nameInput.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        fontSize: styles.fontSize,
        minHeight: styles.minHeight
      };
    });
    
    // Font size should be at least 16px to prevent zoom on iOS
    expect(parseFloat(inputStyles.fontSize)).toBeGreaterThanOrEqual(16);
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Tab through form fields
    await page.keyboard.press('Tab');
    await expect(page.getByPlaceholder('Your Name')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.getByPlaceholder('you@example.com')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.getByPlaceholder('+123 456 7890')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.getByPlaceholder('Tell us about your event...')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: /send message/i })).toBeFocused();
  });
});
