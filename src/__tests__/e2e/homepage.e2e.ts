import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/UV Infra/);
  });

  test('should display navbar with navigation links', async ({ page }) => {
    const navbar = page.locator('nav');
    await expect(navbar).toBeVisible();

    const homeLink = page.locator('a[href="#"]');
    await expect(homeLink).toBeVisible();
  });

  test('should display hero section', async ({ page }) => {
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();
  });

  test('should navigate to projects section', async ({ page }) => {
    const projectsLink = page.locator('a[href="#projects"]');
    await projectsLink.click();

    const projectsSection = page.locator('section#projects');
    await expect(projectsSection).toBeInViewport();
  });

  test('should navigate to floor plans section', async ({ page }) => {
    const floorPlansLink = page.locator('a[href="#floor-plans"]');
    if (await floorPlansLink.isVisible()) {
      await floorPlansLink.click();
      const floorPlansSection = page.locator('section#floor-plans');
      await expect(floorPlansSection).toBeInViewport();
    }
  });

  test('should navigate to gallery section', async ({ page }) => {
    const galleryLink = page.locator('a[href="#gallery"]');
    if (await galleryLink.isVisible()) {
      await galleryLink.click();
      const gallerySection = page.locator('section#gallery');
      await expect(gallerySection).toBeInViewport();
    }
  });

  test('should display WhatsApp button', async ({ page }) => {
    const whatsappButton = page.locator('button[title*="WhatsApp"]');
    await expect(whatsappButton).toBeVisible();
  });

  test('should open project modal when clicking project card', async ({ page }) => {
    const projectCards = page.locator('[id="projects"] div[class*="rounded-2xl"]').filter({
      has: page.locator('text=Premium'),
    });

    if ((await projectCards.count()) > 0) {
      await projectCards.first().click();
      const modal = page.locator('div[class*="modal"]').first();
      await expect(modal).toBeVisible();
    }
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    const title = await page.locator('title').textContent();
    expect(title).toContain('UV Infra');

    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /premium/i);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const navbar = page.locator('nav');
    await expect(navbar).toBeVisible();

    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();
  });

  test('should handle form submission', async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    if (await nameInput.isVisible()) {
      await nameInput.fill('John Doe');
      await page.locator('input[name="email"]').fill('john@example.com');
      await page.locator('input[name="phone"]').fill('9876543210');
      await page.locator('select[name="project"]').selectOption('project1');
      await page.locator('textarea[name="message"]').fill('Test message for enquiry');

      const submitButton = page.locator('button:has-text("Send Enquiry")');
      await submitButton.click();

      // Check for success message
      const successMessage = page.locator('text=/thank you/i');
      await expect(successMessage).toBeVisible({ timeout: 5000 });
    }
  });
});
