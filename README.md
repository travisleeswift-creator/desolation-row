# Desolation Row — Time's Up

Street reportage by **Travis Lee Swift**. A sealed 10,000-word graffiti edition. £7.99. 10% pledged to Macmillan Cancer Support (author's pledge, not an official Macmillan book).

Live paper: Front / Book / Articles / Contact / Buy. Back page is free. The manuscript unlocks on the account that pays.

## For SuperGrok
Read [`GROK-REVIEW.md`](./GROK-REVIEW.md), then the files it lists. Advise. Do not dump a rewrite.

## Add pictures later
See `public/edition/README.txt`. Type-only until Travis chooses chapters.

## Add Stripe from the phone
1. Stripe app → Payment Links → £7.99, currency GBP.
2. Copy the link.
3. Paste it as `stripePaymentLink` in `src/content/edition.ts`.
Until that link is in, Buy grants a preview copy so the lock can be tested.

## Run
```
npm install
npm run dev
```
