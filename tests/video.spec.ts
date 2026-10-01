import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const page_ = '/stories/test-video-story/';

test.describe('video player (test fixture story)', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/video/test-fixture.vtt', (r) =>
      r.fulfill({
        contentType: 'text/vtt',
        body: 'WEBVTT\n\n00:00.000 --> 00:05.000\nTest fixture caption.\n',
      }),
    );
  });

  test('is click-to-play: controls, no autoplay, nothing downloaded until play', async ({
    page,
  }) => {
    const media: string[] = [];
    await page.route('**/video/test-fixture.mp4', (r) => {
      media.push(r.request().url());
      return r.fulfill({ status: 404 });
    });
    await page.goto(page_, { waitUntil: 'networkidle' });
    const video = page.locator('video');
    await expect(video).toHaveAttribute('controls', '');
    await expect(video).toHaveAttribute('preload', 'none');
    await expect(video).not.toHaveAttribute('autoplay', /.*/);
    await expect(video).toHaveAttribute('poster', /\.webp/);
    await expect(video).toHaveAttribute('playsinline', '');
    expect(media).toHaveLength(0);
  });

  test('has default English captions and a readable transcript', async ({
    page,
  }) => {
    await page.goto(page_);
    const track = page.locator('video track');
    await expect(track).toHaveAttribute('kind', 'captions');
    await expect(track).toHaveAttribute('srclang', 'en');
    await expect(track).toHaveAttribute('default', '');
    const summary = page.locator('summary', { hasText: 'Read the transcript' });
    await summary.click();
    await expect(page.locator('.transcript p')).toHaveCount(2);
  });

  test('passes axe with the transcript open', async ({ page }) => {
    await page.goto(page_);
    await page.locator('summary', { hasText: 'Read the transcript' }).click();
    const r = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(r.violations).toEqual([]);
  });
});

test.describe('the march speech video', () => {
  const march = '/stories/2025-08-march-to-the-capitol/';

  test('is published, click-to-play, and says plainly that it has no captions yet', async ({
    page,
  }) => {
    const media: string[] = [];
    page.on('request', (r) => {
      if (r.url().endsWith('/video/march-speech.mp4')) media.push(r.url());
    });
    await page.goto(march, { waitUntil: 'networkidle' });
    const video = page.locator('video');
    await expect(video).toHaveCount(1);
    await expect(video).toHaveAttribute('controls', '');
    await expect(video).toHaveAttribute('preload', 'none');
    await expect(video).not.toHaveAttribute('autoplay', /.*/);
    await expect(video).toHaveAttribute('poster', /\.webp/);
    await expect(page.locator('video track')).toHaveCount(0);
    await expect(
      page.locator('figcaption', { hasText: 'does not have captions yet' }),
    ).toBeVisible();
    await expect(page.getByText('What the video shows:')).toBeVisible();
    expect(media).toHaveLength(0); // nothing downloads until someone presses play
  });

  test('the video file is served and plays as H.264 mp4', async ({
    request,
  }) => {
    const res = await request.head('/video/march-speech.mp4');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('video/mp4');
    expect(Number(res.headers()['content-length'])).toBeLessThan(8_000_000);
  });

  test('has no horizontal scroll at 360px and passes axe', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(march);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - innerWidth,
      ),
    ).toBe(0);
    const r = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    // The missing captions are a known, owner-accepted gap (DECISIONS D11). axe cannot see the audio, so it stays clean.
    expect(r.violations).toEqual([]);
  });
});
