# 04 — Features and Tools an Organization Like This Needs

Priority: **M** = must at launch, **S** = should, **C** = could later.

## Fundraising
- **M** One-time and recurring donations with a fast, low-friction flow (amount presets, custom amount, impact equivalents, no account required)
- **M** Multiple payment rails suited to the organization's country (confirm in `docs/12`); never assume a single provider works everywhere
- **M** Automated receipts, thank-you page, thank-you email, failure and retry handling
- **S** Tribute / in-memory gifts, anonymous gifts, employer matching info
- **S** Campaign pages with progress bar and live totals; peer-to-peer fundraising pages
- **S** Donor portal to manage recurring gifts
- **C** In-kind donation form, pledge forms, legacy giving page

## People and community
- **M** Volunteer sign-up with skills, availability, location; routed to the right coordinator
- **M** Newsletter sign-up with double opt-in
- **S** Membership / supporter sign-up
- **S** Chapter or local group finder
- **C** Volunteer hours log

## Advocacy
- **S** Petition and pledge tool with signature counter and share links
- **S** Email-your-representative tool (region dependent)
- **S** Shareable social cards generated per story, petition, and campaign

## Events
- **M** Event listing, detail, registration, capacity, confirmation emails, add-to-calendar (.ics)
- **S** Ticketing or donations at registration; livestream embed; post-event recap template

## Content and storytelling
- **M** CMS so staff edit pages, stories, events, team, and programs without code
- **M** Story template supporting video, audio, photo galleries, pull quotes, captions and transcripts
- **S** Impact dashboard fed by a simple data source (spreadsheet or CMS fields) with source and date on every number
- **S** Interactive map of where work happens
- **C** Annual report as a web-native experience

## Trust and operations
- **M** Transparency section (governance, finances, policies)
- **M** Contact and general enquiry forms with spam protection, routed to the right inbox
- **M** Admin role permissions (editor, publisher, admin)
- **S** CRM integration for donors, volunteers, subscribers (e.g. a nonprofit CRM or email platform); webhook-based so tools can be swapped
- **S** Email platform integration for newsletters and automations
- **S** Careers page with applications

## Site infrastructure
- **M** Site-wide search, sitemap.xml, robots.txt, redirects manager
- **M** Analytics that respects privacy (cookieless option preferred), conversion event tracking
- **M** Backups, uptime monitoring, error monitoring, staging environment
- **M** Image/video optimization pipeline
- **S** Multilingual routing and translation workflow
- **S** Dark mode and a high-contrast mode
- **S** Print stylesheet for reports and fact sheets
- **C** Progressive Web App behavior for offline reading on poor connections

## Staff enablement
- **M** Short editor guide: how to publish a story, add an event, edit the donate page, update impact numbers
- **S** Content calendar and templates for recurring posts
