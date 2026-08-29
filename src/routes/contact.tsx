import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { EDITION } from "@/content/edition";
import { submitContact, joinPartTwo } from "@/lib/edition/inbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShareOnX } from "@/components/edition/share-x";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactPage() {
  return (
    <main className="grid gap-12 lg:grid-cols-2">
      <ContactForm />
      <PartTwoForm />
    </main>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await submitContact({ data: { name, email, body } });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section>
      <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-crimson">The desk</p>
      <h1 className="mt-1 font-display text-3xl uppercase tracking-wide">Contact</h1>
      <p className="mt-2 font-serif text-sm text-muted">
        Write to {EDITION.author}. For X: @{EDITION.xHandle}.
      </p>
      {done ? (
        <p className="mt-6 border border-ink bg-paper-2 p-5 font-serif">Message in. He’ll read it.</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 grid gap-3">
          <Input
            required
            name="name"
            autoComplete="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            required
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            required
            minLength={10}
            name="message"
            rows={6}
            placeholder="The note"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full rounded-sm border border-rule bg-paper px-3 py-2 font-serif text-sm text-ink placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson"
          />
          {error ? <p className="font-sans text-sm text-crimson">{error}</p> : null}
          <Button type="submit" size="lg" disabled={busy}>
            {busy ? "Sending…" : "Send to the desk"}
          </Button>
        </form>
      )}
      <div className="mt-6">
        <ShareOnX extra="Ask SuperGrok what he makes of it." />
      </div>
    </section>
  );
}

function PartTwoForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await joinPartTwo({ data: { name: name || undefined, email } });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not join");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="border-2 border-ink bg-paper-2 p-6">
      <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-crimson">The list</p>
      <h2 className="mt-1 font-display text-3xl uppercase tracking-wide">The shocking second part</h2>
      <p className="mt-3 font-serif text-sm leading-6 text-ink-soft">
        Part I is sealed behind the till. Part II is worse, and it is not out yet. Put your name on
        the list. No feed. No spam shop. When it goes to press, the list hears first.
      </p>
      {done ? (
        <p className="mt-6 font-display text-xl uppercase">You’re on the list.</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 grid gap-3">
          <Input
            name="name"
            autoComplete="name"
            placeholder="Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            required
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error ? <p className="font-sans text-sm text-crimson">{error}</p> : null}
          <Button type="submit" size="lg" disabled={busy}>
            {busy ? "Adding…" : "Register for Part II"}
          </Button>
        </form>
      )}
    </section>
  );
}
