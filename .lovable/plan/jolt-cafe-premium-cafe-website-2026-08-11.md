# Jolt Cafe — Premium Cafe Website

A warm, editorial, multi-page site for Jolt Cafe (Emera Place, Halifax). Every fact on the site comes from the brief; anything unknown ships as a clearly marked `[PLACEHOLDER]` that is easy to swap later.

## Pages

- `/` — Home: hero, quick-info strip, about teaser, menu preview, food/coffee visual band, why Jolt, rating, location teaser, closing visit CTA
- `/menu` — Menu: Coffee, Breakfast, Lunch, Sandwiches & Specials (focaccia sandwiches, butter chicken), alternative milks note, "Explore Our Menu" with `[MENU LINK / MENU PDF PLACEHOLDER]`
- `/about` — The experience: atmosphere, food, coffee, service, location
- `/gallery` — Masonry editorial grid (coffee, food, interior, atmosphere)
- `/location` — Full address, Emera Place Floor 2 note, embedded Google map, Get Directions
- `/contact` — Visit CTA, address, `[PHONE NUMBER]`, `[EMAIL]` placeholders

Each page gets its own `head()` with unique title, description and og tags.

## Design direction

- Palette (oklch tokens in `src/styles.css`): deep espresso primary, warm tan secondary, creamy off-white background, soft beige surface, espresso-charcoal text, warm gray muted, earthy accent. No gradients, no neon, no glassmorphism.
- Typography: characterful serif display for headings + clean sans for body/UI, loaded via `<link>` in the root route. Editorial hierarchy — oversized hero headline, restrained section headings.
- Restrained corners and shadows; hairline warm borders instead of card-stacking. Generous whitespace, 1200–1280px max width.
- Motion: gentle scroll fade/rise, soft image zoom on hover, smooth button and nav transitions. Nothing else.

## Content rules applied

- Confirmed only: coffee, breakfast, lunch, focaccia sandwiches, butter chicken, almond/alt milks, dine-in, takeaway, ~$10–20 per person, 4.5/5 from 24 reviews, the address.
- No invented hours, phones, emails, prices, testimonials, awards, or social links. Social icons are omitted entirely until real URLs exist.
- Cruise-port/downtown proximity phrased as neighbourhood context, not a business claim.

## Imagery

Generated warm, natural-light cafe/food images used as clearly replaceable placeholders (hero, about, menu categories, gallery), with a note in the code that they are stand-ins for real Jolt Cafe photography. Descriptive alt text throughout.

## Shared components

`SiteHeader` (sticky-on-scroll nav + mobile sheet menu), `SiteFooter`, `Section` wrapper, `Reveal` scroll-animation wrapper, `MenuCategoryCard`, `GalleryGrid`, `RatingBadge`, `DirectionsButton`.

## Technical notes

- TanStack Start file routes under `src/routes/`; shared chrome in `__root.tsx` around `<Outlet />`.
- Tailwind v4 tokens in `src/styles.css` under `@theme inline` — no hardcoded colour utilities in components.
- Semantic HTML (`header`/`main`/`nav`/`footer`), single H1 per page, keyboard-accessible nav and gallery, visible focus states, no horizontal overflow at any breakpoint.
- Directions CTA links to a Google Maps directions URL built from the address; location page embeds a map iframe with a title.
- No backend needed — the site is static content only.
