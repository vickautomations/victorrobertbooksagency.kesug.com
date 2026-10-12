# Victor Robert Book Marketing Agency

A premium, editorial React/Express/TypeScript website for Victor Robert Book Marketing Agency. The supplied Victor Robert navy-and-gold logo is preserved and used as the primary brand mark.

## Local development

```bash
pnpm install
pnpm dev
```

The managed Preview uses port `3000`. The site is served by the initialized Express/Vite stack and exposes `/api/health` for readiness.

## Validation

```bash
pnpm check
pnpm test
pnpm build
```

The current implementation has passed all three commands. The test suite covers the starter platform/auth behavior; the website UI is additionally checked through the managed Preview screenshots and route manifest.

## Project structure

- `client/src/content/siteData.ts` — brand, navigation, services, process, FAQs, investment bands, and SEO defaults.
- `client/src/components/Site.tsx` — shared header, footer, logo, metadata, buttons, reveal motion, FAQ, form, and page primitives.
- `client/src/pages/SitePages.tsx` — complete public page set and data-driven service/detail templates.
- `client/src/index.css` — navy/gold editorial design system, responsive layout, motion, and reduced-motion rules.
- `server/inquiry.ts` — validation-first enquiry endpoint and configurable webhook adapter.
- `client/public/manus-routes.json` — managed route manifest.
- `client/public/robots.txt` and `client/public/sitemap.xml` — crawler documents.
- `docs/reference-synthesis.md` — researched reference-site findings and sitemap plan.
- `docs/integrations.md` — production integration setup notes.
- `docs/content-approvals.md` — missing facts and content approvals required before launch.
- `plan.md` and `TODO.md` — implementation plan and acceptance criteria.

## Enquiry form configuration

The form posts to `/api/inquiry`. It validates required fields on the server. To connect a real inbox, CRM, or automation webhook, set the server-only environment variable:

```bash
INQUIRY_WEBHOOK_URL=https://your-approved-webhook.example/endpoint
```

The current site intentionally returns a clear `503` configuration message when this variable is absent. It does not claim to have delivered an enquiry without a configured destination. Review `docs/integrations.md` before connecting a provider.

## Content and launch blockers

The site uses honest placeholders for the founder biography, founder image, approved services and deliverables, prices, case studies, testimonials, business contact details, scheduler, resource/lead magnet, analytics, consent platform, final public origin, legal jurisdiction, and vendor disclosures. Supply and approve these items before publication. See `docs/content-approvals.md`.

The site is not published from this handoff. The current result is a managed Preview/checkpoint candidate only.
