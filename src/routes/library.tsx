import { useEffect, useState } from "react";
import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { CATALOG } from "@/content/meta";
import { EDITION } from "@/content/edition";
import { getMyEntitlements, listProgress } from "@/lib/edition/access";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/library")({ component: Library });

function Library() {
  const { user, isPending } = useCurrentUserState();
  const [owned, setOwned] = useState(false);
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!user) return;
    getMyEntitlements()
      .then((ids) => setOwned(ids.includes(EDITION.productId)))
      .catch(() => setOwned(false));
    listProgress()
      .then((rows) => {
        const map: Record<string, number> = {};
        for (const r of rows) map[r.slug] = r.block_index;
        setProgress(map);
      })
      .catch(() => setProgress({}));
  }, [user]);

  if (isPending) return <div className="h-40 animate-pulse bg-paper-2" />;
  if (!user) return <Navigate to="/login" search={{ next: "/library" }} />;

  return (
    <main>
      <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-crimson">Your copy</p>
      <h1 className="mt-1 font-display text-3xl font-semibold">Library</h1>
      <p className="mt-2 max-w-xl font-serif text-muted">
        {owned
          ? "The edition is unlocked on this account. Read or listen from any device you sign in on."
          : "The book is sealed. Buy the edition to fill this shelf. The back page is free on the Book tab."}
      </p>

      {!owned ? (
        <Link to="/checkout" className={cn(buttonVariants(), "mt-5")}>
          Buy the edition · {EDITION.priceLabel}
        </Link>
      ) : null}

      <ul className="mt-8 divide-y divide-rule border-y border-rule">
        {CATALOG.map((item) => {
          const open = item.free || owned;
          return (
            <li key={item.slug}>
              {item.kind === "article" ? (
                <Link to="/articles/$slug" params={{ slug: item.slug }} className="flex items-center gap-4 py-4">
                  <Thumb item={item} open={open} progress={progress[item.slug]} />
                </Link>
              ) : (
                <Link to="/read/$slug" params={{ slug: item.slug }} className="flex items-center gap-4 py-4">
                  <Thumb item={item} open={open} progress={progress[item.slug]} />
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </main>
  );
}

function Thumb({
  item,
  open,
  progress,
}: {
  item: (typeof CATALOG)[number];
  open: boolean;
  progress?: number;
}) {
  return (
    <>
      {item.hero ? (
        <img
          src={item.hero}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-16 shrink-0 border border-rule object-cover sm:size-20"
        />
      ) : (
        <span className="flex size-16 shrink-0 items-center justify-center border border-rule font-sans text-[10px] uppercase tracking-widest text-muted sm:size-20">
          {item.kicker.split(" ")[0]}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted">
          {item.kicker}
          {open ? "" : " · Locked"}
          {progress != null ? " · In progress" : ""}
        </p>
        <h2 className="truncate font-display text-xl font-semibold">{item.title}</h2>
      </div>
    </>
  );
}
