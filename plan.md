# Victor Robert Book Marketing Agency — Implementation Plan

## Scope and implementation approach

Build a production-oriented, managed React/TypeScript website for Victor Robert Book Marketing Agency. The public experience will use a route-driven React application with Wouter, a reusable component system, and a small Express backend for health checks and enquiry-destination configuration. The site will be original to Victor Robert; the Albert Nathan Agency research is used only for information architecture, conversion sequencing, and useful interaction patterns.

The first implementation pass will deliver a complete, navigable site with meaningful page-specific content, responsive layouts, accessible interactions, honest placeholders for missing business facts, and a clear configuration path for contact and booking integrations. It will not invent testimonials, case studies, client names, prices, credentials, business contact details, response times, or outcome guarantees.

The supplied `VictorRobertBookMarketingLogo.png` is the primary brand mark. It will be used without distortion or recoloring. The visual system will take its navy and gold cues from the mark while allowing a warm editorial paper tone and near-black ink tone for readability.

## Research-derived information architecture

The researched reference site is a long-form, conversion-led specialist agency site. It uses a strong homepage narrative, a dedicated service index with in-page category anchors rather than individual detail pages, layered proof, a process page, pricing/investment framing, testimonials, FAQ objections, a contact form, and a separate consultation path. It also uses multiple readiness levels: explore, ask a question, submit a qualified enquiry, or book a conversation.

Victor Robert’s site will preserve that breadth while improving route clarity and avoiding unsupported claims:

- `/` — Home
- `/about/` — About Victor Robert and the agency point of view
- `/services/` — Services overview with category navigation
- `/services/book-positioning/` — Book positioning and discoverability
- `/services/launch-strategy/` — Launch strategy and campaign preparation
- `/services/amazon-discoverability/` — Amazon listing and discoverability support
- `/services/author-platform/` — Author brand, audience, and owned channels
- `/services/paid-amplification/` — Paid promotion and advertising support
- `/services/ongoing-growth/` — Ongoing campaign management and optimization
- `/work/` — Case study library with clearly marked placeholders until approved work is supplied
- `/work/:slug` — Case-study template with challenge, approach, execution, and evidence fields
- `/testimonials/` — Author experiences with ready-to-populate placeholders
- `/process/` — Nine-stage working process
- `/investment/` — Enquiry-based campaign investment and scope bands
- `/faq/` — Accessible objection-handling accordions
- `/insights/` — Resource/insight hub with placeholder articles
- `/insights/:slug` — Insight detail template
- `/resources/` — Lead-resource architecture, clearly marked until a real resource and delivery workflow exist
- `/contact/` — Qualified project enquiry form
- `/conversation/` — Consultation explanation and replaceable booking link
- `/thank-you/` — Form follow-up state, without claiming a meeting or delivery has occurred
- `/privacy/` — Original policy placeholder with confirmation notes
- `/terms/` — Original terms placeholder with confirmation notes
- `/accessibility/` — Accessibility statement and contact path
- `/404` — Not-found state
- `/manus-routes.json` — Complete route manifest for the platform
- `/sitemap.xml` and `/robots.txt` — Search-discovery documents served by the backend/platform path

## Page composition

### Home

A split editorial hero pairs the provided logo, a sharp strategic headline, and a book/editorial visual composition. The page then moves through the author visibility problem, strategic approach, service categories, proof placeholders, process, investment framing, FAQs, resource placeholder, and final project CTA. The page uses one primary action—`Discuss your book`—and lower-commitment links for service exploration and process review.

### About

An editorial founder/agency story without invented biography. It explains the marketing problem the agency exists to solve, the operating principles, and the difference between activity and a strategy. Founder imagery is a labeled replacement slot until supplied.

### Services and service details

The overview uses a structured category rail and service cards. The six detail routes use a shared page system but distinct copy, deliverable framing, suitable-author guidance, workflow, FAQ, and related-service links. The detail copy describes strategy and support without promising commercial outcomes.

### Work and testimonials

