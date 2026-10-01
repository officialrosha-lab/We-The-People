import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const FORMSPREE = 'https://formspree.io/f/testform';
const BREVO = 'https://test.sibforms.com/serve/testform';

// Every request to either provider is intercepted: nothing in the tests reaches the real services.
async function mock(page: Page, status = 200) {
  const posts: string[] = [];
  await page.route(FORMSPREE, async (route) => {
    posts.push(route.request().postData() ?? '');
    await route.fulfill({
      status,
      contentType: 'application/json',
      body: status === 200 ? '{"ok":true}' : '{"errors":[{"message":"error"}]}',
    });
  });
  return posts;
}
async function mockBrevo(page: Page) {
  const posts: { body: string; type: string }[] = [];
  await page.route(BREVO, async (route) => {
    const req = route.request();
    posts.push({
      body: req.postData() ?? '',
      type: req.headers()['content-type'] ?? '',
    });
    await route.fulfill({ status: 200, contentType: 'text/html', body: 'ok' });
  });
  return posts;
}
const skipHero = async (page: Page) => {
  await page.goto('/join/');
};

test.describe('join form', () => {
  test('empty submit shows errors and focuses the first field', async ({
    page,
  }) => {
    const posts = await mock(page);
    await skipHero(page);
    await page
      .getByRole('button', { name: 'Join the movement', exact: true })
      .last()
      .click();
    await expect(page.locator('#join-name-error')).toHaveText(
      'Enter your name.',
    );
    await expect(page.locator('#join-contact-error')).toHaveText(
      'Enter an email address or a phone number so we can reach you.',
    );
    await expect(page.locator('#join-county-error')).toHaveText(
      'Choose your county.',
    );
    await expect(page.locator('#join-name')).toBeFocused();
    expect(posts).toHaveLength(0);
  });

  test('short phone number is explained', async ({ page }) => {
    await mock(page);
    await skipHero(page);
    await page.fill('#join-name', 'Test Person');
    await page.fill('#join-contact', '0770');
    await page.selectOption('#join-county', 'Lofa');
    await page
      .getByRole('button', { name: 'Join the movement', exact: true })
      .last()
      .click();
    await expect(page.locator('#join-contact-error')).toHaveText(
      'That phone number has too few digits. Check it and try again.',
    );
  });

  test('valid submit posts once and confirms with the contact value', async ({
    page,
  }) => {
    const posts = await mock(page);
    await skipHero(page);
    await page.fill('#join-name', 'Test Person');
    await page.fill('#join-contact', 'test@example.org');
    await page.selectOption('#join-county', 'Lofa');
    await page.getByLabel('Volunteer my time or skills').check();
    await page
      .getByRole('button', { name: 'Join the movement', exact: true })
      .last()
      .click();
    await expect(
      page
        .getByRole('status')
        .filter({ hasText: 'You have joined the movement.' }),
    ).toContainText('We will contact you at test@example.org.');
    expect(posts).toHaveLength(1);
    expect(posts[0]).toContain('volunteer');
  });

  test('server failure shows a retry message and keeps the form', async ({
    page,
  }) => {
    await mock(page, 500);
    await skipHero(page);
    await page.fill('#join-name', 'Test Person');
    await page.fill('#join-contact', 'test@example.org');
    await page.selectOption('#join-county', 'Lofa');
    const btn = page
      .getByRole('button', { name: 'Join the movement', exact: true })
      .last();
    await btn.click();
    await expect(
      page
        .locator('#join-name')
        .locator('xpath=ancestor::form')
        .locator('[data-status]'),
    ).toHaveText(
      'We could not send your form. Check your connection and press Send again.',
    );
    await expect(btn).toBeEnabled();
  });

  test('a filled honeypot sends nothing', async ({ page }) => {
    const posts = await mock(page);
    await skipHero(page);
    await page.fill('#join-name', 'Bot');
    await page.fill('#join-contact', 'bot@example.org');
    await page.selectOption('#join-county', 'Lofa');
    await page
      .locator('#join-name')
      .locator('xpath=ancestor::form')
      .locator('input[name=_gotcha]')
      .fill('http://spam.example', { force: true });
    await page
      .getByRole('button', { name: 'Join the movement', exact: true })
      .last()
      .click();
    await page.waitForTimeout(300);
    expect(posts).toHaveLength(0);
  });

  test('works with the keyboard only', async ({ page }) => {
    await mock(page);
    await skipHero(page);
    await page.locator('#join-name').focus();
    await page.keyboard.type('Test Person');
    await page.keyboard.press('Tab');
    await page.keyboard.type('+231 770 000 000');
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(page.locator('#join-county')).not.toHaveValue('');
  });
});

