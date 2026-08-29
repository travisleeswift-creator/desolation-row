import { useEffect, useState } from "react";
import { createFileRoute, Link, Navigate, useNavigate } from "@tanstack/react-router";
import { EDITION } from "@/content/edition";
import { completePurchase, getMyEntitlements } from "@/lib/edition/access";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/checkout")({ component: Checkout });

function Checkout() {
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const [owned, setOwned] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const stripe = EDITION.stripePaymentLink;

  useEffect(() => {
    if (!user) return;
    getMyEntitlements()
      .then((ids) => setOwned(ids.includes(EDITION.productId)))
      .catch(() => setOwned(false));
  }, [user]);

  if (isPending) {
    return <div className="h-40 animate-pulse bg-paper-2" />;
  }
  if (!user) {
    return <Navigate to="/login" search={{ next: "/checkout" }} />;
  }

  async function payPreview() {
    setBusy(true);
    setError(null);
    try {
      await completePurchase({ data: { productId: "edition" } });
      setOwned(true);
      await navigate({ to: "/library" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Purchase failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto grid max-w-2xl gap-8">
      <div>
        <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-crimson">The till</p>
        <h1 className="mt-1 font-display text-3xl uppercase tracking-wide">Buy the book</h1>
        <p className="mt-2 font-serif text-muted">
          One account — X, Google, or email. The manuscript unlocks on{" "}
          {user.primaryEmail ?? user.displayName ?? "this account"}.
        </p>
      </div>

      <div className="border-2 border-ink p-5">
        <h2 className="font-display text-2xl uppercase tracking-wide">{EDITION.name}</h2>
        <p className="font-display text-lg uppercase tracking-wide text-crimson">{EDITION.subtitle}</p>
        <p className="font-serif italic text-muted">
          {EDITION.genre} · {EDITION.author}
        </p>
        <ul className="mt-4 space-y-1 font-sans text-sm text-ink-soft">
          <li>Back-page preview free. Full manuscript on this account.</li>
          <li>Kokoro audio read — British voices, on this device</li>
          <li>A longer professional edition is coming for the target audience</li>
          <li>
            {EDITION.charity.share} pledged to {EDITION.charity.name}
          </li>
        </ul>
        <p className="mt-4 font-display text-3xl">{EDITION.priceLabel}</p>
      </div>

      <p className="tag-bar px-4 py-3 font-sans text-sm">{EDITION.charity.note}</p>

      {owned ? (
        <div className="border border-ink bg-paper-2 p-5">
          <p className="font-display text-xl uppercase tracking-wide">This account already holds a copy.</p>
          <Link to="/library" className="mt-3 inline-block font-sans text-sm text-crimson hover:underline">
            Open your library
          </Link>
        </div>
      ) : (
        <div className="grid gap-3">
          {stripe ? (
            <a
              href={stripe}
              className="inline-flex h-12 items-center justify-center bg-ink px-5 font-sans text-sm uppercase tracking-[0.18em] text-paper"
            >
              Pay {EDITION.priceLabel} with Stripe
            </a>
          ) : (
            <Button size="lg" disabled={busy} onClick={() => void payPreview()}>
              {busy ? "Unlocking your copy…" : `Preview unlock · ${EDITION.priceLabel}`}
            </Button>
          )}
          {error ? <p className="font-sans text-sm text-crimson">{error}</p> : null}
          <p className="font-sans text-[11px] leading-5 text-muted">
            {stripe
              ? "Stripe takes the card. After you pay, the book unlocks on this signed-in account."
              : "Stripe is not plugged in yet. From the Stripe app on your phone: Payment Links → £7.99 → copy the link. Send that link and it replaces this preview till. Until then, this button unlocks a test copy so the lock and the reader can be checked."}
          </p>
        </div>
      )}
    </main>
  );
}