Both areas are launch-ready content models with prominent placeholders. The work template uses the researched challenge → strategy → execution → evidence → lessons structure. Results are omitted until the user supplies permissioned projects and measurement context. Testimonials include author/category attribution fields but do not render fabricated quotes.

### Investment, process, FAQ, contact, and conversation

Investment uses four scope bands without published prices until approved. It explicitly separates agency fees from advertising/platform spend. Process uses an interactive timeline with nine stages. FAQ uses keyboard-accessible accordions. Contact collects the requested qualification fields and posts to `/api/inquiry`; if no destination is configured, the server returns a clear configuration error rather than pretending to deliver the message. Conversation explains what the consultation is for and contains a replaceable scheduling URL placeholder.

## Design system

### Design movement

**Contemporary editorial agency**: the restraint and rhythm of a high-end publishing imprint combined with the clarity of a specialist strategy consultancy.

### Core principles

1. **Quiet authority** — strong typography and considered spacing instead of loud performance claims.
2. **Editorial clarity** — content should feel like a well-edited book jacket: focused, legible, and purposeful.
3. **Evidence before exaggeration** — placeholders and caveats are visible when proof is not yet supplied.
4. **Human next steps** — calls to action feel like an invitation to discuss the work, not a hard sell.

### Color philosophy

- **Victor navy** `#071C35` is the signature brand color: dependable, intelligent, and deep enough to carry hero and footer surfaces.
- **Book gold** `#C89A3D` is used as a precise accent for rules, active states, metadata, and primary action details, echoing the supplied logo.
- **Paper** `#F5F1E9` provides the warm, tactile base of an editorial page.
- **Ink** `#17212B` carries the main reading color.
- **Mist** `#E7E2D8` supports borders and quiet panels.

Gold is intentionally used as punctuation rather than a large fill, preserving a premium feel and maintaining contrast.

### Layout paradigm

Use asymmetric editorial compositions: oversized numbered labels, offset content blocks, full-bleed navy bands, and a recurring narrow annotation column. Major sections alternate between open paper space and saturated navy surfaces. Avoid a repetitive centered grid for every section; cards can use a staggered row with a readable max-width.

### Signature elements

1. **Margin notes** — small gold labels such as `01 / VISIBILITY` anchor sections and make long pages scannable.
2. **The gold rule** — a thin rule or short underline animates into place near active links and primary content transitions.
3. **Book-spine motif** — vertical navy/gold bars and slim folio markers reference the physical rhythm of a bookshelf without copying a literal book logo.

### Interaction philosophy and animation

Interactions should feel like turning a page: low-distance, deliberate, and informative. Use Motion for opacity/translate reveals, card lift, underline expansion, and timeline state changes. Avoid parallax-heavy effects. Add `prefers-reduced-motion` handling so all content remains visible and animation duration collapses to near-zero. Mobile navigation must close on Escape and retain visible focus. FAQ buttons use actual buttons with `aria-expanded` and controlled regions.

### Typography system

Use `Cormorant Garamond` for display headings and editorial statements, paired with `DM Sans` for body copy, UI, labels, and form controls. Display type is large but constrained to readable line lengths. Body copy uses 1.65–1.8 line height. Gold folio labels are uppercase, tracked, and small.

### Brand essence and voice

**Positioning:** Strategic book marketing for authors who want their work to be easier to discover, understand, and remember.

**Personality:** strategic, considered, direct.

**Voice:** commercially literate, honest, human, and specific. Headlines are declarative rather than inflated. CTA microcopy reduces friction and says what happens next.

Example lines:

- “A stronger book campaign starts before the promotion begins.”
- “Bring the book, the ambition, and the questions. We’ll map the next useful move.”

### Logo

The supplied Victor Robert mark remains the only brand mark. It will appear in the header, footer, hero lockup, and metadata/favicons where appropriate. Preserve the original transparent PNG, proportions, navy/gold color, and subtitle. Do not create a replacement wordmark or redraw the mark in CSS.

## Component and code structure

