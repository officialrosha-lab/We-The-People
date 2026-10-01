import { test, expect } from '@playwright/test';

const story = '/stories/2025-11-school-visit/';

test.describe('school visit story', () => {
  test('names the school and every photo has real alt text', async ({
    page,
  }) => {
    await page.goto(story);
    await expect(page.locator('h1')).toContainText('Old Voker Mission School');
    await expect(page.locator('article')).toContainText('Paynesville City');
    const imgs = page.locator('article img');
    expect(await imgs.count()).toBe(5);
    for (const img of await imgs.all()) {
      const alt = (await img.getAttribute('alt')) ?? '';
      expect(alt.length).toBeGreaterThan(20);
      expect(await img.getAttribute('width')).not.toBeNull(); // explicit size prevents layout shift
      expect(await img.getAttribute('height')).not.toBeNull();
    }
  });

  test('the lead photo loads first; the others are not requested until you scroll near them', async ({
    page,
  }) => {
    const photoRequests: string[] = [];
    page.on('request', (r) => {
      if (/\/_astro\/school-visit-.*\.(avif|webp|jpg)/.test(r.url()))
        photoRequests.push(r.url());
    });
    await page.goto(story, { waitUntil: 'networkidle' });
    const imgs = page.locator('article img');
    await expect(imgs.first()).toHaveAttribute('loading', 'eager');
    // Before scrolling: only the lead photo (students) has been fetched.
    expect(photoRequests.length).toBeGreaterThan(0);
    expect(
      photoRequests.every((u) => u.includes('school-visit-students')),
    ).toBe(true);
    // The others are placeholders waiting for the scroll observer.
    for (const i of [1, 2, 3, 4])
      await expect(imgs.nth(i)).toHaveAttribute('data-src', /school-visit-/);
    // Scroll to the end: now every photo has really loaded.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 100));
      }
    });
    await page.waitForLoadState('networkidle');
    expect(
      await imgs.evaluateAll((a) =>
        a.every(
          (i) =>
            (i as HTMLImageElement).complete &&
            (i as HTMLImageElement).naturalWidth > 0,
        ),
      ),
    ).toBe(true);
    expect(
      await imgs.evaluateAll((a) =>
        a.some(
          (i) =>
            i.hasAttribute('data-src') &&
            (i as HTMLImageElement).src.startsWith('data:'),
        ),
      ),
    ).toBe(false);
  });

  test('without JavaScript every photo still shows', async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto(story);
    const visible = page.locator('article img:visible');
    expect(await visible.count()).toBe(5);
    for (const img of await visible.all()) {
      expect(((await img.getAttribute('src')) ?? '').startsWith('data:')).toBe(
        false,
      );
      expect(((await img.getAttribute('alt')) ?? '').length).toBeGreaterThan(
        20,
      );
    }
    await ctx.close();
  });

  test('serves modern formats and sets a link-preview image', async ({
    page,
  }) => {
    await page.goto(story);
    await expect(
      page.locator('picture source[type="image/avif"]').first(),
    ).toHaveCount(1);
    await expect(
      page.locator('picture source[type="image/webp"]').first(),
    ).toHaveCount(1);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      /school-visit.*\.jpg/,
    );
  });

  test('has no horizontal scroll at 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(story);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - innerWidth,
      ),
    ).toBe(0);
  });

  test('is linked from the stories list, home, record, drugs page and Montserrado', async ({
    page,
  }) => {
    for (const path of [
      '/stories/',
      '/',
      '/record/',
      '/our-work/drugs-and-recovery/',
      '/counties/montserrado/',
    ]) {
      await page.goto(path);
      await expect(page.locator(`a[href="${story}"]`).first()).toBeAttached();
    }
  });

  test('page weight stays small on a phone-sized screen', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    let bytes = 0;
    page.on('response', async (r) => {
      const len = Number(r.headers()['content-length'] ?? 0);
      if (r.url().includes('/_astro/school-visit')) bytes += len;
    });
    await page.goto(story, { waitUntil: 'networkidle' });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForLoadState('networkidle');
    expect(bytes).toBeLessThan(1_000_000); // all five photos, scrolled to the end, under 1 MB
  });
});

test.describe('march to the Capitol story', () => {
  const march = '/stories/2025-08-march-to-the-capitol/';

  test('has six photos with alt text and names the partners', async ({
    page,
  }) => {
    await page.goto(march);
    await expect(page.locator('h1')).toContainText('Liberia says no to drugs');
    for (const name of [
      'MOTARWY',
      'West Africa Drug Policy Network',
      'LIBxRecords Foundation',
      'EMSASA',
      'Justice Forum of Liberia',
      'GLHF',
    ]) {
      await expect(page.locator('article')).toContainText(name);
    }
    const imgs = page.locator('article img');
    expect(await imgs.count()).toBe(6);
    for (const img of await imgs.all()) {
      expect(((await img.getAttribute('alt')) ?? '').length).toBeGreaterThan(
        20,
      );
    }
  });

  test("cites the movement's own statement and links to the school story", async ({
    page,
  }) => {
    await page.goto(march);
    await expect(
      page.locator('a[href="https://www.facebook.com/share/p/19PdFWZwjr/"]'),
    ).toBeAttached();
    await expect(
      page.locator('a[href="/stories/2025-11-school-visit/"]'),
    ).toBeAttached();
  });

  test('is on the record, the stories list and the drugs page, oldest first on the record', async ({
    page,
  }) => {
    await page.goto('/record/');
    await expect(
      page.locator('a[href="/stories/2025-08-march-to-the-capitol/"]'),
    ).toBeAttached();
    const dates = await page.locator('.timeline time').allTextContents();
    expect(dates.indexOf('7 August 2025')).toBeGreaterThan(
      dates.indexOf('17 July 2025'),
    );
    expect(dates.indexOf('18 November 2025')).toBeGreaterThan(
      dates.indexOf('7 August 2025'),
    );
    await page.goto('/stories/');
    await expect(
      page.locator('a[href="/stories/2025-08-march-to-the-capitol/"]').first(),
    ).toBeAttached();
    await page.goto('/our-work/drugs-and-recovery/');
    await expect(
      page.locator('a[href="/stories/2025-08-march-to-the-capitol/"]'),
    ).toBeAttached();
  });

  test('does not publish the watermarked aerial photo', async ({ page }) => {
    await page.goto(march);
    expect(await page.content()).not.toMatch(/satec/i);
  });
});
