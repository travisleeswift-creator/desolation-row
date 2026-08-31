import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSessionUser } from "@/lib/auth/verify.server";
import { getSql } from "@/lib/db";
import { EDITION } from "@/content/edition";
import { countWords, type Piece, type PiecePreview } from "@/content/types";
import { CHAPTERS, getMeta } from "@/content/meta";
import { getPiece } from "./content.server";

function assemble(slug: string, owned: boolean): PiecePreview | null {
  let piece: Piece | undefined = getPiece(slug);
  if (!piece) {
    const meta = getMeta(slug);
    if (!meta) return null;
    piece = {
      ...meta,
      blocks: [
        {
          type: "p",
          text:
            meta.dek +
            " The rest of this page is typeset in the edition files — send the next dispatch and it will appear on the next press.",
        },
      ],
    };
  }
  const wordCount = countWords(piece.blocks);
  if (piece.free || owned) return { ...piece, locked: false, wordCount };
  // Book chapters: back-page only. No manuscript leak.
  if (piece.kind === "chapter") {
    return { ...piece, blocks: [], locked: true, wordCount };
  }
  return {
    ...piece,
    blocks: piece.blocks.slice(0, 1),
    locked: true,
    wordCount,
  };
}

const slugInput = z.object({ slug: z.string().min(1) });

/** SSR/session probe — signed-out visitors get null, never a throw. */
export const fetchSessionUser = createServerFn({ method: "GET" }).handler(async () => {
  const u = await getSessionUser();
  return u ? { id: u.id, email: u.email } : null;
});

/** Guest-safe: free pages full, paid pages sealed. */
export const loadPiece = createServerFn({ method: "GET" })
  .validator(slugInput)
  .handler(async ({ data }) => assemble(data.slug, false));

/** Signed-in: unlocks if this account holds the edition. */
export const loadOwnedPiece = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(slugInput)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql<{ product_id: string }>`
      select product_id from entitlements
      where user_id = ${context.userId} and product_id = ${EDITION.productId}
    `;
    return assemble(data.slug, rows.length > 0);
  });

/** Whole volume: back-page only unless this account holds the edition. */
export const loadBook = createServerFn({ method: "GET" }).handler(async () => {
  const user = await getSessionUser();
  let owned = false;
  if (user) {
    const sql = await getSql();
    const rows = await sql<{ product_id: string }>`
      select product_id from entitlements
      where user_id = ${user.id} and product_id = ${EDITION.productId}
    `;
    owned = rows.length > 0;
  }
  const chapters = CHAPTERS.map((ch) => assemble(ch.slug, owned)).filter(
    (p): p is PiecePreview => p != null,
  );
  return { owned, chapters };
});

export const getMyEntitlements = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{ product_id: string }>`
      select product_id from entitlements where user_id = ${context.userId}
    `;
    return rows.map((r) => r.product_id);
  });

export const completePurchase = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ productId: z.literal("edition") }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      insert into entitlements (user_id, product_id)
      values (${context.userId}, ${data.productId})
      on conflict (user_id, product_id) do nothing
    `;
    return { ok: true as const, productId: data.productId };
  });

export const saveProgress = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ slug: z.string(), blockIndex: z.number().int().min(0) }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      insert into reading_progress (user_id, slug, block_index, updated_at)
      values (${context.userId}, ${data.slug}, ${data.blockIndex}, now())
      on conflict (user_id, slug)
      do update set block_index = ${data.blockIndex}, updated_at = now()
    `;
    return { ok: true as const };
  });

export const listProgress = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return sql<{ slug: string; block_index: number }>`
      select slug, block_index from reading_progress where user_id = ${context.userId}
    `;
  });
