import type { Piece } from "@/content/types";

const chapterMods = import.meta.glob("../../content/chapters/*.ts", {
  eager: true,
}) as Record<string, { chapter?: Piece }>;

const articleMods = import.meta.glob("../../content/articles/*.ts", {
  eager: true,
}) as Record<string, { article?: Piece }>;

const pieces: Piece[] = [
  ...Object.values(chapterMods).flatMap((m) => (m.chapter ? [m.chapter] : [])),
  ...Object.values(articleMods).flatMap((m) => (m.article ? [m.article] : [])),
];

const bySlug = new Map(pieces.map((p) => [p.slug, p]));

export function getPiece(slug: string): Piece | undefined {
  return bySlug.get(slug);
}

export function allPieces(): Piece[] {
  return pieces;
}
