import { createFileRoute, Link } from "@tanstack/react-router";
import { CHAPTERS } from "@/content/meta";
import { EDITION } from "@/content/edition";
import { loadBook } from "@/lib/edition/access";
import { buttonVariants } from "@/components/ui/button";
import { Reviews } from "@/components/edition/reviews";
import { ShareOnX } from "@/components/edition/share-x";
import { Volume } from "@/components/edition/volume";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/book")({
  loader: async () => loadBook(),
  component: BookPage,
});

function BookPage() {
  const { owned, chapters } = Route.useLoaderData();

  if (owned) {
    return (
      <main className="grid gap-12">
        <Volume chapters={chapters} />
      </main>
    );
  }

  return (
    <main className="grid gap-12">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-crimson">
            {EDITION.genre}
          </p>
          <h1 className="mt-1 font-display text-3xl uppercase tracking-wide">{EDITION.name}</h1>
          <p className="font-display text-xl uppercase tracking-wide text-crimson">{EDITION.subtitle}</p>
          <p className="mt-2 font-serif italic text-muted">{EDITION.author}</p>
          <p className="mt-4 font-sans text-xs uppercase tracking-[0.18em] text-muted">
            {EDITION.words.toLocaleString()} words · {EDITION.priceLabel} · back-page preview
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <Link to="/checkout" className={cn(buttonVariants({ size: "lg" }))}>
              Buy the book
            </Link>
            <ShareOnX />
          </div>
        </div>

        <div className="lg:col-span-8">
          <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-crimson">Back page</p>
          <div className="mt-3 space-y-4 border-y-2 border-ink py-6 font-serif text-lg leading-8 text-ink-soft">
            {EDITION.backPage.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-4 font-serif text-sm text-muted">
            The rest of the manuscript is in this paper — sealed until you buy. Sign in, pay, and
            the eight chapters open here as one book.
          </p>

          <h2 className="mt-10 border-b border-ink pb-2 font-sans text-[11px] uppercase tracking-[0.28em]">
            Contents — locked
          </h2>
          <ol>
            {CHAPTERS.map((ch) => (
              <li key={ch.slug} className="border-b border-rule">
                <Link to="/read/$slug" params={{ slug: ch.slug }} className="block py-4">
                  <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-muted">
                    {ch.kicker} · Sealed
                  </p>
                  <h3 className="mt-1 font-display text-2xl uppercase tracking-wide">{ch.title}</h3>
                  <p className="mt-1 font-serif text-sm text-muted">{ch.dek}</p>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <Reviews />
    </main>
  );
}
