import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const paths = [
  '/',
  '/about/',
  '/our-work/',
  '/our-work/drugs-and-recovery/',
  '/our-work/skills/',
  '/our-work/financing/',
  '/our-work/branches/',
  '/counties/',
  '/counties/lofa/',
  '/counties/gbarpolu/',
  '/record/',
  '/stories/',
  '/stories/2025-11-school-visit/',
  '/stories/2025-08-march-to-the-capitol/',
  '/transparency/',
  '/join/',
  '/contact/',
  '/privacy/',
  '/accessibility/',
  '/404.html',
];

for (const path of paths) {
  test(`axe: ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

test('home has one h1 and a skip link', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('a.skip-link')).toHaveAttribute('href', '#main');
});
