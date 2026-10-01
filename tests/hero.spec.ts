import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Roll Call hero', () => {
  test('h1 and 15 counties are in the HTML without JS', async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto('/');
    await expect(page.locator('h1')).toHaveText('Fifteen counties. One table.');
    await expect(page.locator('.roll .sr-only li')).toHaveCount(15);
    await expect(page.locator('.roll-map path[data-name]')).toHaveCount(15);
    // The outreach network is in the markup and fully drawn without JavaScript.
    await expect(page.locator('.net-node')).toHaveCount(15);
    expect(
      await page
        .locator('.net-edge')
        .first()
        .evaluate((e) => getComputedStyle(e).strokeDashoffset),
    ).toBe('0px');
    await ctx.close();
  });

  test('plays once, ends in the final state, and does not replay in the session', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute(
      'data-roll',
      /pending|running/,
    );
    await expect(page.locator('html')).not.toHaveAttribute('data-roll', /.+/, {
      timeout: 9000,
    });
    await expect(page.locator('.roll-map path.lit')).toHaveCount(15);
    await expect(page.locator('[data-caller]')).toHaveText(/the people/i);
    // Act two: the links drew outward, the travelling dots are gone, and it settled.
    await expect(page.locator('.roll-map')).toHaveClass(/net-done/, {
      timeout: 6000,
    });
    await expect(page.locator('.net-dot')).toHaveCount(0);
    await page.reload();
    await expect(page.locator('html')).not.toHaveAttribute('data-roll', /.+/);
  });

  test('any key press skips to the final state', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Shift');
    await expect(page.locator('html')).not.toHaveAttribute('data-roll', /.+/);
    await expect(page.locator('.roll-map path.lit')).toHaveCount(15);
  });

  test('reduced motion shows the final state immediately', async ({
    browser,
  }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto('/');
    await expect(page.locator('html')).not.toHaveAttribute('data-roll', /.+/);
    await expect(page.locator('h1')).toBeVisible();
    // No travelling dots and no drawing: the network is simply there.
    await expect(page.locator('.net-dot')).toHaveCount(0);
    await expect(page.locator('.roll-map')).not.toHaveClass(/net-on/);
    await ctx.close();
  });

  test('axe passes mid-sequence', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    const r = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
      .analyze();
    expect(r.violations).toEqual([]);
  });

  test('no horizontal scroll at 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/');
    await page.keyboard.press('Shift');
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - innerWidth,
      ),
    ).toBe(0);
  });
});
