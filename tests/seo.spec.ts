import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

test.describe('search-engine and sharing basics', () => {
  test('robots.txt points at the sitemap and the sitemap leaves out utility pages', async ({
    request,
  }) => {
    const robots = await (await request.get('/robots.txt')).text();
    expect(robots).toContain('Sitemap:');
    expect(robots).toContain('Disallow: /thanks/');
    const sitemap = await (await request.get('/sitemap-0.xml')).text();
    expect(sitemap).toContain('/counties/lofa/');
    expect(sitemap).not.toMatch(/\/(thanks|search)\//);
    expect(sitemap).not.toContain('404');
  });

  test('every page in the sitemap has the tags search engines and chat apps need', async ({
    page,
    request,
  }) => {
    const xml = await (await request.get('/sitemap-0.xml')).text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (m) => new URL(m[1]!).pathname,
    );
    expect(urls.length).toBeGreaterThan(30);
    const titles = new Set<string>();
    for (const path of urls) {
      await page.goto(path);
      const title = await page.title();
      expect(title.length, `${path} title`).toBeGreaterThan(3);
      titles.add(title);
      const desc =
        (await page
          .locator('meta[name=description]')
          .getAttribute('content')) ?? '';
      expect(desc.length, `${path} description`).toBeGreaterThan(20);
      expect(desc.length, `${path} description length`).toBeLessThanOrEqual(
        160,
      );
      await expect(
        page.locator('link[rel=canonical]'),
        `${path} canonical`,
      ).toHaveCount(1);
      await expect(
        page.locator('meta[property="og:image"]'),
        `${path} og:image`,
      ).toHaveCount(1);
      await expect(
        page.locator('meta[property="og:image:alt"]'),
        `${path} og:image:alt`,
      ).toHaveCount(1);
      await expect(page.locator('h1'), `${path} h1`).toHaveCount(1);
      await expect(page.locator('html'), `${path} lang`).toHaveAttribute(
        'lang',
        'en',
      );
    }
    expect(titles.size, 'every page has a unique title').toBe(urls.length);
  });

  test('home page declares the organisation with its legal name', async ({
    page,
  }) => {
    await page.goto('/');
    const ld = JSON.parse(
      (await page
        .locator('script[type="application/ld+json"]')
        .first()
        .textContent()) ?? '{}',
    );
    expect(ld['@type']).toBe('NGO');
    expect(ld.name).toBe('We The People, Inc.');
    expect(ld.alternateName).toBe('We The People Movement');
    expect(ld.address).toBeUndefined(); // nothing invented
  });

  test('stories declare an Article with a date, author and image', async ({
    page,
  }) => {
    await page.goto('/stories/2025-08-march-to-the-capitol/');
    const ld = JSON.parse(
      (await page
        .locator('script[type="application/ld+json"]')
        .first()
        .textContent()) ?? '{}',
    );
    expect(ld['@type']).toBe('Article');
    expect(ld.datePublished).toBe('2025-08-07');
    expect(ld.author.name).toBe('We The People, Inc.');
    expect(ld.image[0]).toMatch(/\.jpg/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      /march-banner.*\.jpg/,
    );
  });

  test('pages without a photo share the branded default image', async ({
    page,
    request,
  }) => {
    await page.goto('/about/');
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      /\/og-default\.png$/,
    );
    const img = await request.get('/og-default.png');
    expect(img.status()).toBe(200);
    expect(img.headers()['content-type']).toContain('image/png');
  });

  test('events declare an Event with a start date', async ({ page }) => {
    await page.goto('/events/sample-meeting/');
    const ld = JSON.parse(
      (await page
        .locator('script[type="application/ld+json"]')
        .first()
        .textContent()) ?? '{}',
    );
    expect(ld['@type']).toBe('Event');
    expect(ld.startDate).toContain('2099-03-14');
  });
});

test.describe('security headers file', () => {
  const headers = readFileSync('public/_headers', 'utf8');
  const forms = readFileSync('src/lib/forms.ts', 'utf8');

  test('has the baseline protections', () => {
    for (const h of [
      'X-Content-Type-Options: nosniff',
      'Referrer-Policy:',
      'Permissions-Policy:',
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
    ]) {
      expect(headers).toContain(h);
    }
  });

  test('allows exactly the two form services and no other third party', () => {
    expect(headers).toContain('connect-src');
    expect(headers).toContain('https://formspree.io');
    expect(headers).toContain('https://*.sibforms.com');
    expect(forms).toContain("'formspree.io'");
    expect(forms).toContain("'sibforms.com'");
    const hosts = [...headers.matchAll(/https:\/\/[^\s;]+/g)].map((m) => m[0]);
    for (const h of hosts)
      expect(['https://formspree.io', 'https://*.sibforms.com']).toContain(h);
  });
});

test.describe('printing', () => {
  test('drops dark grounds, the menu, forms and maps, and shows link addresses', async ({
    page,
  }) => {
    await page.goto('/stories/2025-08-march-to-the-capitol/');
    await page.emulateMedia({ media: 'print' });
    const bg = await page.evaluate(
      () =>
        getComputedStyle(
          document.querySelector('.section[data-ground="night"]')!,
        ).backgroundColor,
    );
    expect(bg).toBe('rgb(255, 255, 255)');
    await expect(page.locator('.site-header .header-actions')).toBeHidden();
    await expect(page.locator('.af')).toBeHidden();
    await expect(page.locator('video')).toBeHidden();
    const after = await page.evaluate(
      () =>
        getComputedStyle(
          document.querySelector('.prose a[href^="http"]')!,
          '::after',
        ).content,
    );
    expect(after).toContain('facebook.com');
  });
});
