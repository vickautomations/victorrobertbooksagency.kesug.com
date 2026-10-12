# Integration configuration

The site is intentionally honest about the connections that have not been supplied yet.

## Enquiry delivery

Set `INQUIRY_WEBHOOK_URL` in the server environment to a trusted inbox, CRM, or automation webhook that accepts JSON. The server validates required fields before forwarding. Keep the value server-side. If it is not set, `/api/inquiry` returns a clear configuration error and the interface does not claim the enquiry was delivered.

Confirm the destination, retention period, spam-protection method, notification owner, and failure-alert workflow before launch.

## Consultation booking

Set the approved scheduler URL in `client/src/content/siteData.ts` (`brand.scheduler`) and update the conversation page to use it. Confirm provider, timezone, availability, cancellation language, and fallback contact path first. The current site does not imply that a meeting has been scheduled.

## Contact and footer details

Add the approved business email, phone/WhatsApp, social profiles, and any service-area details to `client/src/content/siteData.ts` only after Victor Robert confirms they are monitored and safe to publish.

## Analytics, consent, and advertising

Add approved analytics IDs and a consent mechanism only after confirming the jurisdictions, cookie categories, vendors, and advertising platforms. Do not add tracking identifiers to client code until the privacy policy is updated.

## Resource delivery

A real lead magnet file, sender identity, email provider, double opt-in/consent policy, unsubscribe flow, and delivery failure behavior are required before `/resources` is changed from a transparent placeholder into a live capture flow.

## Public origin

Configure the final public origin before publishing canonical URLs, Open Graph URLs, and absolute sitemap `<loc>` values. The current project does not guess a domain.
