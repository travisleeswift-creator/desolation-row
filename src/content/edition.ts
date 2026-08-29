export const EDITION = {
  name: "Desolation Row",
  masthead: "Desolation Row",
  subtitle: "Time's Up",
  genre: "Street reportage",
  author: "Travis Lee Swift",
  xHandle: "TravisSwif21600",
  tagline: "Street reportage. One edition. Time's up.",
  priceLabel: "£7.99",
  pricePence: 799,
  currency: "GBP",
  productId: "edition",
  words: 10000,
  listenMins: 70,
  /** Paste the Stripe Payment Link from the phone app. Empty = preview till only. */
  stripePaymentLink: "",
  charity: {
    name: "Macmillan Cancer Support",
    share: "10%",
    note: "Travis Lee Swift pledges 10% of this edition's price to Macmillan Cancer Support. This is not an official Macmillan publication.",
  },
  blurb:
    "A 10,000-word graffiti edition of street reportage from Luton. The book is sealed. You get the back page now. The rest unlocks on the account that pays. A longer professional edition is coming.",
  backPage: [
    "This is the back page. Not the book.",
    "Luton after the papers folded. Hostels that exist on a spreadsheet and vanish at a door. Shops that sell pity with a till. The people who get paid to tell you who you were. What the town looks like when the last bus has gone.",
    "Travis Lee Swift wrote it from the county, not from a network that borrowed the county's name. The manuscript stays shut until you buy. A longer professional edition is being cut for the people this was written for.",
    "Time's up.",
  ],
  shareLine:
    "Desolation Row — Time's Up by Travis Lee Swift. Street reportage. The book is sealed; the back page is free.",
} as const;

export const REVIEWS: { quote: string; by: string }[] = [
  {
    quote: "Reads like someone finally put a masthead on a pavement.",
    by: "A. Khan, Luton — early reader",
  },
  {
    quote: "Short, sharp, and it does not ask permission.",
    by: "Proof-pile note",
  },
  {
    quote: "The back page is a warning. I bought it for the rest.",
    by: "J. Reid — early reader",
  },
  {
    quote: "Time's up is the right title. Street reportage with a spine.",
    by: "A bookseller in Bedfordshire",
  },
];
