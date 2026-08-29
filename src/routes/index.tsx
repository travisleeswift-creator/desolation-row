import { createFileRoute, Link } from "@tanstack/react-router";
import { CHAPTERS } from "@/content/meta";
import { EDITION } from "@/content/edition";
import { buttonVariants } from "@/components/ui/button";
import { Reviews } from "@/components/edition/reviews";
import { ShareOnX } from "@/components/edition/share-x";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: FrontPage });

function FrontPage() {
  return (
    <main className="grid gap-12">
      <section className="grid gap-8 lg:grid-cols-12">
        <figure className="flex aspect-16/10 min-w-0 items-center justify-center overflow-hidden border-2 border-ink bg-ink lg:col-span-7">
          <div className="-rotate-2 border-4 border-[var(--color-tag)] px-4 py-6 text-center sm:px-8 sm:py-8">
            <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-[var(--color-tag)] sm:tracking-[0.4em]">
              {EDITION.genre}
            </p>
            <p className="mt-2 font-display text-[clamp(2.1rem,10vw,4.5rem)] uppercase leading-[0.85] text-paper">
              {EDITION.name}
            </p>
            <p className="mt-2 font-display text-[clamp(1.4rem,6vw,2.25rem)] uppercase tracking-wide text-crimson">
              {EDITION.subtitle}
            </p>
            <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.2em] text-paper/70">
              Travis Lee Swift · back page only
            </p>
          </div>
        </figure>
        <div className="flex flex-col justify-between lg:col-span-5">
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-crimson">
              {EDITION.genre} · back page only
            </p>
            <h2 className="mt-2 font-display text-4xl uppercase leading-none tracking-wide">
              {EDITION.name}
            </h2>
            <p className="mt-1 font-display text-2xl uppercase tracking-wide text-crimson">
              {EDITION.subtitle}
            </p>
            <p className="mt-3 font-serif text-lg italic text-muted">{EDITION.author}</p>
            <div className="mt-5 space-y-3 font-serif text-base leading-7 text-ink-soft">
              {EDITION.backPage.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Link to="/checkout" className={cn(buttonVariants({ size: "lg" }))}>
              Buy the book · {EDITION.priceLabel}
            </Link>
            <Link to="/contact" className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}>
              Part II list
            </Link>
            <ShareOnX />
          </div>
        </div>
      </section>

      <p className="tag-bar px-4 py-3 text-center font-sans text-sm font-medium">
        {EDITION.charity.note}
      </p>

      <Reviews />

      <section>
        <h2 className="border-b border-ink pb-2 font-sans text-[11px] uppercase tracking-[0.28em]">
          Inside the sealed book
        </h2>
        <ol className="mt-4 divide-y divide-rule">
          {CHAPTERS.map((ch) => (
            <li key={ch.slug}>
              <Link
                to="/read/$slug"
                params={{ slug: ch.slug }}
                className="flex items-baseline justify-between gap-4 py-3"
              >
                <span className="font-display text-lg uppercase tracking-wide">{ch.title}</span>
                <span className="shrink-0 font-sans text-[10px] uppercase tracking-[0.18em] text-muted">
                  {ch.kicker}
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <Link
          to="/book"
          className="mt-4 inline-block font-sans text-xs uppercase tracking-[0.2em] text-crimson hover:underline"
        >
          Open the book page
        </Link>
      </section>
    </main>
  );
}