```text
client/
  public/
    manus-routes.json
    site.webmanifest
  src/
    App.tsx                 # route table and shared providers
    index.css               # tokens, reset, typography, motion, responsive styles
    components/
      site/Header.tsx       # desktop/mobile nav, sticky state
      site/Footer.tsx       # route groups, legal, configuration-safe contacts
      site/Logo.tsx
      site/PageShell.tsx
      site/SectionLabel.tsx
      site/Reveal.tsx
      site/Meta.tsx
      site/PrimaryButton.tsx
      site/PlaceholderMedia.tsx
      site/InquiryForm.tsx
      site/FaqAccordion.tsx
      site/ProcessTimeline.tsx
      site/ServiceCard.tsx
      site/CaseStudyCard.tsx
      site/InvestmentCard.tsx
      site/SectionHeading.tsx
    content/
      brand.ts
      navigation.ts
      services.ts
      faqs.ts
      process.ts
      placeholders.ts
      seo.ts
    pages/
      Home.tsx, About.tsx, Services.tsx, ServiceDetail.tsx,
      Work.tsx, WorkDetail.tsx, Testimonials.tsx, Process.tsx,
      Investment.tsx, FAQ.tsx, Insights.tsx, InsightDetail.tsx,
      Resources.tsx, Contact.tsx, Conversation.tsx, ThankYou.tsx,
      Privacy.tsx, Terms.tsx, Accessibility.tsx, NotFound.tsx
server/
  _core/                  # starter platform/runtime support
  inquiry.ts              # validation and configurable delivery adapter
  _core/index.ts          # /api/inquiry and /api/health routes
  routers.ts              # retain starter auth/system procedures
public/
  manus-routes.json       # route inventory
  robots.txt
  sitemap.xml
  favicon.png
  logo.png                # supplied logo copy if storage is not the source

docs/
  reference-synthesis.md
  user-brief.txt
  integrations.md
  content-approvals.md
plan.md
TODO.md
```

## Technical decisions

- Keep the initialized React/Express/tRPC/TypeScript stack. It is already installed and configured for a managed server-backed preview.
- Use Wouter for all required routes and shared route wrappers. Use data-driven service/detail and article routes to avoid duplicating layout code.
- Use Framer Motion only for purposeful reveals and micro-interactions; CSS handles most static styling.
- Use the supplied server resource for `/api/health` and a validation-first `/api/inquiry` adapter. Do not add a database because persistence was not requested and no approved CRM/database model exists.
- Use route metadata helpers in the client and a complete `manus-routes.json`; provide `sitemap.xml`/`robots.txt` as repository assets plus server handling where needed. The canonical origin will remain a configurable constant and will not be guessed from an internal host.
- Upload the logo to managed storage for stable Preview use and keep a local copy in `public/` for build reliability. Use the exact stable asset path in app code after upload.
- Use generated editorial background imagery only where it has a clear placement. No generated image will depict Victor Robert or a real client. Founder and case-study imagery remain replaceable placeholders.
- Document all missing destinations: email/CRM webhook, scheduler URL, social URLs, analytics IDs, cookie-consent requirements, legal jurisdiction, approved services/prices, approved proof, and resource delivery workflow.

## Build and handoff workflow

1. Write the shared tokens, route manifest, brand/content data, header/footer, and page shell.
2. Implement the homepage and shared interaction primitives.
3. Implement the remaining routes with page-specific content and shared detail templates.
4. Add the server inquiry adapter and configuration documentation.
5. Add metadata, sitemap, robots, accessibility page, and not-found handling.
6. Start the managed preview service and validate health, routes, build, and type checks.
7. Capture desktop and mobile screenshots of representative pages, fix any layout or functional issues found.
8. Commit the intended files to the managed repository and record the checkpoint. Do not publish publicly unless the user later requests publication and the publication state permits it.

## Required confirmation before launch

- Approved service list and exact deliverables.
- Actual business/contact email, phone/WhatsApp, scheduler, and social URLs.
- Pricing or permission to keep enquiry-based investment placeholders.
- Permissioned case studies, testimonials, book covers, and founder photo.
- Legal jurisdiction, business/trading name, privacy/terms review, and analytics/cookie requirements.
- Lead magnet file and email capture/delivery provider.
- CRM/inbox destination and spam protection choice for `/api/inquiry`.
