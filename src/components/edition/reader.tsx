import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import type { PiecePreview } from "@/content/types";
import { speakableText } from "@/content/types";
import { EDITION } from "@/content/edition";
import { buttonVariants } from "@/components/ui/button";
import { saveProgress } from "@/lib/edition/access";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { ListenBarLazy } from "./listen-bar-lazy";
import { cn } from "@/lib/utils";

export function Reader({ piece }: { piece: PiecePreview }) {
  const parts = speakableText(piece.blocks);
  const { user } = useCurrentUserState();
  const nextHint = piece.kind === "chapter" ? "the manuscript" : "the rest of this dispatch";

  useEffect(() => {
    if (piece.locked || !user) return;
    void saveProgress({ data: { slug: piece.slug, blockIndex: 0 } }).catch(() => {});
  }, [piece.slug, piece.locked, user]);

  return (
    <article className="mx-auto max-w-2xl">
      <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-crimson">
        {piece.kicker}
        {piece.free ? " · Free" : piece.locked ? " · Sealed" : " · Your copy"}
      </p>
      <h1 className="mt-2 font-display text-3xl uppercase leading-none tracking-wide sm:text-4xl">
        {piece.title}
      </h1>
      <p className="mt-3 font-serif text-lg italic text-muted">{piece.dek}</p>
      <p className="mt-2 font-sans text-xs text-faint">
        {piece.readMins} min read · {piece.wordCount.toLocaleString()} words
      </p>

      {piece.hero ? (
        <figure className="mt-6 overflow-hidden border-2 border-ink">
          <img
            src={piece.hero}
            alt=""
            decoding="async"
            className="aspect-16/9 w-full object-cover"
          />
        </figure>
      ) : null}

      <div className={cn("mt-8 space-y-5", piece.locked && piece.blocks.length > 0 && "relative")}>
        {piece.blocks.map((block, i) => {
          if (block.type === "p") {
            return (
              <p key={i} className={cn("text-base leading-7 text-ink-soft", i === 0 && "drop-cap")}>
                {block.text}
              </p>
            );
          }
          if (block.type === "h") {
            return (
              <h2 key={i} className="pt-2 font-display text-xl uppercase tracking-wide">
                {block.text}
              </h2>
            );
          }
          if (block.type === "pull") {
            return (
              <blockquote
                key={i}
                className="border-l-2 border-crimson py-1 pl-4 font-serif text-xl leading-snug italic text-ink"
              >
                {block.text}
              </blockquote>
            );
          }
          if (block.type === "figure") {
            return (
              <figure key={i} className="my-6">
                <img
                  src={block.src}
                  alt={block.caption}
                  loading="lazy"
                  decoding="async"
                  className="w-full border border-rule object-cover"
                />
                <figcaption className="mt-2 font-sans text-xs tracking-wide text-muted">
                  {block.caption}
                </figcaption>
              </figure>
            );
          }
          return null;
        })}

        {piece.locked ? (
          <div className={cn(piece.blocks.length > 0 && "relative -mt-24 pt-24")}>
            {piece.blocks.length > 0 ? (
              <div className="lock-fade pointer-events-none absolute inset-x-0 -top-28 h-28 bg-paper" />
            ) : null}
            <div className="border-2 border-ink bg-paper px-6 py-8 text-center">
              <Lock className="mx-auto size-8 text-crimson" strokeWidth={1.5} />
              <h2 className="mt-3 font-display text-2xl uppercase tracking-wide">Sealed</h2>
              <p className="mx-auto mt-2 max-w-md font-serif text-sm text-muted">
                The back page is on the Book tab. Sign in and buy to unlock {nextHint}. A longer
                professional edition is coming.
              </p>
              <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row">
                <Link to="/checkout" className={cn(buttonVariants())}>
                  Buy · {EDITION.priceLabel}
                </Link>
                <Link to="/book" className={cn(buttonVariants({ variant: "ghost" }))}>
                  Back page
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <ListenBarLazy
        parts={parts}
        disabled={piece.locked && parts.length === 0}
        disabledReason={
          piece.locked
            ? "The book is sealed — buy to hear it. Kokoro is ready on your copy."
            : undefined
        }
      />
    </article>
  );
}
