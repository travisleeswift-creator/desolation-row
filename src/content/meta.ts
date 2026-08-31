import type { PieceMeta } from "./types";

/** Client-safe catalogue — titles and teasers only. Full text is server-gated when sealed. */
export const CATALOG: PieceMeta[] = [
  {
    slug: "five-years-clean",
    kind: "chapter",
    kicker: "Chapter 13",
    title: "Five Years Clean and the Present Body",
    dek: "Five years off heroin, a body that still keeps the score, and the work that remains.",
    readMins: 3,
    free: true,
    order: 13,
  },
  {
    slug: "the-names-that-do-not-leave",
    kind: "chapter",
    kicker: "Chapter 14",
    title: "The Names That Do Not Leave",
    dek: "The older generation, the firms, and a child placed at the intersection with protection from neither.",
    readMins: 1,
    free: true,
    order: 14,
  },
  {
    slug: "dual-names",
    kind: "chapter",
    kicker: "Chapter 15",
    title: "Dual Names and the Public Record",
    dek: "Two documents. Two countries. One body that never got to choose.",
    readMins: 1,
    free: true,
    order: 15,
  },
  {
    slug: "the-record",
    kind: "chapter",
    kicker: "Chapter 16",
    title: "The Record",
    dek: "The record is now in my own hands.",
    readMins: 1,
    free: true,
    order: 16,
  },
  {
    slug: "the-claims-and-the-record",
    kind: "chapter",
    kicker: "Chapter 17",
    title: "The Claims and the Record",
    dek: "What was asked for, what the public record holds, and what it does not.",
    readMins: 6,
    free: true,
    order: 17,
  },
  {
    slug: "salisbury-porton-down",
    kind: "chapter",
    kicker: "Chapter 18",
    title: "Salisbury, Porton Down and the Claims",
    dek: "The claims as they were stated, and the public record that sits beside them.",
    readMins: 2,
    free: true,
    order: 18,
  },
  {
    slug: "e-paper",
    kind: "article",
    kicker: "Dispatch",
    title: "The E-Paper",
    dek: "Why this edition is a paper you can put in a pocket, not a feed you fall into.",
    readMins: 2,
    free: true,
    order: 101,
  },
  {
    slug: "notes-from-the-desk",
    kind: "article",
    kicker: "Notebook",
    title: "Notes from the Desk",
    dek: "How an edition is assembled when the night editor is the person who also walked the route.",
    readMins: 2,
    free: false,
    order: 102,
  },
  {
    slug: "url-not-a-shop",
    kind: "article",
    kicker: "Format",
    title: "A URL, Not a Shop",
    dek: "Publish where it cannot be banned from the shelf.",
    readMins: 3,
    free: false,
    order: 103,
  },
  {
    slug: "invite",
    kind: "article",
    kicker: "Studio",
    title: "Invite to the Studio",
    dek: "Builders welcome. Jealousy is not a credential.",
    readMins: 3,
    free: false,
    order: 104,
  },
];

export function getMeta(slug: string): PieceMeta | undefined {
  return CATALOG.find((p) => p.slug === slug);
}

export const CHAPTERS = CATALOG.filter((p) => p.kind === "chapter");
export const ARTICLES = CATALOG.filter((p) => p.kind === "article");
export const FREE_SLUGS = new Set(CATALOG.filter((p) => p.free).map((p) => p.slug));
