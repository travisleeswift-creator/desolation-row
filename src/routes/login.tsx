import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, authClient, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EDITION } from "@/content/edition";

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>): { next?: string } => {
    const next = typeof s.next === "string" && s.next.startsWith("/") ? s.next : undefined;
    return next ? { next } : {};
  },
  component: Login,
});

function Login() {
  const { next: nextParam } = Route.useSearch();
  const next = nextParam ?? "/library";
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const providers = [...GROK_PROVIDERS].sort((a, b) =>
    a.idp === "twitter" ? -1 : b.idp === "twitter" ? 1 : 0,
  );

  async function onEmail(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "up") {
        const { error: err } = await authClient.signUp.email({
          email,
          password,
          name: name || email.split("@")[0] || "Reader",
        });
        if (err) throw new Error(err.message);
      } else {
        const { error: err } = await authClient.signIn.email({ email, password });
        if (err) throw new Error(err.message);
      }
      window.location.assign(next.startsWith("/") ? next : "/library");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto grid max-w-md gap-6">
      <div>
        <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-crimson">One account</p>
        <h1 className="mt-1 font-display text-3xl uppercase tracking-wide">Sign in</h1>
        <p className="mt-2 font-serif text-sm text-muted">
          X, Google, or email — same desk, same copy, same till. {EDITION.priceLabel} unlocks the
          book on this account.
        </p>
      </div>

      {authEnabled ? (
        <>
          <div className="grid gap-2">
            {providers.map((p) => (
              <Button
                key={p.providerId}
                variant="ghost"
                size="lg"
                onClick={() => signIn(p.providerId, { callbackURL: next, errorCallbackURL: "/login" })}
              >
                Continue with {p.label}
              </Button>
            ))}
          </div>

          <p className="text-center font-sans text-[11px] uppercase tracking-[0.2em] text-muted">
            or the same account with email
          </p>

          <form onSubmit={onEmail} className="grid gap-3">
            {mode === "up" ? (
              <Input
                name="name"
                autoComplete="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : null}
            <Input
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              name="password"
              autoComplete={mode === "up" ? "new-password" : "current-password"}
              required
              minLength={8}
              placeholder="Password (8+ characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error ? <p className="font-sans text-sm text-crimson">{error}</p> : null}
            <Button type="submit" size="lg" disabled={busy}>
              {busy ? "Please wait…" : mode === "up" ? "Create the account" : "Sign in with email"}
            </Button>
          </form>

          <button
            type="button"
            className="font-sans text-sm text-muted hover:text-ink"
            onClick={() => setMode(mode === "up" ? "in" : "up")}
          >
            {mode === "up" ? "Already have the account? Sign in" : "New here? Create the account"}
          </button>
        </>
      ) : (
        <p className="font-serif text-sm text-muted">Sign-in is disabled.</p>
      )}

      <Link to="/" className="font-sans text-xs uppercase tracking-[0.2em] text-muted hover:text-ink">
        Back to the front
      </Link>
    </main>
  );
}
