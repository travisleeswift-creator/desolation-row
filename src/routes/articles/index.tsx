import { createFileRoute, Link } from "@tanstack/react-router";
import { ARTICLES } from "@/content/meta";

export const Route = createFileRoute("/articles/")({ component: ArticlesIndex });

function ArticlesIndex() {
  return (
    <main>
      <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-crimson">Dispatches</p>
      <h1 className="mt-1 font-display text-3xl font-semibold">Articles</h1>
      <p className="mt-2 max-w-xl font-serif text-muted">
        Shorter pieces beside the manuscript — how the paper is built, why it is a URL, and who is
        invited in. Send the next dispatch and it goes to press here.
      </p>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2">
        {ARTICLES.map((a) => (
          <li key={a.slug}>
            <Link
              to="/articles/$slug"
              params={{ slug: a.slug }}
              className="group block border border-rule hover:border-ink"
            >
              {a.hero ? (
                <img
                  src={a.hero}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="aspect-16/9 w-full object-cover"
                />
              ) : null}
              <div className="p-4">
                <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-muted">
                  {a.kicker}
                  {a.free ? " · Free" : " · Edition"}
                </p>
                <h2 className="mt-1 font-display text-2xl font-semibold group-hover:text-crimson">
                  {a.title}
                </h2>
                <p className="mt-2 font-serif text-sm text-muted">{a.dek}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
