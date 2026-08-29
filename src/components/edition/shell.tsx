import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { EDITION } from "@/content/edition";
import { AuthChip } from "./auth-chip";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Front" },
  { to: "/book", label: "Book" },
  { to: "/articles", label: "Articles" },
  { to: "/contact", label: "Contact" },
  { to: "/checkout", label: "Buy" },
] as const;

export function EditionShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="relative z-10 min-h-dvh bg-paper text-ink">
      <header>
        <div className="mx-auto max-w-6xl px-4 pt-5 pb-3 text-center sm:pt-7">
          <Link to="/" className="block">
            <p className="font-sans text-[10px] uppercase tracking-[0.38em] text-muted">
              {EDITION.genre} · {EDITION.author}
            </p>
            <h1 className="font-display text-mast leading-[0.9] tracking-wide uppercase text-ink">
              {EDITION.masthead}
            </h1>
            <p className="mt-1 font-display text-2xl tracking-wide uppercase text-crimson">
              {EDITION.subtitle}
            </p>
          </Link>
        </div>

        <nav className="border-y border-ink">
          <ul className="mx-auto flex max-w-6xl items-stretch justify-between overflow-x-auto px-2 sm:px-4">
            {NAV.map((item) => {
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : pathname === item.to || pathname.startsWith(`${item.to}/`);
              return (
                <li key={item.to} className="flex-1">
                  <Link
                    to={item.to}
                    className={cn(
                      "flex h-11 items-center justify-center whitespace-nowrap px-3 font-sans text-xs uppercase tracking-[0.18em]",
                      active ? "bg-ink text-paper" : "text-ink hover:bg-paper-2",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="flex items-center px-2">
              <AuthChip />
            </li>
          </ul>
        </nav>
      </header>

      <div className="mx-auto w-full max-w-6xl px-4 py-8 pb-28 sm:py-10">{children}</div>

      <footer className="border-t border-ink">
        <div className="tag-bar px-4 py-2 text-center font-sans text-[11px] font-medium uppercase tracking-[0.18em]">
          {EDITION.charity.share} of this price pledged to {EDITION.charity.name}
        </div>
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 font-sans text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            {EDITION.name} — {EDITION.subtitle} · {EDITION.author} · {EDITION.priceLabel}
          </p>
          <p>One account. X, Google, or email. Add to Home Screen for the paper as an app.</p>
        </div>
      </footer>
    </div>
  );
}