test.describe('newsletter (Brevo)', () => {
  test('subscribes with an email only, in Brevo field names', async ({
    page,
  }) => {
    const posts = await mockBrevo(page);
    await page.goto('/about/');
    await page.fill('#newsletter-contact', 'not-an-email');
    await page.getByRole('button', { name: 'Subscribe' }).click();
    await expect(page.locator('#newsletter-contact-error')).toContainText(
      'valid email',
    );
    expect(posts).toHaveLength(0);
    await page.fill('#newsletter-contact', 'reader@example.org');
    await page.getByRole('button', { name: 'Subscribe' }).click();
    await expect(
      page.getByRole('status').filter({
        hasText:
          'Thank you. If you are not already subscribed, we will email you to confirm your address.',
      }),
    ).toBeVisible();
    expect(posts).toHaveLength(1);
    const params = new URLSearchParams(posts[0]!.body);
    expect(params.get('EMAIL')).toBe('reader@example.org');
    expect(params.get('locale')).toBe('en');
    expect(params.get('html_type')).toBe('simple');
    expect(params.get('email_address_check')).toBe('');
    expect(posts[0]!.type).toContain('application/x-www-form-urlencoded');
  });

  test('a filled honeypot sends nothing', async ({ page }) => {
    const posts = await mockBrevo(page);
    await page.goto('/about/');
    await page.fill('#newsletter-contact', 'bot@example.org');
    await page
      .locator('input[name=email_address_check]')
      .fill('x', { force: true });
    await page.getByRole('button', { name: 'Subscribe' }).click();
    await page.waitForTimeout(300);
    expect(posts).toHaveLength(0);
  });

  test('has no name field and does not post to Formspree', async ({ page }) => {
    const formspree = await mock(page);
    await mockBrevo(page);
    await page.goto('/about/');
    await expect(page.locator('#newsletter-name')).toHaveCount(0);
    await page.fill('#newsletter-contact', 'reader@example.org');
    await page.getByRole('button', { name: 'Subscribe' }).click();
    await expect(
      page.getByRole('status').filter({ hasText: 'Thank you' }),
    ).toBeVisible();
    expect(formspree).toHaveLength(0);
  });
});

test.describe('Formspree payload', () => {
  test('join sends form, subject, reply-to email and an empty _gotcha', async ({
    page,
  }) => {
    const posts = await mock(page);
    let accept = '';
    await page.route(FORMSPREE, async (route) => {
      accept = route.request().headers()['accept'] ?? '';
      posts.push(route.request().postData() ?? '');
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: '{"ok":true}',
      });
    });
    await page.goto('/join/');
    await page.fill('#join-name', 'Test Person');
    await page.fill('#join-contact', 'test@example.org');
    await page.selectOption('#join-county', 'Lofa');
    await page
      .getByRole('button', { name: 'Join the movement', exact: true })
      .last()
      .click();
    await expect(
      page.getByRole('status').filter({ hasText: 'You have joined' }),
    ).toBeVisible();
    expect(accept).toContain('application/json');
    const body = posts.at(-1)!;
    expect(body).toContain('name="form"');
    expect(body).toContain('join');
    expect(body).toContain('Website: new member');
    expect(body).toMatch(/name="email"\r\n\r\ntest@example.org/);
    expect(body).toMatch(/name="_gotcha"\r\n\r\n\r\n/);
  });

  test('a phone number is not sent as a reply-to email', async ({ page }) => {
    const posts = await mock(page);
    await page.goto('/join/');
    await page.fill('#join-name', 'Test Person');
    await page.fill('#join-contact', '+231 770 000 000');
    await page.selectOption('#join-county', 'Lofa');
    await page
      .getByRole('button', { name: 'Join the movement', exact: true })
      .last()
      .click();
    await expect(
      page.getByRole('status').filter({ hasText: 'You have joined' }),
    ).toBeVisible();
    expect(posts[0]).not.toContain('name="email"');
  });
});

test('contact form requires a message', async ({ page }) => {
  await mock(page);
  await page.goto('/contact/');
  await page.fill('#contact-name', 'Test Person');
  await page.fill('#contact-contact', 'test@example.org');
  await page.getByRole('button', { name: 'Send', exact: true }).click();
  await expect(page.locator('#contact-message-error')).toHaveText(
    'Write your message.',
  );
});

test.describe('events', () => {
  test('upcoming and past fixtures are listed separately', async ({ page }) => {
    await page.goto('/events/');
    await expect(
      page.getByRole('link', { name: 'Test fixture: county meeting' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Past events' }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Test fixture: past meeting' }),
    ).toBeVisible();
  });

  test('upcoming event has registration and a calendar file', async ({
    page,
    request,
  }) => {
    const posts = await mock(page);
    await page.goto('/events/sample-meeting/');
    await page.fill('#event-name', 'Test Person');
    await page.fill('#event-contact', '+231770000000');
    await page.selectOption('#event-county', 'Outside Liberia');
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(
      page.getByRole('status').filter({ hasText: 'You are registered.' }),
    ).toBeVisible();
    expect(posts[0]).toContain('Test fixture: county meeting');
    const res = await request.get('/events/sample-meeting.ics');
    expect(res.headers()['content-type']).toContain('text/calendar');
    const body = await res.text();
    expect(body).toContain('BEGIN:VEVENT');
    expect(body).toContain('DTSTART:20990314T150000Z');
  });

  test('past event offers no registration and no calendar link', async ({
    page,
  }) => {
    await page.goto('/events/past-meeting/');
    await expect(page.getByRole('button', { name: 'Register' })).toHaveCount(0);
    await expect(
      page.getByRole('link', { name: 'Add to calendar' }),
    ).toHaveCount(0);
  });
});

test.describe('axe on form states', () => {
  for (const path of [
    '/join/',
    '/contact/',
    '/events/',
    '/events/sample-meeting/',
    '/thanks/',
  ]) {
    test(`axe: ${path}`, async ({ page }) => {
      await page.goto(path);
      const r = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(r.violations).toEqual([]);
    });
  }

  test('axe: join form with errors showing', async ({ page }) => {
    await page.goto('/join/');
    await page
      .getByRole('button', { name: 'Join the movement', exact: true })
      .last()
      .click();
    await expect(page.locator('#join-name-error')).toBeVisible();
    const r = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
      .analyze();
    expect(r.violations).toEqual([]);
  });
});
