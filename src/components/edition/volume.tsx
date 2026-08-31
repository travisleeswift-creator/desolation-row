import type { PiecePreview } from "@/content/types";
import { speakableText } from "@/content/types";
import { EDITION } from "@/content/edition";
import { Blocks } from "./reader";
import { ListenBarLazy } from "./listen-bar-lazy";

export function Volume({ chapters }: { chapters: PiecePreview[] }) {
  const words = chapters.reduce((n, ch) => n + ch.wordCount, 0);
  const parts = chapters.flatMap((ch) => [ch.title, ...speakableText(ch.blocks)]);

  return (
    <article className="mx-auto max-w-2xl">
      <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-crimson">
        Your copy · {EDITION.genre}
      </p>
      <figure className="mt-3 overflow-hidden border-2 border-ink">
        <img
          src="/edition/cover.jpg"
          alt={`${EDITION.name} by ${EDITION.author}`}
          className="aspect-video w-full object-cover"
        />
      </figure>
      <h1 className="mt-6 font-display text-4xl uppercase leading-none tracking-wide">
        {EDITION.name}
      </h1>
      <p className="mt-1 font-display text-2xl uppercase tracking-wide text-crimson">
        {EDITION.subtitle}
      </p>
      <p className="mt-3 font-serif italic text-muted">{EDITION.author}</p>
      <p className="mt-2 font-sans text-xs text-faint">
        {words.toLocaleString()} words · {chapters.length} chapters in this drop · {EDITION.copyright}
      </p>

      <ListenBarLazy parts={parts} />

      <nav className="mt-10 border-y-2 border-ink py-4">
        <p className="font-sans text-[11px] uppercase tracking-[0.28em]">Contents</p>
        <ol className="mt-3 divide-y divide-rule">
          {chapters.map((ch) => (
            <li key={ch.slug}>
              <a href={`#${ch.slug}`} className="flex items-baseline justify-between gap-4 py-2">
                <span className="font-display text-lg uppercase tracking-wide">{ch.title}</span>
                <span className="shrink-0 font-sans text-[10px] uppercase tracking-[0.18em] text-muted">
                  {ch.kicker}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {chapters.map((ch) => (
        <section key={ch.slug} id={ch.slug} className="mt-14 scroll-mt-24">
          <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-crimson">{ch.kicker}</p>
          <h2 className="mt-1 font-display text-3xl uppercase leading-none tracking-wide">{ch.title}</h2>
          <p className="mt-2 font-serif italic text-muted">{ch.dek}</p>
          <div className="mt-6 space-y-5">
            <Blocks blocks={ch.blocks} dropCap />
          </div>
        </section>
      ))}
    </article>
  );
}
