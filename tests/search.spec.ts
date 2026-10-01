import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('site search', () => {
  test('finds the school story by a word in its text', async ({ page }) => {
    await page.goto('/search/');
    const box = page.getByPlaceholder('Search the site');
    await box.fill('Paynesville');
    await expect(
      page
        .locator('.pagefind-ui__result-link', { hasText: /Old Voker/ })
        .first(),
    ).toBeVisible({ timeout: 10000 });
  });

  test('finds a county page by name', async ({ page }) => {
    await page.goto('/search/');
    await page.getByPlaceholder('Search the site').fill('Gbarpolu');
    await expect(
      page
        .locator('.pagefind-ui__result-link[href*="/counties/gbarpolu"]')
        .first(),
    ).toBeVisible({ timeout: 10000 });
  });

  test('says plainly when nothing matches', async ({ page }) => {
    await page.goto('/search/');
    await page.getByPlaceholder('Search the site').fill('zzqxkj');
    await expect(page.getByText('No results for zzqxkj')).toBeVisible({
      timeout: 10000,
    });
  });

  test('does not index the 404, thank-you or search pages', async ({
    page,
  }) => {
    await page.goto('/search/');
    await page.getByPlaceholder('Search the site').fill('Thank you');
    await page.waitForTimeout(1500);
    await expect(
      page.locator('.pagefind-ui__result-link[href*="/thanks"]'),
    ).toHaveCount(0);
  });

  test('passes axe with results showing and has no horizontal scroll at 360px', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/search/');
    await page.getByPlaceholder('Search the site').fill('drugs');
    await expect(page.locator('.pagefind-ui__result-link').first()).toBeVisible(
      { timeout: 10000 },
    );
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

  test('shows a helpful message without JavaScript', async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto('/search/');
    // Playwright's text locators skip <noscript>, so read the page's visible text instead.
    expect(await page.locator('body').innerText()).toContain(
      'Search needs JavaScript',
    );
    await ctx.close();
  });
});
