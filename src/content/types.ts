export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "pull"; text: string }
  | { type: "figure"; src: string; caption: string };

export type PieceKind = "chapter" | "article";

export type PieceMeta = {
  slug: string;
  kind: PieceKind;
  kicker: string;
  title: string;
  dek: string;
  readMins: number;
  free: boolean;
  /** Optional. Drop `/edition/{slug}.jpg` and set this when you have a picture. */
  hero?: string;
  order?: number;
};

export type Piece = PieceMeta & {
  blocks: Block[];
};

export type PiecePreview = PieceMeta & {
  blocks: Block[];
  locked: boolean;
  wordCount: number;
};

export function countWords(blocks: Block[]): number {
  return blocks.reduce((n, b) => {
    if (b.type === "figure") return n;
    return n + (b.text.match(/[A-Za-z0-9']+/g)?.length ?? 0);
  }, 0);
}

export function speakableText(blocks: Block[]): string[] {
  return blocks
    .filter((b): b is Extract<Block, { type: "p" | "h" | "pull" }> => b.type !== "figure")
    .map((b) => b.text.trim())
    .filter(Boolean);
}
