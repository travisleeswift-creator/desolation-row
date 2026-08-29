import { REVIEWS } from "@/content/edition";

export function Reviews() {
  return (
    <section>
      <h2 className="border-b border-ink pb-2 font-sans text-[11px] uppercase tracking-[0.28em] text-crimson">
        Early readers
      </h2>
      <p className="mt-2 font-sans text-[11px] text-muted">Proof-pile lines — not newspaper notices.</p>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {REVIEWS.map((r) => (
          <li key={r.by} className="border border-rule bg-paper-2 p-4">
            <blockquote className="font-serif text-lg leading-snug italic">“{r.quote}”</blockquote>
            <p className="mt-3 font-sans text-xs text-muted">{r.by}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
