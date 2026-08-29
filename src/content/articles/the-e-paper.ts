import type { Piece } from "../types";

export const article: Piece = {
  slug: "e-paper",
  kind: "article",
  kicker: "Dispatch",
  title: "The E-Paper",
  dek: "Why this edition is a paper you can put in a pocket, not a feed you fall into.",
  readMins: 2,
  free: true,
  order: 101,
  blocks: [
    {
      type: "p",
      text: "Call it an e-paper if you need a word for the store. I call it an edition. The difference is a spine, even when the spine is code.",
    },
    {
      type: "p",
      text: "A feed is designed never to end. That is a commercial fact dressed up as convenience. An edition ends. You know when you have read it. You can put it down at a bus stop and not feel that the bus stop has become a content slot.",
    },
    {
      type: "p",
      text: "I wanted pages because pages force a choice. This comes before that. The walk before the corridor, the corridor before the shop, the shop before the desk. A paper is an argument about order. A feed is an argument about appetite.",
    },
    {
      type: "pull",
      text: "A paper is an argument about order. A feed is an argument about appetite.",
    },
    {
      type: "p",
      text: "Read this on a phone. That is not a compromise. It is the last public surface most of us still carry. If the type cannot stand in daylight and in the sodium of a precinct, it is not a paper. It is a performance of one.",
    },
    {
      type: "p",
      text: "No infinite scroll. No autoplay. No harvest of your face for a metric I would be ashamed to put on a newsbill. The edition loads, you read, you leave. Leaving is a reader's right the platforms forgot to include in the terms.",
    },
    {
      type: "p",
      text: "If that sounds conservative, it is. Conserving the paper as a form is one of the few conservative instincts I am willing to defend. The rest of this edition is about models that should not be conserved: the corridor as home, the halo as a business plan, the gate as a taste-maker. The form is the tool. I kept the tool. I changed the landlord.",
    },
  ],
};
