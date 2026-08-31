# A Life Uncensored

Travis Lee Swift asked SuperGrok to review this paper.

## What it is
A PWA e-paper that publishes his memoir *A Life Uncensored* (£7.99). Genre: memoir. 10% of the price pledged by the author to Macmillan Cancer Support (not an official Macmillan publication).

## What is live
- Stripe Payment Link: `https://buy.stripe.com/dRm9AM2j2dg7eKBeuvfw401` (£7.99).
- Sign-in: X, Google, email-password. One account.
- Book: all 18 chapters, currently **open** (no paywall until Travis says so).
- Kokoro on-device British voices for Listen.
- Contact / Part II list.
- Author pledge 10% to Macmillan.

## Stack
TanStack Start (React) + Tailwind. Better Auth (X / Google / email). Postgres (Neon in prod, PGLite in preview). Manuscript in `src/content/chapters/`. Catalogue in `src/content/meta.ts`. Entitlements in `migrations/0002_entitlements.sql`. Inbox in `migrations/0003_inbox.sql`.

## Read first
- `src/content/edition.ts` — title, price, Stripe, charity
- `src/content/chapters/` — the book
- `src/lib/edition/access.ts` — gate
- `src/routes/checkout.tsx` — till
- `src/routes/login.tsx` — one account
- `src/components/edition/listen-bar.tsx` — Kokoro

Advise on: paywall when he turns it on, Stripe webhook vs honour-system unlock, defamation/legal risk of named people, and whether the Listen bar is enough for ~9k words. Do not dump a rewrite.
