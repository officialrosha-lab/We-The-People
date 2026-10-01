import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { existsSync } from 'node:fs';

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

test.describe('the real march video is held back', () => {
  test('is not on the march story and not served from the site', async ({
    page,
    request,
  }) => {
    await page.goto('/stories/2025-08-march-to-the-capitol/');
    await expect(page.locator('video')).toHaveCount(0);
    const res = await request.get('/video/march-speech.mp4');
    expect(res.status()).toBe(404);
    expect(existsSync('public/video/march-speech.mp4')).toBe(false);
  });
});
