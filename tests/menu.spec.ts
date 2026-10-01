import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('desktop navigation', () => {
  test('shows the links inline and no menu button at 1280px', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/about/');
    await expect(page.locator('.menu-btn')).toBeHidden();
    await expect(page.locator('#site-nav a')).toHaveCount(6);
    await expect(page.locator('#site-nav')).toBeVisible();
  });
});

test.describe('mobile menu sheet', () => {
  test.use({ viewport: { width: 390, height: 800 } });

  test('is closed at first and opens as a sheet', async ({ page }) => {
    await page.goto('/about/');
    const btn = page.locator('.menu-btn');
    await expect(btn).toBeVisible();
    await expect(btn).toHaveText('Menu');
    await expect(btn).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#site-nav')).toBeHidden();
    await btn.click();
    await expect(btn).toHaveAttribute('aria-expanded', 'true');
    await expect(btn).toHaveText('Close');
    await expect(page.locator('#site-nav')).toBeVisible();
    await expect(page.locator('#site-nav a').first()).toBeFocused();
    await expect(page.locator('main')).toHaveJSProperty('inert', true);
    // Join stays visible outside the sheet.
    await expect(page.locator('.site-header .btn')).toBeVisible();
  });

  test('Escape closes it and returns focus to the button', async ({ page }) => {
    await page.goto('/about/');
    await page.locator('.menu-btn').click();
    await page.keyboard.press('Escape');
    await expect(page.locator('#site-nav')).toBeHidden();
    await expect(page.locator('.menu-btn')).toBeFocused();
    await expect(page.locator('main')).toHaveJSProperty('inert', false);
  });

  test('works with the keyboard and reaches every link', async ({ page }) => {
    await page.goto('/about/');
    await page.locator('.menu-btn').focus();
    await page.keyboard.press('Enter');
    const hrefs: string[] = [];
    for (let i = 0; i < 6; i++) {
      hrefs.push(
        (await page.evaluate(
          () => document.activeElement?.getAttribute('href') ?? '',
        )) as string,
      );
      await page.keyboard.press('Tab');
    }
    expect(hrefs).toEqual([
      '/about/',
      '/our-work/',
      '/counties/',
      '/stories/',
      '/events/',
      '/search/',
    ]);
  });

  test('following a link closes the sheet and lands on the page', async ({
    page,
  }) => {
    await page.goto('/about/');
    await page.locator('.menu-btn').click();
    await page.locator('#site-nav a', { hasText: 'Counties' }).click();
    await expect(page).toHaveURL(/\/counties\/$/);
    await expect(page.locator('#site-nav')).toBeHidden();
  });

  test('growing the window past the breakpoint closes it and restores the inline links', async ({
    page,
  }) => {
    await page.goto('/about/');
    await page.locator('.menu-btn').click();
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(page.locator('.menu-btn')).toBeHidden();
    await expect(page.locator('#site-nav')).toBeVisible();
    await expect(page.locator('main')).toHaveJSProperty('inert', false);
  });

  test('passes axe while open and has no horizontal scroll', async ({
    page,
  }) => {
    await page.goto('/about/');
    await page.locator('.menu-btn').click();
    const r = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(r.violations).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - innerWidth,
      ),
    ).toBe(0);
  });

  test('without JavaScript the links show inline and there is no button', async ({
    browser,
  }) => {
    const ctx = await browser.newContext({
      viewport: { width: 390, height: 800 },
      javaScriptEnabled: false,
    });
    const page = await ctx.newPage();
    await page.goto('/about/');
    await expect(page.locator('.menu-btn')).toBeHidden();
    await expect(page.locator('#site-nav a')).toHaveCount(6);
    await expect(page.locator('#site-nav a').first()).toBeVisible();
    await ctx.close();
  });
});
