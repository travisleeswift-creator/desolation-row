# Desolation Row — Time's Up
Review brief for SuperGrok. Author: Travis Lee Swift (@TravisSwif21600).

## What this is
A PWA e-paper that sells a 10,000-word street-reportage book (*Desolation Row — Time's Up*, £7.99). Genre: street reportage. Graffiti / wheatpaste look. 10% of the price pledged by the author to Macmillan Cancer Support (not an official Macmillan publication).

Target: people who will buy a sealed short edition now; a longer professional edition comes later.

## Product rules (do not break)
- Guests see the **back page only**. Not the manuscript.
- Chapters are **sealed** until the signed-in account holds an entitlement.
- One account: X, Google, or email — same licence.
- Pictures are **off** until Travis drops them on chosen chapters (`hero` optional).
- Stripe Payment Link is **live** (`buy.stripe.com` in `edition.ts`). Buy opens Stripe. After payment, the reader returns and opens the copy on the signed-in account. No webhook yet — advise if Travis should add one before volume.
- Kokoro TTS is lazy: it must not load until Listen is pressed.
- Contact form + Part II waitlist are public inbound, stored server-side.

## Stack
TanStack Start (React) + Tailwind. Better Auth (X / Google / email). Postgres (Neon in prod, PGLite in preview). Server-gated manuscript in `src/content/chapters/`. Catalogue (titles only) in `src/content/meta.ts`. Entitlements in `migrations/0002_entitlements.sql`. Inbox in `migrations/0003_inbox.sql`.

## Key files
- `src/content/edition.ts` — title, price, Stripe link slot, charity line, back page
- `src/content/meta.ts` — chapter list (no pictures)
- `src/content/chapters/` — sealed manuscript
- `src/lib/edition/access.ts` — assemble / lock / buy
- `src/routes/checkout.tsx` — till
- `src/routes/contact.tsx` — desk + Part II list
- `src/components/edition/listen-bar.tsx` — Kokoro

## What to review
1. Is the back-page / sealed-book split right for selling?
2. Is the copy too heavy, too soft, or on-voice?
3. Checkout + auth: anything that would lose a paying reader?
4. What should the shocking Part II registration promise, without spoiling it?
5. When Travis has chapter photos, which **two or three** chapters actually need them?

Do not rewrite the book. Advise. Travis is the editor.
