export const EDITION = {
  name: "A Life Uncensored",
  masthead: "A Life Uncensored",
  subtitle: "The Record",
  genre: "Memoir",
  author: "Travis Lee Swift",
  xHandle: "TravisSwif21600",
  tagline: "A Life Uncensored. Travis Lee Swift. The record is now in his own hands.",
  priceLabel: "£7.99",
  pricePence: 799,
  currency: "GBP",
  productId: "edition",
  words: 2884,
  listenMins: 20,
  copyright: "© 2026 Travis Lee Swift",
  stripePaymentLink: "https://buy.stripe.com/dRm9AM2j2dg7eKBeuvfw401",
  charity: {
    name: "Macmillan Cancer Support",
    share: "10%",
    note: "Travis Lee Swift pledges 10% of this edition's price to Macmillan Cancer Support. This is not an official Macmillan publication.",
  },
  blurb:
    "A Life Uncensored by Travis Lee Swift. Memoir. Chapters 13–18 are in this paper so the author can read and listen. Chapters 1–12 go in when they arrive. Stripe is live at £7.99.",
  backPage: [
    "This is A Life Uncensored.",
    "Five years clean. A body that still keeps the score. Two names, two countries, one record. The work is what remains.",
    "I am still here. I am still building. The record is now in my own hands.",
  ],
  shareLine:
    "A Life Uncensored by Travis Lee Swift. Memoir. The record is now in his own hands.",
} as const;

export const REVIEWS: { quote: string; by: string }[] = [
  {
    quote: "He does not ask to be believed. He puts it on the page and leaves it there.",
    by: "Proof-pile note",
  },
  {
    quote: "The clean years are the quiet ones. That is the part most books skip.",
    by: "Early reader",
  },
  {
    quote: "A record written from the room he actually lives in.",
    by: "A bookseller in Middlesex",
  },
];
