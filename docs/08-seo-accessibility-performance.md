# 08 — SEO, Accessibility, Performance (the quality floor)

## Accessibility (WCAG 2.2 AA minimum)
- Semantic landmarks, one h1 per page, logical heading order
- Visible focus states; full keyboard operation; skip link
- Contrast AA for text and UI components; never color alone to convey meaning
- Forms: programmatic labels, helpful errors, autocomplete attributes, no time limits on donation forms
- Media: captions, transcripts, no autoplay with sound
- `prefers-reduced-motion` and `prefers-color-scheme` respected; no content flashing
- Touch targets at least 44px
- Accessibility statement with a contact method; test with a screen reader (NVDA/VoiceOver) before launch

## Performance
- LCP < 2.5s, INP < 200ms, CLS < 0.1 on mid-range mobile, throttled 4G
- Total JS budget per content page: aim under 150 KB compressed
- Fonts: subset, `font-display: swap`, at most two families
- Lazy-load below-the-fold media; video poster frames; no heavy 3D unless it is the signature moment and has a lightweight fallback
- Data-saver aware: reduce media quality when `Save-Data` is on

## SEO
- Unique title and meta description per page; canonical URLs; hreflang if multilingual
- Structured data: Organization / NGO, Event, Article, DonateAction, FAQ where appropriate
- Open Graph and social cards per page; generated for stories and campaigns
- Clean URLs, sitemap.xml, robots.txt, redirects manager
- Internal links from stories to programs to action pages
- Set up Search Console and, if eligible, Google Ad Grants guidance (confirm eligibility in `docs/12`)
